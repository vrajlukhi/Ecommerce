const mongoose = require('mongoose');

const cartschema = new mongoose.Schema({

    UserId : {type : mongoose.Schema.Types.ObjectId,ref :"user"},
    productID : {type : mongoose.Schema.Types.ObjectId, ref :"prodect"},
    qty : {type : Number, default:1}
})

const cartmodel = mongoose.model("cart",cartschema);

module.exports =cartmodel