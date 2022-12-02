const express = require("express");
const UserModel = require("../Models/User.model");
const AuthRouter = express.Router();

AuthRouter.post("/signup",SignUp);
AuthRouter.post("/login",Login);

async function SignUp(req, res){
    try{
       const userData = req.body;
       await UserModel.create(userData);
       let user = await UserModel.find({email : userData.email},{name: 1});
     //  console.log(user)
       res.status(201).send({message : `${user[0].name} Registed`, user})
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

async function Login(req, res){
    let token = 2345678
 try{
   const payload = req.body;
   let foundUser = await UserModel.findOne(payload);
   foundUser = foundUser.toJSON();
   delete foundUser.password;
  // console.log(foundUser)
  if(foundUser)  res.status(201).send({message : `${foundUser.name} logged in successfully`, token, foundUser })
  else res.status(404).send("User not registered");
  
 }
 catch(err){
    res.status(500).send(err.message)
  } 
}

module.exports = AuthRouter;