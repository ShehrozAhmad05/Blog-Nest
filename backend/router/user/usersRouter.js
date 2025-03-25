const express = require('express');
const userController = require('../../controllers/users/userController');

const usersRouter = express.Router();

//Register a new user
usersRouter.post("/register", userController.register);
usersRouter.post("/login", userController.login);
usersRouter.get("/auth/google", userController.googleAuth);
usersRouter.get("/auth/google/callback", userController.googleAuthCallback);
usersRouter.get("/checkAuthenticated", userController.checkAuthenticated); 
usersRouter.post("/logout", userController.logout); 

module.exports = usersRouter;