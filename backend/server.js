require('dotenv').config();

const cors = require('cors');
const passport = require('./utils/passport-config');
const express = require('express');
const connectDB = require('./utils/connectDB');
const postRouter = require('./router/post/postsRouter');
const usersRouter = require('./router/user/usersRouter');
connectDB();
const app = express();

//PORT
const port = 5000;


//Middlewares
app.use(express.json());
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
};
app.use(cors(corsOptions));

//Passport middleware
app.use(passport.initialize());
//Routes handler
app.use("/api/v1/posts",postRouter)
app.use("/api/v1/users", usersRouter)

//Not Found
app.use((req, res, next) => {
    //const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404).json({message: "Route not found on server"});
    //next(error);
});

//Error handling middleware
app.use((err, req, res, next) => {
    const message = err.message
    const stack = err.stack
    res.status(500).json({
        message,
        stack
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);