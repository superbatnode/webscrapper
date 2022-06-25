const env = require("dotenv").config; 
const dbURL = process.env.DB_URL; 
const mongoose = require("mongoose"); 
const main = require("./webScraper");
const totalPage=45; 
const connection = async()=>await mongoose.connect(dbURL, (e)=>e && console.log(e));
try{
  connection(); 
  console.log("connected successfully");
}catch(e){
  console.log(e)
}
main(45);
