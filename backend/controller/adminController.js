const bcrypt = require("bcryptjs");
const adminuser = require("../model/admin-schema");
const jwt = require('jsonwebtoken'); 
const userSellProductSchema=require("../model/userSellProductScema");
const userShema=require("../model/userSchema");
const adminScheam=require("../model/admin-schema")
const { default: mongoose } = require("mongoose");
const  supplireSchema=require("../model/supplireSchema");
const supllireSchemaa = require("../model/supplireSchema");
const SupplierReportSchema = require("../model/SupplierReportSchema");
  


const signUpAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await adminuser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email already registered",
      });
    }

    // Hash the password
    const hashpassword = await bcrypt.hash(password, 12);

    // Create new user
    const newAdminUser = await adminuser.create({
      name,
      email,
      password: hashpassword,
    });

    // Send success response
    return res.status(201).json({
      status: "success",
      message: "Registration successful",
      adminUser: {
        id: newAdminUser._id,
        name: newAdminUser.name,
        email: newAdminUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const signInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const adminUser = await adminuser.findOne({ email });
    // console.log(adminUser,'thisadd')
    if (!adminUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect password",
      });
    }

    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET_ADMIN) {
      return res.status(500).json({
        status: "error",
        message: "Server configuration error",
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: adminUser._id, email: adminUser.email },
      process.env.JWT_SECRET_ADMIN,
      { expiresIn: '20h' }
    );

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      token, // Return the token to the client
      adminUser: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};








const adminDeatilsUpdate = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, email } = req.body;
      console.log(name,'naem')
      const admin = await adminScheam.findByIdAndUpdate(id, { name, email }, { new: true });
      if (!admin) {
          return res.status(404).json({
              status: 'fail',
              message: 'Admin not found',
          });
      }

      return res.status(200).json({
          status: 'success',
          message: 'Admin updated successfully',
          admin,
      });
  } catch (error) {
      console.error("Error updating admin:", error);
      return res.status(500).json({
          status: 'error',
          message: 'Internal server error',
      });
  }
};




const getAdminUserDeatils = async (req, res) => {
  try {
    // Fetch all users from userSchema
    const users = await userShema.find();

    if (!users.length) {
      return res.status(404).json({
        status: "fail",
        message: "No users found",
      });
    }

    // Send response with user details
    return res.status(200).json({
      status: "success",
      message: "Fetched user details successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};


const blockUser=async(req,res)=>{
    try {
       const {id}=req.params;
       const user= await userShema.findById(id);
       if(!user){
          return res.status(404).json({message:"User not founded",status:"fail"})
       }
       user.isBlocked=true;
       await user.save();

       return res.status(200).json({status:"succes",message:"User blocked succesfully"})

    } catch (error) {
      console.error(error);
      return res.status(500).json({stauts:"error",message:"Internal server error"})
    }

}

const unblockedUser = async (req, res) => {
  try {
      const { id } = req.params;
      const user = await userShema.findById(id);

      if (!user) {
          return res.status(404).json({
              status: "fail",
              message: "User not found"
          });
      }

      // Check if the user is already unblocked
      if (!user.isBlocked) {
          return res.status(400).json({
              status: "fail",
              message: "User is not blocked"
          });
      }

      // Set isBlocked to false to unblock the user
      user.isBlocked = false;
      await user.save();

      return res.status(200).json({
          status: "success",
          message: "User unblocked successfully"
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          status: "error",
          message: "Internal server error"
      });
  }
};


const getAdminUserDetailsUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await userShema.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User details updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};







// Placeholder for fetching admin details (you can implement this further)
const getAdminUserOrderDeatils = async (req, res) => {
  try {
    // Fetch all documents in the userSellProductSchema collection
    const userSellProducts = await userSellProductSchema.find().populate('user');
    if (!userSellProducts.length) {
      return res.status(404).json({
        status: "fail",
        message: "No products found",
      });
    }

    // Respond with the list of products
    return res.status(200).json({
      status: "success",
      message: "Fetched user product details successfully",
      data: userSellProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};


const getUserOrderCurrentDate = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todayOrders = await userSellProductSchema
      .find({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
      .populate("user", "name email");
       

    res.status(200).json({
      success: true,
      message: "Today's orders fetched successfully",
      data: todayOrders,

    });

  } catch (error) {
    console.error("Error fetching today's orders:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching today's orders",
      error: error.message,
    });
  }
};



const getOrderById = async (req, res) => {
  try {
    const id  = req.params.id;
   
    const ID =new  mongoose.Types.ObjectId(id); 
  
const order = await userSellProductSchema.findById(ID).populate('user', 'name email');
   

    // Check if order was found
    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }

    // Respond with order details
    return res.status(200).json({
      status: "success",
      message: "Order details fetched successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching the order",
      error: error.message,
    });
  }
};






const getIdUserDetailAndUserOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Received User ID:", userId);

    // Check if provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid user ID format",
      });
    }

    
    // Find all orders associated with this user
    const userOrders = await userSellProductSchema.find({user:userId }).populate('user','-password');
    console.log("User Orders:", userOrders);

    return res.status(200).json({
      status: "success",
      message: "User details and orders fetched successfully",
      data: {
  userOrders
      },
    });
  } catch (error) {
    console.error("Error fetching user details and orders:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching user details and orders",
      error: error.message,
    });
  }
};

