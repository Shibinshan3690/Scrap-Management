const SupplierReportSchema = require("../model/SupplierReportSchema");

const userSellProductSchema = require("../model/userSellProductScema");

const createReport = async (req, res) => {
   
  try {
  const { supplierId } = req.params; 
    const { 
      orderId,
      items,
      totalWeight,
      totalAmount,
      paymentDetails,
    } = req.body;

    const report = new SupplierReportSchema({
        supplierId,
        orderId,
        items,
        totalWeight,
        totalAmount,
        paymentDetails,
      });
         
      await report.save();
console.log("reports",report)

       const updatedOrder=await userSellProductSchema.findOneAndUpdate(
        { _id: orderId, assignedSupplier: supplierId }, 
        { status: "compleated" },
        { new: true } 
       );
       
       if (!updatedOrder) {
        return res.status(404).json({
          message: "Order not found or unauthorized supplier.",
        });
      }


      const user = await userSellProductSchema.findById(updatedOrder).populate("user"); 

    console.log("userrrrrr",user)
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Respond with the report, updated order, and user details
    res.status(201).json({
      message: "Report submitted successfully, order status updated to completed.",
      report,
      updatedOrder,
      user, 
    });


  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error: error.message });
  }
};




const getReportsBySupplierId  =async(req,res)=>{
    const { supplierId } = req.params; 
  try {
    const reports = await SupplierReportSchema.find({ supplierId });
      console.log("reports",reports)
    if (!reports || reports.length === 0) {
        return res.status(404).json({ message: "No reports found for this supplier." });
      }

      
      // Return the reports
      res.status(200).json({
        message: "Reports retrieved successfully.",
        reports,
      });
  } catch (error) {
    res.status(500).json({
        message: "Error fetching reports.",
        error: error.message,
      });

  }


}













module.exports = { createReport ,getReportsBySupplierId};
