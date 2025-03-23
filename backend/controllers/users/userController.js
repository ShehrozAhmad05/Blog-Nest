const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require("passport");
const User = require("../../models/User/User");


//User controller
const userController = {
    //Register a new user
    register: asyncHandler(async(req, res) => {
        const { username, email, password } = req.body;
        //const userFound = await User.findOne({ username, email }); //Old Error Logic 
        const userFound = await User.findOne({
            $or: [{ username }, { email }]
          });
        if (userFound) {
            throw new Error("User already exists");
        }
        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //register the user
        const userRegistered = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        //send the response
        res.status(201).json({ 
            status: 'success',
            message: "User registered successfully",
            userRegistered 
        });
    }),

    //Login a user
    login: asyncHandler(async(req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            //If user not found
            if (!user) {
                return res.status(401).json({
                    message: info.message
                });
            }
            //generate token
            const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET)
            //set the token into the cookie 
            res.cookie('token',token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 24*60*60*1000,  //1 day
            })
            //send the response
            res.json({
                status:'success',
                message: "Login Successfull",
                username: user?.username,
                email: user?.email,
                _id: user?._id
            })
        })(req, res, next);
    }),

    //Google Auth
    googleAuth: passport.authenticate('google', {
        scope: ['profile']
    }),
    //Google Auth Callback
    googleAuthCallback: asyncHandler(async(req, res,next) => {
        passport.authenticate('google',
            {
                failureRedirect: '/login',
                session: false
            },(err,user,info ) => {
                if(err){
                    return next(err)
                }
                if(!user){
                    return res.redirect('http://localhost:5173/google-login-error')
                }
                //generate token
                const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET,{
                    expiresIn: '3d'
                })
                //set the token into the cookie
                res.cookie('token',token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                    maxAge: 24*60*60*1000,  //1 day
                })
                //redirect to the user dashboard
                res.redirect('http://localhost:5173/dashboard')
            }
        )(req,res,next)
    })

};

module.exports = userController;