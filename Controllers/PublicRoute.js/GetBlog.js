const express = require("express");
const PostModel = require("../../Models/Post.model");
const PublicPostRouter = express.Router();

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

PublicPostRouter.get("/:postId", getSinglePost);

module.exports = PublicPostRouter;