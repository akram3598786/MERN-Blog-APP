const mongoose = require("mongoose");
const Mongodb = require("mongodb");

async function ConnectDB(req, res){
   let url =  "mongodb://127.0.0.1:27017/MERN-APP";
    // let url =  process.env.MONGODB_URI;

  return new Promise((resolve, reject)=>{
    mongoose.connect(url).
    then(()=>{
        // console.log("Connected to Database");
        resolve();
    }).catch((err)=>{
        console.log("Cannot connect to Database");
        reject(err);
    })
  })
}
  // await ConnectMultiple(); NOTE :  get All present databases
/*
function  ConnectMultiple(){
 
// Connection URL
const url = 'mongodb://localhost:27017/';
 
// Database name
const databasename = "GFG";

 MongoClient.connect(url).then((client) => {
 
   // Use admin request
   const connect = client.db(databasename).admin();
  
   connect.listDatabases((err,dbs) => {
      // Printing the databases
      if(!err) console.log(dbs);
      dbs.databases.forEach(db => {
        // let collections  = db.listCollections(); // Not working
        console.log(db)
      });
   })
}).catch((err) => {
 
   // Printing the error message
   console.log(err.Message);
})
}
*/
module.exports =  ConnectDB;