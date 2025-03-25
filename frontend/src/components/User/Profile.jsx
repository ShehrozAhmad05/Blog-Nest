import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { checkAuthStatusAPI } from '../../APIServices/users/usersAPI'
import { useDispatch } from 'react-redux'
import { isAuthenticated } from '../../redux/slices/authSlices'


const Profile = () => {
    const {isError, isLoading, isSuccess,data, error, refetch} = useQuery({
        queryKey: ['user-auth'],
        queryFn: checkAuthStatusAPI
    })
    
    //dispatch 
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(isAuthenticated(data))
    },[data])

  return (
    <div>Profile</div>
  )
}

export default Profile