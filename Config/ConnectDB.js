const mongoose = require("mongoose");
const username = encodeURIComponent("<akram2407>");
const password = encodeURIComponent("<Akram@3598786>");

async function ConnectDB(req, res){
  // let url =  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/MERN-APP";
  let url =  `mongodb+srv://${username}:${password}@mern-app-blog.sgvzudd.mongodb.net/?retryWrites=true&w=majority`
   || "mongodb://127.0.0.1:27017/MERN-APP";
    
  return new Promise((resolve, reject)=>{
    mongoose.connect(url).
    then(()=>{
        console.log("Connected to Database");
        resolve();
    }).catch((err)=>{
        console.log("Cannot connect to Database");
        reject(err)
    })
  })
}

module.exports =  ConnectDB;