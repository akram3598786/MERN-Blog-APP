const express = require("express");
const UserModel = require("../Models/User.model");
const UserRouter = express.Router();

async function getAllUsers(req, res){
    try{
        let users = await UserModel.find();

        if(users.length > 0){
            res.status(200).send(users);
        }else{
            res.status(400).send("No user exist yet !");
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

    async function EditUserdetails(req,res){
        try {
            let { userId } = req.params;
            let payload = req.body;
            let user = await UserModel.findByIdAndUpdate(userId, payload,
                { new: true });
            // console.log(post)
            if (user) res.status(201).send("Profile Edited");
            else res.status(400).send("User not updated !");
        } catch (err) {
            res.send(err.message);
        }
    }

    UserRouter.get("/", getAllUsers);
    UserRouter.get("/:userId", getUserData);
    UserRouter.patch("/edit/:userId",EditUserdetails);


module.exports = UserRouter;