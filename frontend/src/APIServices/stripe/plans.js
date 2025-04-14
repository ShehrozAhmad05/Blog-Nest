import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/stripe';

//create a plan
export const paymentIntentAPI = async (planId) => {
    try {
        const response = await axios.post(`${BASE_URL}/checkout`, 
            {subscriptionPlanId: planId}, {withCredentials:true}
         );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//payment verification
export const paymentVerificationAPI = async (paymentId) => {
    try {
        const response = await axios.get(`${BASE_URL}/verify/${paymentId}`, 
            {withCredentials:true}
         );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Free Plan
export const freePlanAPI = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/free-plan`, 
            {withCredentials:true}
         );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


