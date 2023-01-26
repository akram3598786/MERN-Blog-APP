const PostModel = require("../Models/Post.model");
const express = require("express");
const UserModel = require("../Models/User.model");

const PostRouter = express.Router();


// Create Blog
async function CreatePost(req, res) {
    try {
        const payload = req.body;
        const userId = payload.createdby;
        let user = await UserModel.findById(userId);
        // console.log(user);
        if (user) {
            let post = await PostModel(payload);
            await post.save();
            user.posts = [...user.posts, post._id];
            await user.save();
            res.status(201).send({ message: "Post created", post });
        } else {
            res.status(404).send("User not authorized");
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

// Get all user private blogs
async function getALLposts(req, res) {
    try {

        let _limit = parseInt(req.query._limit);
        let page = parseInt(req.query.page);
        const { userId } = req.params;
        let posts = [];
        if (_limit && page >= 0) {
            posts = await PostModel.find({ createdby: userId }).limit(_limit * 1).skip(page * _limit).sort({updatedAt : -1});
        } else {
            posts = await PostModel.find({ createdby: userId });
        }
        let totalCount = await PostModel.find({ createdby: userId }).count();

        if (posts.length > 0) {
            res.status(200).send({posts,totalCount});
        } else {
            res.status(404).send("No post exist");
        }
    }
    catch (err) {
        res.send(err.message);
    }
}

// Get specific blog 
async function getSinglePost(req, res) {
    try {
        let { postId } = req.params;
        // console.log(postId)
        let post = await PostModel.findById(postId);
        // console.log(post)
        if (post) res.status(200).send(post);
        else res.status(404).send("Post not found !");
    }
    catch (err) {
        res.send(err.message);
    }
}


// Update Blog 
async function EditPost(req, res) {
    try {
        let { postId } = req.params;
        let payload = req.body;
        let post = await PostModel.findByIdAndUpdate(postId, payload,
            { new: true });
        // console.log(post)
        if (post) res.status(200).send("updated");
        else res.status(400).send("Post not updated !");
    } catch (err) {
        res.send(err.message);
    }
}


// Delete Sepecific Blog
async function deletePost(req, res) {
    try {
        let { postId } = req.params;
        let post = await PostModel.deleteOne({ _id: postId });
        //  console.log(post)
        res.status(200).send("deleted");
    } catch (err) {
        res.status(400).send({ msg: "Error occured", Error: err.message });
    }
}


PostRouter.post("/:userId", CreatePost);
PostRouter.patch("/edit/:postId", EditPost);
PostRouter.get("/:userId/all", getALLposts);
PostRouter.get("/:postId",getSinglePost);
PostRouter.delete("/:postId", deletePost);

module.exports = PostRouter;
