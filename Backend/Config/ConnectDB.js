const mongoose = require("mongoose");

async function ConnectDB(req, res){
  let url = "mongodb://127.0.0.1:27017/MERN-APP"
    
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