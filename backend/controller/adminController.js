const bcrypt = require("bcryptjs");
const adminuser = require("../model/admin-schema");
const jwt = require('jsonwebtoken'); 
const userSellProductSchema=require("../model/userSellProductScema");
const userShema=require("../model/userSchema");
const adminScheam=require("../model/admin-schema")
const { default: mongoose } = require("mongoose");


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
    console.log(adminUser,'thisadd')
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
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today

   
    const todayOrders = await userSellProductSchema.find({
      createdAt: {
        $gte: startOfDay, 
        $lte: endOfDay, 
      },
    }).populate('user','name');

   
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



module.exports = { signUpAdmin, signInAdmin, getAdminUserOrderDeatils,getAdminUserDeatils,getAdminUserDetailsUpdate,getUserOrderCurrentDate,getOrderById,
  getIdUserDetailAndUserOrder,adminDeatilsUpdate,adminDeatilsUpdate
};
