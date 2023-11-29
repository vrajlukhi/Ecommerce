const mongoose =require("mongoose")
const connect =async()=>{
    await mongoose.connect(process.env.URL)
    console.log("mongoose");
}
module.exports=connect