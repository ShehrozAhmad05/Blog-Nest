import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";
import PublicNavBar from "./components/NavBar/PublicNavBar";
import UpdatePost from "./components/Posts/UpdatePost";
import Home from "./components/Home/Home";
import PostDetails from "./components/Posts/PostDetails";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import PrivateNavbar from "./components/NavBar/PrivateNavbar";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatusAPI } from "./APIServices/users/usersAPI";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "./redux/slices/authSlices";
import { useEffect } from "react";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import UserDashboard from "./components/User/UserDashboard";
import AccountSummaryDashboard from "./components/User/AccountSummary";
import AddCategory from "./components/Category/AddCategory";
import CreatePlan from "./components/Plans/CreatePlan";
import Pricing from "./components/Plans/Pricing";
import CheckoutForm from "./components/Plans/CheckoutForm";
import PaymentSuccess from "./components/Plans/PaymentSuccess";
import PayingFreePlan from "./components/Plans/PayingFreePlan";
import AccountVerifiedComponent from "./components/User/AccountVerification";
import RequestResetPassword from "./components/User/RequestResetPassword";
import ResetPassword from "./components/User/ResetPassword";
import Rankings from "./components/User/CreatorsRanking";
import Notifications from "./components/Notification/NotificationLists";
import MyFollowing from "./components/User/MyFollowing";
import MyFollowers from "./components/User/MyFollowers";
import MyEarnings from "./components/User/MyEarnings";
import DashboardPosts from "./components/User/DashboardPosts";
import Settings from "./components/User/SettingsPage";
import AddEmailComponent from "./components/User/UpdateEmail";
import UploadProfilePic from "./components/User/UploadProfilePic";
import UsersLists from "./components/User/UserLists";
// import UpdatePost from './components/Posts/UpdatePost'

function App() {
  const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatusAPI,
  });

  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);

  //get the login user from store
  const { userAuth } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      {/*Navbar */}
      {userAuth ? <PrivateNavbar /> : <PublicNavBar />}
      {/* <PublicNavBar/> */}
      <Routes>
        <Route element={<Home />} path="/" />

        {/*User Dashboard */}
        <Route element={<UserDashboard />} path="/dashboard">
          {/* {/Account Summary Dashboard/} */}
          <Route
            element={
              <AuthRoute>
                <AccountSummaryDashboard />
              </AuthRoute>
            }
            path=""
          />

          {/* {/Create Post/} */}
          <Route
            element={
              <AuthRoute>
                <CreatePost />
              </AuthRoute>
            }
            path="create-post"
          />

          {/* {/My Followings/} */}
          <Route
            element={
              <AuthRoute>
                <MyFollowing />
              </AuthRoute>
            }
            path="my-followings"
          />

          {/* {/My Followers/} */}
          <Route
            element={
              <AuthRoute>
                <MyFollowers />
              </AuthRoute>
            }
            path="my-followers"
          />

          {/* {/My Earnings/} */}
          <Route
            element={
              <AuthRoute>
                <MyEarnings />
              </AuthRoute>
            }
            path="my-earnings"
          />

          {/* {/Dashboard Posts/} */}
          <Route
            element={
              <AuthRoute>
                <DashboardPosts />
              </AuthRoute>
            }
            path="posts"
          />

          {/* {/Update Post/} */}
          <Route
            element={
              <AuthRoute>
                <UpdatePost />
              </AuthRoute>
            }
            path="update-post/:postId"
          />

          {/* {/Settings page/} */}
          <Route
            element={
              <AuthRoute>
                <Settings />
              </AuthRoute>
            }
            path="settings"
          />

          {/* {/Update email page/} */}
          <Route
            element={
              <AuthRoute>
                <AddEmailComponent />
              </AuthRoute>
            }
            path="add-email"
          />

          {/* {/Upload Profile Pic/} */}
          <Route
            element={
              <AuthRoute>
                <UploadProfilePic />
              </AuthRoute>
            }
            path="upload-profile-photo"
          />

          {/* {/Users lists/} */}
          <Route
            element={
              <AuthRoute>
                <UsersLists />
              </AuthRoute>
            }
            path="users"
          />

          {/* {/Notification Lists/} */}
          <Route
            element={
              <AuthRoute>
                <Notifications />
              </AuthRoute>
            }
            path="notifications"
          />

          {/* {/Verify Account/} */}
          <Route
            element={
              <AuthRoute>
                <AccountVerifiedComponent />
              </AuthRoute>
            }
            path="account-verification/:verifyToken"
          />

          {/* {/Create Plan/} */}
          <Route
            element={
              <AuthRoute>
                <CreatePlan />
              </AuthRoute>
            }
            path="create-plan"
          />

          {/* {/Create Category/} */}
          <Route
            element={
              <AuthRoute>
                <AddCategory />
              </AuthRoute>
            }
            path="add-category"
          />
        </Route>
        {/* Public Links */}
        <Route element={<PostsList />} path="/posts" />
        {/* <Route element={<UpdatePost />} path='/posts/:postId'/> */}
        <Route element={<PostDetails />} path="/posts/:postId" />
        <Route element={<Register />} path="/register" />
        <Route element={<Pricing />} path="/pricing" />
        <Route element={<CheckoutForm />} path="/checkout/:planId" />
        <Route element={<RequestResetPassword />} path="/forgot-password" />
        <Route element={<Rankings />} path="/ranking" />
        <Route
          element={<ResetPassword />}
          path="/reset-password/:verifyToken"
        />

        <Route
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
          path="/profile"
        />

        <Route
          element={
            <AuthRoute>
              <PaymentSuccess />
            </AuthRoute>
          }
          path="/success"
        />

        <Route
          element={
            <AuthRoute>
              <PayingFreePlan />
            </AuthRoute>
          }
          path="/free-subscription"
        />

        <Route element={<Login />} path="/login" />
        <></>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
