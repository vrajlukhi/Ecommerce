const bcrypt = require('bcrypt');
const UserModel = require('../moduls/user.schema');
const jwt = require("jsonwebtoken")

const signupui = (req, res) => {
    res.render("signup")
}
const signup = async (req, res) => {
    let { name, email, password } = req.body
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
const loginui = (req, res) => {
    res.render("login")
}
const login = async (req, res) => {
    let { email, password } = req.body
    let pass=await UserModel.findOne({email})
    // console.log(pass);
    bcrypt.compare(password, pass.password, async (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            let data = await UserModel.findOne({ email: email, password: password })
            console.log(data);
            if (data) {
                let token = jwt.sign({ name: data.name }, 'pass');
                res.cookie("token", token).send({message:"login sussecfull"})
                console.log(token);
            }
            else{
                res.send({message:"first signup"})
            }
        }
    });
}

module.exports = { signupui, signup, loginui, login }