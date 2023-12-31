const express=require("express")
const connect = require("./confing/db")
const cookie=require("cookie-parser")
const UserRoute = require("./routes/user.router")
const ProRoute = require("./routes/product.route")
const { IsAuth } = require("./middlewear/auth")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views',(__dirname+"/views"))
app.use(express.static(__dirname+"/public"))
app.use(cookie())

app.use("/user",UserRoute)
app.use("/product",ProRoute)
app.use("/",IsAuth,(req,res)=>{
    res.redirect("/product")
})

app.listen("8090",()=>{
    connect()
    console.log("8090");
})