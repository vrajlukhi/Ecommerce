const jwt=require("jsonwebtoken")

const IsAuth = (req, res, next) => {
    let token = req.cookies.token
    if (token) {
        let decoded = jwt.verify(token, 'pass');
        next()
    }
    else{
        res.redirect("/user/login")
    }
}

module.exports={IsAuth}