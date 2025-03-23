import {BrowserRouter, Route, Routes} from 'react-router-dom'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/Posts/PostsList'
import PublicNavBar from './components/NavBar/PublicNavBar'
import UpdatePost from './components/Posts/UpdatePost'
import Home from './components/Home/Home'
import PostDetails from './components/Posts/PostDetails'
import Register from './components/User/Register'
import Login from './components/User/Login'

function App() {

  return (
    <BrowserRouter>
      <PublicNavBar/>
    <Routes>
      <Route element={<Home />} path='/'/>
      <Route element={<CreatePost />} path='/create-post'/>
      <Route element={<PostsList />} path='/posts'/>
      {/* <Route element={<UpdatePost />} path='/posts/:postId'/> */}
      <Route element={<PostDetails />} path='/posts/:postId' />
      <Route element={<Register />} path='/register'/>
      <Route element={<Login/>} path='/login'/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
