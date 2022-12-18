const express = require("express");
const UserModel = require("../Models/User.model");
const UserRouter = express.Router();

UserRouter.get("/", getAllUsers);
UserRouter.get("/:userId", getUserData);

async function getAllUsers(req, res){
    try{
        let users = await UserModel.find();

        if(users.length > 0){
            res.status(200).send(users);
        }else{
            res.send("No user exist yet !");
        }
    }
    catch(err){
        res.send(err.message);
    }
}

async function getUserData(req, res){
    try{
        let {userId} = req.params;
         let userData = await UserModel.findById(userId).populate('posts');
       //  console.log(userData.posts)
         userData = userData.toJSON();
         delete userData.password;
         if(userData) res.status(200).send(userData);
         else res.status(404).send("User not found !");
    }
    catch(err){
        res.send(err.message);
    }
}

module.exports = UserRouter;