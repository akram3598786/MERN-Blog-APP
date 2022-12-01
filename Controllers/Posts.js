const PostModel = require("../Models/Post.model");
const express = require("express");
const UserModel = require("../Models/User.model");
const PostRouter = express.Router();

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
            res.status(404).send("User not exist");
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

async function getALLposts(req, res) {
    try {
        const { userId } = req.params;
        let posts = await PostModel.find({ createdby: userId });
        if (posts.length > 0) {
            res.status(200).send(posts);
        } else {
            res.status(404).send("No post exist");
        }
    }
    catch (err) {
        res.send(err.message);
    }
}

async function getSinglePost(req, res) {
    try {
        let { postId } = req.params;
        let post = await PostModel.findById(postId);
        if (post) res.status(200).send(post);
        else res.status(404).send("Post not found !");
    }
    catch (err) {
        res.send(err.message);
    }
}

async function EditPost(req, res){
    try{
        let {postId} = req.params;
        let post = await PostModel.updateOne(postId);
        if(post) res.status(200).send("updated");
        else res.status(400).send("Post not updated !");
    }catch(err){
        res.send(err.message);
    }
}

async function deletePost(req, res) {
    try {
        let { postId } = req.params;

        let post = await PostModel.deleteOne({_id : postId});
      //  console.log(post)
        res.status(200).send("deleted");
    } catch (err) {
        res.status(400).send({ msg: "Error occured", Error: err.message });
    }
}

PostRouter.post("/:userId", CreatePost);
PostRouter.post("/edit/:userId", EditPost);
PostRouter.get("/:userId/all", getALLposts);
PostRouter.get("/:postId", getSinglePost);
 PostRouter.delete("/:postId", deletePost);

module.exports = PostRouter;
