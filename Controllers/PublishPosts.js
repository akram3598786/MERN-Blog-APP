const express = require("express");
const PublishPostModel = require("../Models/PublishPost.model");
const UserModel = require("../Models/User.model");
const PublishPostRouter = express.Router()

async function publishPost(req, res){
    try {
        const payload = req.body;
        const userId = payload.createdby;
        let user = await UserModel.findById(userId);
        // console.log(user);
        if (user) {
            let post = await PublishPostModel(payload);
            await post.save();
            res.status(201).send({ message: "Post published", post });
        } else {
            res.status(404).send("User not exist");
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

async function getPublishedPost(req, res){
    try {

        let posts = await PublishPostModel.find().sort({updatedAt : -1});  
        let totalCount = await PublishPostModel.find().count();
        if (posts.length > 0) {
            res.status(200).send({posts,totalCount});
        } else {
            res.status(404).send("No post published yet !");
        }
    }
    catch (err) {
        res.send(err.message);
    }
}

async function deletePost(req, res) {
    try {
        let { postId} = req.params;
        // console.log(postId)
        // console.log(userId);
        let post = await PublishPostModel.deleteOne({ _id: postId });
        //  console.log(post)
        res.status(200).send("deleted successfully");
    } catch (err) {
        res.status(400).send({ msg: "Error occured", Error: err.message });
    }
}

PublishPostRouter.post("/:userId", publishPost);
PublishPostRouter.get("/", getPublishedPost);
PublishPostRouter.delete('/:postId',deletePost);

module.exports = PublishPostRouter;