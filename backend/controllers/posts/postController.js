const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post/Post');
const Category = require('../../models/Category/Category');

const postController = {
    //Create a post
    createPost: asyncHandler(async (req, res) => {
        console.log(req.file);
        const { description, category } = req.body;
        //find the category 
        const categoryFound = await Category.findById(category);
        if (!categoryFound) {
            throw new Error('Category not found');
        }

        const postCreated = await Post.create({ description, image: req.file, author: req.user, category });
        //push the post to the category
        categoryFound.posts.push(categoryFound?._id);
        //save the category
        await categoryFound.save();
        res.json({
            status: 'success',
            message: 'Post created successfully',
            postCreated
        });
    }),
    //List all posts
    fetchAllPosts: asyncHandler(async (req, res) => {
        const { category, title, page = 1, limit = 10 } = req.query;
        //Basic filtering
        let filter = {}
        if (category) {
            filter.category = category;
        }
        if (title) {
            filter.description = { $regex: title, $options: 'i' };
        }
        console.log(filter);
        const posts = await Post.find(filter)
            .populate('category')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit).limit(limit)
        //total number of posts
        const totalPosts = await Post.countDocuments(filter);

        res.status(200).json({
            status: 'success',
            message: 'Posts fetched successfully',
            posts,
            currentPage: page,
            perPage: limit,
            totalPages: Math.ceil(totalPosts / limit),
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