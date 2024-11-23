



const { body } = require('express-validator');

const validateReportData = [
  // Validate that each item in the "items" array has itemName, weight, and remarks
  body('items.*.itemName').notEmpty().withMessage('Item name is required'),
  body('items.*.weight').notEmpty().withMessage('Weight is required'),
  body('items.*.remarks').notEmpty().withMessage('Remarks are required'),
  // Validate that customAmount, if provided, is a valid number
  body('items.*.customAmount').optional().isNumeric().withMessage('Custom amount must be a valid number'),
];



module.exports = validateReportData;
