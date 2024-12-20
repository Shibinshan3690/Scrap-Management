const express=require("express");
const userController=require("../controller/userController");
const userRouter=express.Router();
const verifyToken=require('../middlwares/veryfyUserToken');
const verifyUserToken = require("../middlwares/veryfyUserToken");

userRouter.post("/signUpUser",userController.userSignUp);
userRouter.post("/signInUser",userController.userSignIn)
userRouter.post("/logout",userController.logout);



//   sell product routes 

userRouter.post("/sellproduct",verifyToken,userController.sellProduct);
userRouter.post("/activestatususer",verifyToken,userController.loginActiveStatus);
userRouter.get("/myorders",verifyToken,userController.getOrders)
userRouter.put("/orders/:orderId",verifyToken,userController.orderUpdateById);
userRouter.delete("/orders/:orderId",verifyToken,userController.deleteOrderById)

module.exports=userRouter;

