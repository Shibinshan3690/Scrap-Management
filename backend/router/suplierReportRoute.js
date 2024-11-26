const express = require('express');
const suplierReportRoute = express.Router();


const supplierReportController=require("../controller/suplireReportController");


suplierReportRoute.post('/report/:supplierId',supplierReportController.createReport);
suplierReportRoute.get('/reportes/:supplierId', supplierReportController.getReportsBySupplierId);


module.exports=suplierReportRoute;
