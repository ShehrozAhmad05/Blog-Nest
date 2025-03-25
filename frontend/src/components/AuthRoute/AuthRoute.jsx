import React from 'react'
import Login from '../User/Login'
import { useQuery } from '@tanstack/react-query'
import { checkAuthStatusAPI } from '../../APIServices/users/usersAPI'
import { Navigate } from 'react-router-dom'
import AuthCheckingComponent from './AuthCheckingComponent'

const AuthRoute = ({ children }) => {

    const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
        queryKey: ['user-auth'],
        queryFn: checkAuthStatusAPI
    })
    console.log(data)

    //for loading
    if (isLoading) return <AuthCheckingComponent />
    //in case a user is not logged in
    if (!data) {
        return <Navigate to='/login' />
    }
    //render
    return children


}

export default AuthRoute