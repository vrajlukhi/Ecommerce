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
    res.send({prodata:data})
}

module.exports={productadd,productui,product}