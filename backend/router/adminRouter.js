const express = require("express");
const adminController = require("../controller/adminController");

const adminRouter = express.Router();

adminRouter.post("/signUpAdmin", adminController.signUpAdmin);
adminRouter.post("/signInAdmin",adminController.signInAdmin);

module.exports = adminRouter;
