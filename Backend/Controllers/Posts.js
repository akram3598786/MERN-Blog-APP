const PostModel = require("../Models/Post.model");
const express = require("express");
const UserModel = require("../Models/User.model");
const PostRouter = express.Router();

async function CreatePost(req, res){
    try{
        const payload = req.body;
         const {userId} = req.params;
         let user = await UserModel.findById(userId);
        // console.log(user);
        if(user){
            let post = await PostModel(payload);
            await post.save();  
            user.posts = [...user.posts, post._id];
            await user.save();
           res.status(201).send({message : "Post created", post});
        }else{
            res.status(404).send("User not exist");
        }
    }
    catch(err){
        res.status(500).send(err.message);
    }
}

async function getALLposts(req, res){
    try{
       let posts = await PostModel.find();
       if(posts.length > 0){
          res.status(200).send(posts);
       }else{
         res.status(404).send("No post exist");
       }
    }
    catch(err){
        res.send(err.message);
    }
}

async function getSinglePost(req, res){
    try{
       let {postId} = req.params;
       let post = await PostModel.findById(postId);
       if(post) res.status(200).send(post);
       else res.status(404).send("Post not found !");
    }
    catch(err){
        res.send(err.message);
    }
}

PostRouter.post("/:userId", CreatePost);
PostRouter.get("/all", getALLposts);
PostRouter.get("/:postId", getSinglePost);

module.exports =  PostRouter;
