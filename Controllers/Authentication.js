const express = require("express");
const UserModel = require("../Models/User.model.js");
const { Sign } = require("../Utilities/JWT.js");
const AuthRouter = express.Router();
const bcrypt = require('bcrypt');


AuthRouter.post("/signup", SignUp);
AuthRouter.post("/login", Login);

async function SignUp(req, res) {
    try {
        const userData = req.body;
        let alreadyExisting = await UserModel.find({ email: userData.email });
        // console.log(alreadyExisting)
        if (alreadyExisting.length > 0) {
            // console.log('User already exists', alreadyExisting);
            return res.status(400).send({
                status: 'error',
                message: 'Email is already registered.'
            })
        } else {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(userData.password,salt);
            userData.password = hashedPassword;
            let user = await UserModel.create(userData);
            user = user.toJSON();
            delete user.password;
            return res.status(201).send({
                status: 'success',
                message: 'Account has been created.'
            });
        }

    }
    catch (err) {
        return res.status(500).send({
            status: 'error',
            message: 'Unexpected error occured.',
            error: err.message
        })
    }
}


async function Login(req, res) {

    try {
        const payload = req.body;
        let foundUser = await UserModel.findOne({email : payload.email});
        if(!foundUser) return res.status(404).send("User not registered");
        foundUser = foundUser.toJSON();
        const validatedPass = await bcrypt.compare(payload.password,foundUser.password);
        if (validatedPass){
            delete foundUser.password;
            const token = Sign(foundUser);
            res.status(201).send({
                message: `${foundUser.name} logged in successfully`,
                token: token,
                user: foundUser
            })
        }else{
            res.status(400).send("Wrong Password");
        }
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = AuthRouter;