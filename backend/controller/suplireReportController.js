const SupplierReport = require("../model/SupplierReportSchema"); 
const UserSellProduct = require("../model/userSellProductScema"); 

const createReport = async (req, res) => {
  try {
    const { supplierId } = req.params; 
    const { orderId, items, totalWeight,remarks, totalAmount, paymentDetails } = req.body;

   
    if (!supplierId) {
      return res.status(400).json({ message: "Supplier ID is required" });
    }

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

  
    if (!paymentDetails || !paymentDetails.accountNumber || !paymentDetails.accountHolderName || !paymentDetails.ifscCode) {
      return res.status(400).json({ message: "Complete payment details are required" });
    }

    
    if (!items || !items.length) {
      return res.status(400).json({ message: "At least one item is required in the report" });
    }

    
    const userOrder = await UserSellProduct.findOne({ _id: orderId });
    if (!userOrder) {
      return res.status(404).json({ message: "Order ID not found" });
    }

    
 


    const newReport = new SupplierReport({
      supplierId,
      orderId,
      items,
      remarks,
      totalWeight,
      totalAmount,
      paymentDetails,
     
      createdAt: new Date(),
    });
  

    
    await newReport.save();

   
    userOrder.status = "compleated"; 
    await userOrder.save();

    res.status(201).json({ message: "Report successfully created", report: newReport });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};





const getReport = async (req, res) => {
  try {
    const { supplierId } = req.params; 

    if (!supplierId) {
      return res.status(400).json({ message: "Supplier ID is required" });
    }

    const reports = await SupplierReport.find({ supplierId })
    .populate("orderId", "user productName vehical description distric adress phoneNumber pincode date status assignedSupplier") 
    .sort({ createdAt: -1 });

    // Check if reports exist for the given supplierId
    if (!reports.length) {
      return res.status(404).json({ message: "No reports found for the given Supplier ID" });
    }

    // Respond with the retrieved reports
    res.status(200).json({ message: "Reports retrieved successfully", reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



const getReportFindById = async (req, res) => {
  try {
    const { supplierId, id } = req.params; // Destructure supplierId and id from params
     
    if (!supplierId || !id) {
      return res.status(400).json({ message: "Supplier ID and Report ID are required" });
    }

    // Find the report by its ID and filter by supplierId
    const reports = await SupplierReport.findOne({ _id: id, supplierId })
      .populate("orderId", "user productName vehical description distric adress phoneNumber pincode date status assignedSupplier")
      .sort({ createdAt: -1 });

    if (!reports) {
      return res.status(404).json({ message: "No report found for the given Supplier ID and Report ID" });
    }

    res.status(200).json({ message: "Report retrieved successfully", reports });

  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};










module.exports = { createReport,getReport,getReportFindById };
