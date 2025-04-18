const express = require('express');
const multer = require('multer');
const postController = require('../../controllers/posts/postController');
const storage = require('../../utils/fileupload');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const checkUserPlan = require('../../middlewares/checkUserPlan');

//create instance of multer
const upload = multer({storage});

//create instance express router
const postRouter = express.Router();

//Create a post
postRouter.post("/create", isAuthenticated, checkUserPlan, upload.single('image'), postController.createPost);

//Get all posts
postRouter.get("/", postController.fetchAllPosts);

//update a post
postRouter.put("/:postId",isAuthenticated, postController.update);

//get a post
postRouter.get("/:postId", postController.getPost);

//delete a post
postRouter.delete("/:postId",isAuthenticated, postController.delete);

module.exports = postRouter;