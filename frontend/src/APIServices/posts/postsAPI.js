import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/posts';

//create a post
export const createPostAPI = async (postData) => {
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
export const fetchAllPosts = async (filters) => {
    try {
        const posts = await axios.get(BASE_URL, {
            params: filters,
        });

        return posts.data;
    } catch (err) {
        console.log(err);
    }
}

//Fetch a single post
export const fetchPost = async (postId) => {
    try {
        const post = await axios.get(`${BASE_URL}/${postId}`,{
            withCredentials: true,
        });
        return post.data;
    } catch (err) {
        console.log(err);
    }
}


//update Post
export const updatePostAPI = async ({ formData, postId }) => {
    try {
        const response = await axios.put(`${BASE_URL}/${postId}`, formData
            , { withCredentials: true });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

//delete a post
export const deletePostAPI = async (postId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${postId}`,{withCredentials:true});
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

//Like Post
export const likePostAPI = async (postId) => {
    try {
        const response = await axios.put(`${BASE_URL}/likes/${postId}`, {

        }, { withCredentials: true });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

//Dislike Post
export const dislikePostAPI = async (postId) => {
    try {
        const response = await axios.put(`${BASE_URL}/dislikes/${postId}`, {

        }, { withCredentials: true });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}