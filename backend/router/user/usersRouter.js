const express = require('express');
const userController = require('../../controllers/users/userController');
const isAuthenticated = require('../../middlewares/isAuthenticated');

const usersRouter = express.Router();

//Register a new user
usersRouter.post("/register", userController.register);
usersRouter.post("/login", userController.login);
usersRouter.get("/auth/google", userController.googleAuth);
usersRouter.get("/auth/google/callback", userController.googleAuthCallback);
usersRouter.get("/checkAuthenticated", userController.checkAuthenticated); 
usersRouter.post("/logout", userController.logout); 
usersRouter.get("/profile", isAuthenticated, userController.profile);
usersRouter.put("/follow/:followId", isAuthenticated, userController.followUser);
usersRouter.put("/unfollow/:unfollowId", isAuthenticated, userController.unFollowUser);
usersRouter.get("/account-verification-email", isAuthenticated, userController.verifyEmailAccount);
usersRouter.get("/verify-account/:verifyToken", isAuthenticated, userController.verifyEmailAcc);


module.exports = usersRouter;