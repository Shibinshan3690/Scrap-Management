const mongoose = require("mongoose");

const SupplierReportSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", // Ensure the 'User' model exists in your project
    
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supllireSchema",
    required: true,
  },

  orderId: {  type: mongoose.Schema.Types.ObjectId, 
     ref:"userSellProducts"
  },
  items: [
    {
      item: { type: String, required: true },
      weight: { type: String, required: true },
      amount: { type: String, required: true },
      remarks: { type: String, required: false },
    },
  ],
  totalWeight: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentDetails: {
    accountNumber: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    ifscCode: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SupplierReport", SupplierReportSchema);
