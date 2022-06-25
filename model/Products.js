const mongoose = require("mongoose"); 
const schema = new mongoose.Schema({
    productURL:{type:String, unique:true, required:true}, 
    productShortDetails:String
}); 
const Products = new mongoose.model("Products", schema); 
module.exports = Products; 