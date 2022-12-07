const mongoose = require("mongoose");


// let un = process.env.USER_NAME;
// let ps = process.env.PASSWORD;

// const username = encodeURIComponent(un);
// const password = encodeURIComponent(ps);
// console.log(un, username);
// console.log(ps, password);
// console.log(process.env.MONGODB_URI);
async function ConnectDB(req, res){
  // let url =  "mongodb://127.0.0.1:27017/MERN-APP";
   let url =  "mongodb+srv://akram2407:akram3598786@mern-app-blog.sgvzudd.mongodb.net/?retryWrites=true&w=majority";

  return new Promise((resolve, reject)=>{
    mongoose.connect(url).
    then(()=>{
        console.log("Connected to Database");
        resolve();
    }).catch((err)=>{
        console.log("Cannot connect to Database");
        reject(err);
    })
  })
}

module.exports =  ConnectDB;