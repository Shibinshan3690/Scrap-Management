const jwt = require('jsonwebtoken'); 
const bcrypt = require("bcryptjs");
const userSchema=require("../model/userSchema");
const userSellProducts=require("../model/userSellProductScema");
const Notification=require("../model/notificationSchema")


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
           if (newUsers.isBlocked) {
            return res.status(403).json({
                message: "Your blocked",
                status: "fail"
            });
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
      const user=req.user.userId
       console.log("userId",user)
   
      const { productName, vehical, description, adress, phoneNumber, pincode, date,distric } = req.body;
     
    
      if (!productName || !vehical || !description || !adress || !phoneNumber || !pincode || !date|| !distric) {
        return res.status(400).json({ message: "All fields are required", status: "error" });
      }
  
      const newCreateList = await userSellProducts.create({
        user,
        productName,
        vehical,
        description,
        distric,
        adress,
        phoneNumber,
        pincode,
        date
      });
      console.log('n',newCreateList);

      const populatedList = await userSellProducts.findById(newCreateList._id).populate('user', 'name'); 

      console.log('Populated List:', populatedList);
          // notification creatte
      const notificationMessage=`${productName} has been sold by  ${populatedList.user.name}`;
      await Notification.create({
        user,
        message:notificationMessage,
      });

   

      return res.status(200).json({ message: "Success", status: "success", sellProductList: newCreateList });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", status: "error" });
    }
  };
  



  const getOrders = async (req, res) => {
    try {
      const user=req.user.userId   
      
    console.log("user",user)
      const userOrders = await userSellProducts.find({ user }).sort({ date: -1 });
      if (userOrders.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "No orders found",
        });
      }
  
      return res.status(200).json({
        status: "success",
        message: "Orders retrieved successfully",
        orders: userOrders,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };
  

  const orderUpdateById=async(req,res)=>{
    const orderId = req.params.orderId;
    const updateFields = req.body;
    try {
      const existingOrder = await userSellProducts.findById(orderId);
      if (!existingOrder) {
          return res.status(404).json({
              status: "fail",
              message: "Order not found",
          });
      }
      const updatedOrder = await userSellProducts.findByIdAndUpdate(orderId, updateFields, {
        new: true, 
        runValidators: true, 
    });

    return res.status(200).json({
        status: "success",
        message: "Order updated successfully",
        updatedOrder,
    });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
          status: "error",
          message: "Internal server error",
      });
    }
  }


const deleteOrderById = async(req,res)=>{
  const orderId = req.params.orderId;
   try {
       
    const existingOrder = await userSellProducts.findById(orderId);
    if (!existingOrder) {
        return res.status(404).json({
            status: "fail",
            message: "Order not found",
        });
        }

    await userSellProducts.findByIdAndDelete(orderId);
    return res.status(200).json({
        status: "success",
        message: "Order deleted successfully",
  });
   } catch (error) {
        console.error(error);
        return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
   }
}










    // active status 


      const loginActiveStatus=async(req,res)=>{
              try {
                const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
                if(!token){
                      return res.status(401).json({
                          status:"fail",
                          message:"No token provided, user not authenticated."
                      });

                }     
                
                
                  const decoded=jwt.verify(token,process.env.JWT_SECRET_USER);

                   const user=await userSchema.findById(decoded.userId)

                     if(!user){
                        return res.status(404).json({
                           status:"fail",
                           message:"User not found."
                        });

                     }

                     return res.status(200).json({
                      status:"succes",
                      message:"user  in Logged",
                      activeStatus:"active",
                      user:{
                        id: user._id,
                name: user.name,
                email: user.email
                      }
                     });

              } catch (error) {
                console.error(error)
                return res.status(500).json({
                    status: "error",
                    message: "Internal server error",
                });
              }
      }








module.exports={userSignUp,userSignIn,sellProduct,logout,loginActiveStatus,getOrders,orderUpdateById,deleteOrderById}