const express = require("express");
require('dotenv').config();
const ConnectDB = require("./Config/ConnectDB.js");
const PostRouter = require("./Controllers/Posts.js");
const UserRouter = require("./Controllers/UsersData.js");
const AuthRouter = require("./Controllers/Authentication.js");
const cors = require("cors");
const auth = require("./Middlewares/Auth.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use(auth) // Authourization purpose

app.use("/post", PostRouter);
app.use("/user", UserRouter);

let port = process.env.PORT || 8080;
//  app.get("/",(rq, res)=>[
//      res.send("Its working fine") // for debuging purpose
//  ])
app.listen(port, async (req, res) => {
  try {
     await ConnectDB();
    console.log("server running on 8080 port");
  }
  catch (err) {
    console.log("Error occured", err);
  }
})