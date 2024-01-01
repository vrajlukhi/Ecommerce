const bcrypt = require('bcrypt');
const UserModel = require('../moduls/user.schema');
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const otpGenerator = require('otp-generator')

const signupui = (req, res) => {
    res.render("signup")
}
const signup = async (req, res) => {
    let { name, email, password } = req.body
    let data=await UserModel.findOne({email:email})
    if(data){
        alert("already create account. login please.")
        res.redirect("/user/login")
    }
    else{
        bcrypt.hash(password, 7, async (err, hash) => {
            if (err) {
                res.send(err)
            }
            else {
                let data = await UserModel.create({ name: name, email: email, password: hash })
                let token = jwt.sign({ id: data._id }, 'pass');
                res.cookie("token", token).redirect("/product")
            }
        });
    }
}
const loginui = (req, res) => {
    res.render("login")
}
const login = async (req, res) => {
    let { email, password } = req.body
    let data=await UserModel.findOne({email:email})
    if(data){
        bcrypt.compare(password, data.password,(err, result) => {
            if (result) {
                    let token = jwt.sign({ id: data._id }, 'pass');
                    res.cookie("token", token).redirect("/product/proadd")
            }
            else {
                res.send({msg:"your password is incorrect"})
            }        });
    }
    else{
        alert("first signup")
        res.redirect("/user/signup")
    }
}

const profilepage = (req, res) => {
    res.render("profile")
}


const forgetform_page = (req, res) => {
    res.render("forgotpass")
}
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "vrajlukhi@gmail.com",
        pass: "csyz dyjy gvwi wrog"
    }
})

let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });


const reset = async (req, res) => {
    let { email } = req.body
    let user = await UserModel.findOne({ email })

    if (user) {
        const mailoption = {
            from: "vrajlukhi@gmail.com",
            to: email,
            subject: "reset password",
            html: `<a href=http://localhost:8080/user/verify/${otp}> otp : ${otp} </a>`
        }
        transporter.sendMail(mailoption, (err, info) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send("check your password")
            }
        })
        res.cookie("userId", user.id).send("sending otp")

    }
    else {
        res.send("user not found")
    }
}

const verify = (req, res) => {
    let verifyotp = req.params.otp
    if (verifyotp == otp) {
        res.render("newpass")
    }
    else {
        res.send("not verifying otp")
    }
}


const newpass = async (req, res) => {
    let id = req.cookies.userId
    let { password } = req.body
    console.log(id, password);
    bcrypt.hash(password, 5, async (err, hash) => {
        let data = await UserModel.findByIdAndUpdate(id, { password :hash})

        console.log("data", data);
        data = await UserModel.findById(id)
        console.log(data);
        res.send("data")      
})

}
const profiledata = async (req, res) => {
    let { id } = req.cookies
    let data = await UserModel.findOne(id)
    res.send(data)
    console.log(data);
}

module.exports = { signupui, signup, loginui, login ,profiledata,newpass,verify,reset,forgetform_page,profilepage}