import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/earnings';


//Fetch all earnings
export const fetchAllEarningsAPI = async () => {
    try {
        const posts = await axios.get(BASE_URL);

        return posts.data;
    } catch (err) {
        console.log(err);
    }
}

//Fetch all user's earnings
export const getMyEarningsAPI = async () => {
    try {
        const posts = await axios.get(`${BASE_URL}/my-earnings`,{withCredentials: true});

        return posts.data;
    } catch (err) {
        console.log(err);
    }
}