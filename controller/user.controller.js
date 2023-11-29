const bcrypt = require('bcrypt');
const UserModel = require('../moduls/user.schema');
const jwt = require("jsonwebtoken")

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
                res.send({ message: "user created", data: data })
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
                    res.cookie("token", token).redirect("/user/pro")
            }
            else {
                res.send({msg:"your password is incorrect"})
            }
        });
    }
    else{
        alert("first signup")
        res.redirect("/user/signup")
    }
}
const pro=(req,res)=>{
    res.render("product")
}

module.exports = { signupui, signup, loginui, login ,pro}