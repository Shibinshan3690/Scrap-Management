const jwt = require('jsonwebtoken'); 
const bcrypt = require("bcryptjs");
const userSchema=require("../model/userSchema");
const userSellProducts=require("../model/userSellProductScema");


const userSignUp= async(req,res)=>{
       try {
          const {name,email,password}=req.body;

          if (!name || !email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required",
            });
        }
        
           const allreadyUser= await userSchema.findOne({email});
           if(allreadyUser){
              return  res.status(400).json({ status: "fail",
             message: "Email already registered"})
           }
           const hashpassword = await bcrypt.hash(password, 12);

           const newUser= await userSchema.create({
             name,
             email,
             password:hashpassword
           }) 
           return res.status(201).json({
            status:"succecfull",
            message:"succefully  signUP",
            userSchema:newUser

           }) 

       } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
          });
        
       }  
}

const userSignIn =async(req,res)=>{
try {
       const {email,password}=req.body;
         const newUsers=await userSchema.findOne({email});
           if(!newUsers){
            return res.status(400).json({
                message:"user not founded",
                status:"fail"

           })
           }
           const passwordHashed=await bcrypt.compare(password,newUsers.password);
               if(!passwordHashed){
                return res.status(400).json({
                    status:"fail",
                    message:"user not founded"
                })
               }
                   
               const token=jwt.sign(
                {userId:newUsers._id,email:newUsers.email},process.env.JWT_SECRET_USER,{expiresIn: '20h'}
            )
            return res.status(200).json({

                status:"success",
                message:"login succesful",
                token: token,
                newUsers:{
      
      
                  id:newUsers._id,
                    name:newUsers.name,
                    password:newUsers.password
                }
            })
             
} catch (error) {
      console.error(error);
      return res.status(500).json({message:"internal server error",status:"error"})
}

}


  //Logout code
  const logout = (req, res) => {
    try {
  


        return res.status(200).json({
            status: "success",
            message: "Logged out successfully. Please remove the token from your client storage.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
};









  // userSellProduct schema


  const sellProduct = async (req, res) => {
    try {
      const { productName, vehical, description, adress, phoneNumber, pincode, date } = req.body;
  
    
      if (!productName || !vehical || !description || !adress || !phoneNumber || !pincode || !date) {
        return res.status(400).json({ message: "All fields are required", status: "error" });
      }
  
      const newCreateList = await userSellProducts.create({
        productName,
        vehical,
        description,
        adress,
        phoneNumber,
        pincode,
        date
      });
  
      return res.status(200).json({ message: "Success", status: "success", sellProductList: newCreateList });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", status: "error" });
    }
  };
  









module.exports={userSignUp,userSignIn,sellProduct,logout}