// acceptSupplier code 
  

const acceptSupplier = async (req, res) => {
  const { supplierId } = req.params;
  try {
    const supplier = await supplireSchema.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ status: "fail", message: "Supplier not found" });
    }

 
    if (supplier.status === "accepted") {
      return res.status(400).json({ status: "fail", message: "Supplier is already accepted" });
    }

    
    supplier.status = 'accepted';
    await supplier.save();

    res.status(200).json({
      status: "success",
      message: "Supplier accepted successfully",
      supplier: supplier,
    });

  } catch (error) {
    console.error("Error accepting supplier:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const unacceptSupplier = async (req, res) => {
  const { supplierId } = req.params;
  try {
    const supplier = await supplireSchema.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ status: "fail", message: "Supplier not found" });
    }

    // Check if the supplier is already inactive or unaccepted
    if (supplier.status !== "accepted") {
      return res.status(400).json({ status: "fail", message: "Supplier is not accepted" });
    }

    // Change status back to inactive or original status
    supplier.status = 'inactive'; // Or any other status you want for "unaccept"
    await supplier.save();

    res.status(200).json({
      status: "success",
      message: "Supplier status reverted successfully",
      supplier: supplier,
    });

  } catch (error) {
    console.error("Error reverting supplier status:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};





// Block supplier
const blockSupplier = async (req, res) => {
  const supplierId = req.params.supplierId;
   

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(supplierId)) {
    return res.status(400).send("Invalid Supplier ID");
  }

  try {
    const supplier = await supplireSchema.findById(supplierId);
     console.log(supplier,"Unsupplier")
    if (!supplier) {
      return res.status(404).send("Supplier not found");
    }

    supplier.isBlocked = true;
    await supplier.save();
    res.status(200).send({ status: "success", message: "Supplier blocked successfully" });
  } catch (error) {
    console.error("Error blocking supplier:", error);
    res.status(500).send({ status: "error", message: "Failed to block supplier" });
  }
};

// Unblock supplier
const unblockSupplier = async (req, res) => {
  const supplierId = req.params.supplierId;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(supplierId)) {
    return res.status(400).send("Invalid Supplier ID");
  }

  try {
    const supplier = await supplireSchema.findById(supplierId);
     
    if (!supplier) {
      return res.status(404).send("Supplier not found");
    }

    supplier.isBlocked = false;
    await supplier.save();
    res.status(200).send({ status: "success", message: "Supplier unblocked successfully" });
  } catch (error) {
    console.error("Error unblocking supplier:", error);
    res.status(500).send({ status: "error", message: "Failed to unblock supplier" });
  }
};



const assignSupplier  =async(req,res)=>{
      const {orderId}=req.params;
      const { supplierId } = req.body;
        try {
               const supplier= await supplireSchema.findById(supplierId);
               if(!supplier){
                return res.status(404).json({ message: 'Supplier not found' });
               }


               const order = await userSellProductSchema.findById(orderId);
               if (!order) {
                 return res.status(404).json({ message: 'Order not found' });
               }
                order.assignedSupplier=supplierId;
                order.save();

                res.status(200).json({
                  message: 'Supplier assigned successfully',
                  order,
                });
        } catch (error) {
          console.error('Error assigning supplier:', error);
          res.status(500).json({ message: 'Internal server error', error });
        }

}  


const getReportAdmin =async(req,res)=>{
    try {
       const reports=await SupplierReportSchema.find({})
       .populate("supplierId", "name email phone") 
      .populate("orderId", "user productName vehicle description district address phoneNumber pincode date status assignedSupplier") // Populate order details
      .sort({ createdAt: -1 });


      if (!reports.length) {
        return res.status(404).json({ message: "No reports found" });
      }
  
      // Respond with the retrieved reports
      res.status(200).json({ message: "Reports retrieved successfully", reports });

      console.error("Error fetching admin reports:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    } catch (error) {
      
    }
}

const getReportSpecifycAdmin = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log("req.params", req.params);

    
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

  
    const reports = await SupplierReportSchema.findOne({ orderId }) 
      .populate(
        "orderId",
        "user productName vehical description distric adress phoneNumber pincode date status assignedSupplier"
      )
      .sort({ createdAt: -1 });
      // console.log("reports",reports)

   
    if (!reports) {
      return res.status(404).json({
        message: "No report found for the given Order ID",
      });
    }

   
    res.status(200).json({
      message: "Report retrieved successfully",
      reports,
    });
  } catch (error) {
    
    console.error("Error fetching report:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the report",
      error: error.message,
    });
  }
};







   


module.exports = { signUpAdmin, signInAdmin,blockUser,unblockedUser,getAdminUserOrderDeatils,getAdminUserDeatils,getAdminUserDetailsUpdate,getUserOrderCurrentDate,getOrderById,
  getIdUserDetailAndUserOrder,adminDeatilsUpdate,adminDeatilsUpdate,acceptSupplier,unacceptSupplier,blockSupplier,unblockSupplier,assignSupplier,getReportAdmin,getReportSpecifycAdmin
};
