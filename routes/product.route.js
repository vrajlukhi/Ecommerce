const {Router}=require("express")
const { productui, productadd, product } = require("../controller/product.controller")
const { IsAuth } = require("../middlewear/auth")
const ProRoute=Router()

ProRoute.get("/proadd",productui)
ProRoute.post("/proadd",IsAuth,productadd)
ProRoute.get("/products",IsAuth,product)

module.exports=ProRoute