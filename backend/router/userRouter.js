const express=require("express");
const userController=require("../controller/userController");
const userRouter=express.Router();


userRouter.post("/signUpUser",userController.userSignUp);
userRouter.post("/signInUser",userController.userSignIn)
userRouter.post("/logout",userController.logout);


//   sell product routes

userRouter.post("/sellproduct",userController.sellProduct);

module.exports=userRouter;

