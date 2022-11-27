const express = require("express");
const ConnectDB  = require("./Config/ConnectDB.js");
const PostRouter = require("./Controllers/Posts.js");
const UserRouter = require("./Controllers/UsersData.js");
const AuthRouter = require("./Middlewares/Auth.js");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/auth",AuthRouter);
app.use("/post",PostRouter);
app.use("/user",UserRouter);

let port = 8080;
// app.get("/",(rq, res)=>[
//     res.send("Its working fine")
// ])
app.listen(port, async (req, res)=>{
    try{
       await ConnectDB();
       console.log("server running on 8080 port")
    }
    catch(err){
      console.log("Error occured", err);
    }
})