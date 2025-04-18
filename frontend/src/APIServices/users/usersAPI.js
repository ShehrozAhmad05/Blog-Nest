import { BASE_URL } from "../../utils/baseEndpoint"
import axios from "axios"

//Register User
export const registerAPI = async(userData)=>{
    const response = await axios.post( `${BASE_URL}/users/register`,{
        username: userData?.username,
        password: userData?.password,
        email: userData?.email,
    },{
        withCredentials: true
    })
    return response.data    
}
//Login User
export const loginAPI = async(userData)=>{
    const response = await axios.post(`${BASE_URL}/users/login`,{
        username: userData?.username,
        password: userData?.password,
    },
    {
        withCredentials: true
    })
    return response.data    
}

//Check AuthStatusAPI for user
export const checkAuthStatusAPI = async()=>{
    const response = await axios.get(`${BASE_URL}/users/checkAuthenticated`,
    {
        withCredentials: true
    })
    return response.data    
}

//user Profile API
export const userProfileAPI = async()=>{
    const response = await axios.get(`${BASE_URL}/users/profile`,
    {
        withCredentials: true
    })
    return response.data    
}

//Logout User
export const logoutAPI = async(userData)=>{
    const response = await axios.post(`${BASE_URL}/users/logout`,{},
    {
        withCredentials: true
    })
    return response.data    
}
