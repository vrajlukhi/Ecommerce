const cartmodel = require("../moduls/cart.schema")
const ProductModel = require("../moduls/product.schema")
const Razorpay = require("razorpay")

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
const cart = async (req, res) => {
    let data = await cartmodel.create(req.body)
    res.send(data)
}
const cartdata =async (req, res) => {
    let data = await cartmodel.find({UserId:req.body.UserId}).populate("productID")
    res.send(data)
}
const cartpage = (req, res) => {
    res.render("cart")
}

const dproduct =  async(req, res) => {
    let { id } = req.params
 let data = await ProductModel.findByIdAndDelete(id)
 res.send(data)
}


// qty logic
const quntity = async(req, res) => {
    let { id } = req.params
    let {val}=req.body
    let data = await cartmodel.findById(id)

    if(data.qty == 1 && val == -1){
        await cartmodel.findByIdAndDelete(id)
        return res.send({status: 'success'})
    }
    data.qty = data.qty + val ;
    await data.save()
    res.send(data)
}


// payment 

const razorpay = new Razorpay({
    key_id :"rzp_test_ZwsKvw5bh9rweM",
    key_secret :"ElVpauo6VzGuQEv8znHcuwwG"
})

const payment = (req, res) => {
    let {amount} =req.body
    let options ={
        amount : amount*100
    }
    razorpay.orders.create(options,(err , order) => {
        if(err){
            console.log(err)
            res.send({data : err.message})
        }
        else{
            res.send(order)
            
        }
    })
}
module.exports={productadd,productui,product,allproduct,allproductui,payment,cart,cartpage,quntity,dproduct,cartdata}