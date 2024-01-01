const {Router}=require("express")
const { signupui, signup, loginui, login, pro, profilepage, forgetform_page, reset, profiledata, newpass } = require("../controller/user.controller")
const { IsAuth } = require("../middlewear/auth")
const { verify } = require("jsonwebtoken")
const UserRoute=Router()

UserRoute.get("/signup",signupui)
UserRoute.post("/signup",signup)
UserRoute.get("/login",loginui)
UserRoute.post("/login",login)
UserRoute.get("/profile", IsAuth, profilepage)
UserRoute.get("/sendmail", forgetform_page)
UserRoute.post("/sendmail", reset)
UserRoute.get("/verify/:otp", verify)
UserRoute.get("/profiledata",IsAuth, profiledata)
UserRoute.post("/newpass",newpass)

module.exports=UserRoute