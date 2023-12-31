const ProductModel = require("../moduls/product.schema")

const productui=(req,res)=>{
    res.render("product")
}
const productadd=async(req,res)=>{
    let data=await ProductModel.create(req.body)
    res.send({productdata:data})
}
const product=async(req,res)=>{
    let data=await ProductModel.find({UserId:req.body.UserId})
    res.json(data)
}
const allproductui=async(req,res)=>{
    let data=await ProductModel.find()
    res.json(data)
}
const allproduct=async(req,res)=>{
    res.render("products")
}

module.exports={productadd,productui,product,allproduct,allproductui}