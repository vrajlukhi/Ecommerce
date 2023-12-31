const {Router}=require("express")
const { productui, productadd, product, allproduct, allproductui } = require("../controller/product.controller")
const { IsAuth } = require("../middlewear/auth")
const ProRoute=Router()

ProRoute.get("/proadd",productui)
ProRoute.post("/proadd",IsAuth,productadd)
ProRoute.get("/products",IsAuth,product)
ProRoute.get("/",allproduct)
ProRoute.get("/proui",allproductui)

module.exports=ProRoute