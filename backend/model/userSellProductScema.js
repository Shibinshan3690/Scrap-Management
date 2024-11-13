const mongoose=require("mongoose");



 const userSellProduct=new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   createdAt: { type: Date, default: Date.now },
        
     productName:{
          type:String,
          
     },
     vehical:{
        type:String,
         
     },
     description:{
        type:String,
        require:true,
        trim:true
     },
     adress:{
        type:String,
        require:true,
        trim:true
     },
     phoneNumber:{
        type:String,
        require:true,
        trim:true
     },
     pincode:{
        type:String,
        require:true,
        trim:true
     },
     date:{
        type:String,
        require:true,
        trim:true
     }


 },{ timestamps: true })
  const userSellProductSchema=mongoose.model("userSellProducts",userSellProduct);
  module.exports=userSellProductSchema;