const mongoose=require("mongoose");


const userModel=new mongoose.Schema({
    name: {
        type: String,  
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim:true
    }
})
const userSchema=mongoose.model("userModel",userModel);
module.exports=userSchema;
