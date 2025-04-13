import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/plans';

//create a plan
export const createPlanAPI = async (planData) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, 
            planData, {withCredentials:true}
         );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Fetch all plans
export const fetchPlansAPI = async () => {
    try {
        const plans = await axios.get(BASE_URL);
        return plans.data;
    } catch (err) {
        console.log(err);
    }
}

//Fetch a plan
export const fetchPlanAPI = async (id) => {
    try {
        const plan = await axios.get(`${BASE_URL}/${id}`);
        return plan.data;
    } catch (err) {
        console.log(err);
    }
}