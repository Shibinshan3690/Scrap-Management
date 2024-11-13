const express = require("express");
const adminController = require("../controller/adminController");

const adminRouter = express.Router();

adminRouter.post("/signUpAdmin", adminController.signUpAdmin);
adminRouter.post("/signInAdmin",adminController.signInAdmin);
adminRouter.put('/admin/:id',adminController.adminDeatilsUpdate)

adminRouter.get("/getAdminUserSellDeatils",adminController.getAdminUserOrderDeatils)
adminRouter.get("/getUserOrderCurrentDate",adminController.getUserOrderCurrentDate);
adminRouter.get("/getAdminuserDeatils",adminController.getAdminUserDeatils);
adminRouter.put('/getAdminUserDetailsUpdate/:id',adminController.getAdminUserDetailsUpdate)

adminRouter.get("/getOrderById/:id",adminController.getOrderById);
adminRouter.get("/getIdUserDeatilAndUserOrder/:id",adminController.getIdUserDetailAndUserOrder);
adminRouter.put("/blockUser/:id",adminController.blockUser);
adminRouter.put("/unblockedUser/:id",adminController.unblockedUser);




module.exports = adminRouter;
