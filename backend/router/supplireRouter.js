  const express=require("express")
  const supplierController=require("../controller/supllireController");
const supllireSchemaa = require("../model/supplireSchema");
  const supplierRouter=express.Router();
 
  supplierRouter.post(`/signUp`,supplierController.signUp);
  supplierRouter.post(`/signIn`,supplierController.signIn);
  supplierRouter.get("/allSupplires",supplierController.getAllSupplires);
  supplierRouter.get("/tasks/:supplierId",supplierController.getSupplierTasks)
  supplierRouter.put("/confirm/:orderId",supplierController.confirmOrder)
  supplierRouter.get("/assigned-orders/:supplierId",supplierController.getAssignedOrders)



  

  
  module.exports=supplierRouter;