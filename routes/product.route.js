const {Router}=require("express")
const { productui, productadd, product, allproduct, allproductui, cartpage, cart, cartdata, dproduct, quntity, payment } = require("../controller/product.controller")
const { IsAuth } = require("../middlewear/auth")
const ProRoute=Router()

ProRoute.get("/proadd",productui)
ProRoute.post("/proadd",IsAuth,productadd)
ProRoute.get("/products",IsAuth,product)
ProRoute.get("/",allproduct)
ProRoute.get("/proui",allproductui)
ProRoute.get("/cartpage",IsAuth,cartpage)
ProRoute.post("/cart/:id",IsAuth, cart)
ProRoute.get("/cartdata",IsAuth, cartdata)
ProRoute.delete("/delete/:id",IsAuth, dproduct)
ProRoute.patch("/cart/update/:id", IsAuth, quntity)
ProRoute.post("/payment", IsAuth, payment)

module.exports=ProRoute