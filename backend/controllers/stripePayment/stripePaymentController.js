const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Plan = require('../../models/Plan/Plan');

//Stripe Payment
const stripePaymentController = {
    //payment
    payment: asyncHandler(async (req, res) => {
        //Get the plan Id
        const { subscriptionPlanId } = req.body
        //Checking for the valid id of the plan
        if (!mongoose.isValidObjectId(subscriptionPlanId)) {
            return res.json({ message: "Invalid Subsciption Plan Id" })
        }
        //Find the plan
        const plan = await Plan.findById(subscriptionPlanId)
        if (!plan) {
            return res.json({ message: "Subscription Plan not found" })
        }
        //get the user
        const user = req.user
        //Create payment intent/making the payment
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: plan.price * 100, //amount in cents
                currency: 'usd',
                //automatic_payment_methods: { enabled: true },
                metadata: {
                    userId: user?.toString(),
                    userEmail: user?.email,
                    subscriptionPlanId,
                },
            });
            //Send the response
            res.json({
                clientSecret: paymentIntent.client_secret,
                userEmail: user?.email,
                subscriptionPlanId,
            });
        } catch (error) {
            res.json({ message: "Payment failed", error: error.message });
        }
    })
}

module.exports = stripePaymentController