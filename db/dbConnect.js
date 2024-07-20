const mongoose=require('mongoose');

const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URL;


// async function dbConnect() {
//   const connect = await MongoClient.connect(url);
//   const db = connect.db("Learning");
//   const collection = db.collection("Users");
//   return collection;
// }

async function dbConnect() {
           mongoose.connect(url).then(() => {
             console.log("Database Connected successfully"); 
           }).catch((err) => {
              console.log("Failed to connect to the database",err);
           })
}

module.exports=dbConnect;