import { BASE_URL } from "../../utils/baseEndpoint"
import axios from "axios"

//Register User
export const registerAPI = async (userData) => {
    const response = await axios.post(`${BASE_URL}/users/register`, {
        username: userData?.username,
        password: userData?.password,
        email: userData?.email,
    }, {
        withCredentials: true
    })
    return response.data
}
//Login User
export const loginAPI = async (userData) => {
    const response = await axios.post(`${BASE_URL}/users/login`, {
        username: userData?.username,
        password: userData?.password,
    },
        {
            withCredentials: true
        })
    return response.data
}

//Check AuthStatusAPI for user
export const checkAuthStatusAPI = async () => {
    const response = await axios.get(`${BASE_URL}/users/checkAuthenticated`,
        {
            withCredentials: true
        })
    return response.data
}

//user Profile API
export const userProfileAPI = async () => {
    const response = await axios.get(`${BASE_URL}/users/profile`,
        {
            withCredentials: true
        })
    return response.data
}

//Logout User
export const logoutAPI = async (userData) => {
    const response = await axios.post(`${BASE_URL}/users/logout`, {},
        {
            withCredentials: true
        })
    return response.data
}

//Follow User
export const followUserAPI = async (userId) => {
    const response = await axios.put(`${BASE_URL}/users/follow/${userId}`, {

    },
        {
            withCredentials: true
        })
    return response.data
}

//UnFollow User
export const unfollowUserAPI = async (userId) => {
    const response = await axios.put(`${BASE_URL}/users/unfollow/${userId}`, {

    },
        {
            withCredentials: true
        })
    return response.data
}

//Send email verification token
export const sendEmailVerificationTokenAPI = async () => {
    const response = await axios.put(`${BASE_URL}/users/account-verification-email`,
        {},
        {
            withCredentials: true
        })
    return response.data
}

//Verify User account
export const verifyUserAccountAPI = async (verifyToken) => {
    const response = await axios.put(`${BASE_URL}/users/verify-account/${verifyToken}`,
        {},
        {
            withCredentials: true
        })
    return response.data
}

//Forgot password
export const forgotPasswordAPI = async (email) => {
    const response = await axios.post(`${BASE_URL}/users/forgot-password`,
        {
            email
        },
        {
            withCredentials: true
        })
    return response.data
}

//Reset password
export const resetPasswordAPI = async (data) => {
    const response = await axios.post(`${BASE_URL}/users/reset-password/${data?.verifyToken}`,
        {
            password: data?.password
        },
        {
            withCredentials: true
        })
    return response.data
}

//Update Email API
export const updateEmailAPI = async (email) => {
    const response = await axios.put(`${BASE_URL}/users/update-email`,
        {
            email
        },
        {
            withCredentials: true
        })
    return response.data
}

//Upload profile pic
export const uploadProfilePicAPI = async (formData) => {
    const response = await axios.put(`${BASE_URL}/users/upload-profile-picture`,
        formData,
        {
            withCredentials: true
        })
    return response.data
}

//List All Users API
export const listUsersAPI = async () => {
    const response = await axios.get(`${BASE_URL}/users/lists`,
        {
            withCredentials: true
        })
    return response.data
}

//Toggle Block User API
export const toggleUserBlockAPI = async (data) => {
    const response = await axios.put(
        data?.actionURL,
        {
            userId: data?.userId,
        },
        {
            withCredentials: true
        })
    return response.data
}