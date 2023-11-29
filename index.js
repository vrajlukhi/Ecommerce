const express=require("express")
const connect = require("./confing/db")
const cookie=require("cookie-parser")
const UserRoute = require("./routes/user.router")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views',(__dirname+"/views"))
app.use(express.static(__dirname+"/public"))
app.use(cookie())

app.use("/user",UserRoute)

app.listen("8090",()=>{
    connect()
    console.log("8090");
})