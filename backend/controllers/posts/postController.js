const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post/Post');

const postController = {
    //Create a post
    createPost: asyncHandler(async (req, res) => {
        console.log(req.file);
        const { description } = req.body;
    
        // const postFound = await Post.findOne({ title });
        // if (postFound) {
        //     throw new Error('Post already exists');
        // }
    
        const postCreated = await Post.create({ description, image: req.file, author: req.user });
        res.json({
            status: 'success',
            message: 'Post created successfully',
            postCreated
        });
    }),
    //List all posts
    fetchAllPosts: asyncHandler(async (req, res) => {
    
        const posts = await Post.find();
        res.status(200).json({
            status: 'success',
            posts
        });
    
    }),
    //Get a Post
    getPost: asyncHandler(async (req, res) => {
    
        const postId = req.params.postId;
        const postFound = await Post.findById(postId);
        if (!postFound) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        res.status(200).json({
            status: 'success',
            postFound
        });
    
    }),
    //Delete a Post
    delete: asyncHandler(async (req, res) => {

        const postId = req.params.postId;
        const postFound = await Post.findById(postId);
        if (!postFound) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({
            status: 'success',
            message: 'Post deleted successfully'
        });
    }),

    //Update a post
    update: asyncHandler(async (req, res) => {

        //get the post id from the params
        const postId = req.params.postId;
    
        //find the post by id
        const postFound = await Post.findById(postId);
        if (!postFound) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        //update the post
        const postUpdated = await Post.findByIdAndUpdate(
            postId,
            { title: req.body.title, description: req.body.description },
            { new: true }
        );
    
        res.status(200).json({
            status: 'success',
            message: 'Post updated successfully',
            postUpdated
        });
    })

}

module.exports = postController;