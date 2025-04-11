import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/categories';

//create a post
export const addCategoryAPI = async (postData) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, 
            postData, {withCredentials:true}
         );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Fetch all posts
export const fetchCategoriesAPI = async () => {
    try {
        const posts = await axios.get(BASE_URL);

        return posts.data;
    } catch (err) {
        console.log(err);
    }
}