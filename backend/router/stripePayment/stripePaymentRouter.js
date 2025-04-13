const express = require('express');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const stripePaymentController = require('../../controllers/stripePayment/stripePaymentController');

//create instance express router
const stripePaymentRouter = express.Router();

//Create a payment
stripePaymentRouter.post("/checkout", isAuthenticated, stripePaymentController.payment);

//Get all Plans
//stripePaymentRouter.get("/", stripePaymentController.lists);


module.exports = stripePaymentRouter;