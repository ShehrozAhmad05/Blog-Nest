const express = require('express');
const multer = require('multer');
const postController = require('../../controllers/posts/postController');
const storage = require('../../utils/fileupload');

//create instance of multer
const upload = multer({storage});

//create instance express router
const postRouter = express.Router();

//Create a post
postRouter.post("/create", upload.single('image'), postController.createPost);

//Get all posts
postRouter.get("/", postController.fetchAllPosts);

//update a post
postRouter.put("/:postId", postController.update);

//get a post
postRouter.get("/:postId", postController.getPost);

//delete a post
postRouter.delete("/:postId", postController.delete);

module.exports = postRouter;