const {Router}=require("express")
const { signupui, signup, loginui, login, pro } = require("../controller/user.controller")
const { IsAuth } = require("../middlewear/auth")
const UserRoute=Router()

UserRoute.get("/signup",signupui)
UserRoute.post("/signup",signup)
UserRoute.get("/login",loginui)
UserRoute.post("/login",login)
UserRoute.get("/pro",IsAuth,pro)

module.exports=UserRoute