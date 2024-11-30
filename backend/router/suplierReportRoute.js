const express = require('express');
const suplierReportRoute = express.Router();


const supplierReportController=require("../controller/suplireReportController");


suplierReportRoute.post('/report/:supplierId',supplierReportController.createReport);
suplierReportRoute.get('/report/:supplierId', supplierReportController.getReport);
suplierReportRoute.get(`/report/:id/:supplierId`,supplierReportController.getReportFindById)


module.exports=suplierReportRoute;
