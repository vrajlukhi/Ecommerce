const {Router}=require("express")
const { signupui, signup, loginui, login } = require("../controller/user.controller")
const UserRoute=Router()

UserRoute.get("/signup",signupui)
UserRoute.post("/signup",signup)
UserRoute.get("/login",loginui)
UserRoute.post("/login",login)

module.exports=UserRoute