const express = require("express");
const UserModel = require("../Models/User.model.js");
const { Sign } = require("../Utilities/JWT.js");
const AuthRouter = express.Router();


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
            let user = await UserModel.create(userData);
            user = user.toJSON();
            delete user.password;
            return res.status(201).send({
                status: 'success',
                message: 'Account has been created.',
                data: user
            })
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
        let foundUser = await UserModel.findOne(payload);
        foundUser = foundUser.toJSON();;
        delete foundUser.password;
        if (foundUser) {
            const token = Sign(foundUser);
            res.status(201).send({
                message: `${foundUser.name} logged in successfully`,
                token: token,
                user: foundUser
            })
        }
        else res.status(404).send("User not registered");

    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = AuthRouter;