const bcrypt = require("bcryptjs");
const adminuser = require("../model/admin-schema");
const jwt = require('jsonwebtoken'); 

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

// Placeholder for fetching admin details (you can implement this further)
const getAdminDeatils = async (req, res) => {
  try {
    // Your code here to fetch admin details
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { signUpAdmin, signInAdmin, getAdminDeatils };
