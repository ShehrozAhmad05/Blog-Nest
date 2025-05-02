import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/comments';

//create comment
export const createCommentAPI = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, 
            data, {withCredentials:true}
         );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
