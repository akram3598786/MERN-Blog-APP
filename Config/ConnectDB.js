const mongoose = require("mongoose");
const username = encodeURIComponent("akram2407");
const password = encodeURIComponent("Akram@3598786");

async function ConnectDB(req, res){
    let url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/MERN-APP"
   // console.log("uri",process.env.MONGODB_URI);
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