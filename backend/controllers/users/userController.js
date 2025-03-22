const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs')
const User = require("../../models/User/User");

//User controller
const userController = {
    //Register a new user
    register: asyncHandler(async(req, res) => {
        const { username, email, password } = req.body;
        const userFound = await User.findOne({ username, email });
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
};

module.exports = userController;