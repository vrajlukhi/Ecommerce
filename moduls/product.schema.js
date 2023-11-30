const mongoose=require("mongoose")
const ProductSchema=new mongoose.Schema({
    title:String,
    desc:String,
    img:String,
    price:Number,
    UserId:String,
})
const ProductModel=mongoose.model("prodect",ProductSchema)
module.exports=ProductModel