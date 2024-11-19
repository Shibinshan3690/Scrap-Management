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
     
   distric:{
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
     },
     status:{
      type: String,
      enum: ['pending', 'confirm','compleated'],
      default: 'pending',
     },
     assignedSupplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
     


 },{ timestamps: true })
  const userSellProductSchema=mongoose.model("userSellProducts",userSellProduct);
  module.exports=userSellProductSchema;