import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/Posts/PostsList'
import PublicNavBar from './components/NavBar/PublicNavBar'
import UpdatePost from './components/Posts/UpdatePost'
import Home from './components/Home/Home'
import PostDetails from './components/Posts/PostDetails'
import Register from './components/User/Register'
import Login from './components/User/Login'
import Profile from './components/User/Profile'
import PrivateNavbar from './components/NavBar/PrivateNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatusAPI } from './APIServices/users/usersAPI'
import { useQuery } from '@tanstack/react-query'
import { isAuthenticated } from './redux/slices/authSlices'
import { useEffect } from 'react'
import AuthRoute from './components/AuthRoute/AuthRoute'

function App() {

  const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI
  })

  //dispatch 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(isAuthenticated(data))
  }, [data])

  //get the login user from store
  const { userAuth } = useSelector((state) => state.auth)
  console.log(userAuth);
  return (
    <BrowserRouter>
      {/*Navbar */}
      {userAuth ? <PrivateNavbar /> : <PublicNavBar />}
      {/* <PublicNavBar/> */}
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<CreatePost />} path='/create-post' />
        <Route element={<PostsList />} path='/posts' />
        {/* <Route element={<UpdatePost />} path='/posts/:postId'/> */}
        <Route element={<PostDetails />} path='/posts/:postId' />
        <Route element={<Register />} path='/register' />
        <Route element={<AuthRoute>
          <Profile />
        </AuthRoute>} path='/profile' />
        <Route element={<Login />} path='/login' />
        <></>
      </Routes>
    </BrowserRouter>
  )
}

export default App
