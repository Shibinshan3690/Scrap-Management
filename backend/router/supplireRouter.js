  const express=require("express")
  const supplierController=require("../controller/supllireController")
  const supplierRouter=express.Router();
 
  supplierRouter.post(`/signUp`,supplierController.signUp);
  supplierRouter.post(`/signIn`,supplierController.signIn);
  supplierRouter.get("/allSupplires",supplierController.getAllSupplires);




  

  
  module.exports=supplierRouter;