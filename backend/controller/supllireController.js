const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Supplier = require("../../backend/model/supplireSchema");

const signUp = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, state, district, streetAddress, zipCode, gender, age, category } = req.body;

    const existUser = await Supplier.findOne({ email });
    if (existUser) {
      return res.status(400).json({ status: "fail", message: "Email already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newSupplier = await Supplier.create({
      name,
      email,
      password: hashPassword,
      phoneNumber,
      state,
      district,
      streetAddress,
      zipCode,
      gender,
      age,
      category,
      createdAt: new Date()
    });

    res.status(201).json({
      status: "success",
      message: "Registration successful",
      supplier: { id: newSupplier._id, name: newSupplier.name, email: newSupplier.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", status: "fail" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const supplier = await Supplier.findOne({ email });
    if (!supplier) {
      return res.status(404).json({ message: "User not found", status: "fail" });
    }

    const checkPassword = await bcrypt.compare(password, supplier.password);
    if (!checkPassword) {
      return res.status(401).json({ status: "fail", message: "Incorrect password" });
    }

    const token = jwt.sign({ supplierId: supplier._id, email: supplier.email }, process.env.JWT_SECRET_SUPPLIER, { expiresIn: "20h" });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      supplier: {
        id: supplier._id,
        name: supplier.name,
        email: supplier.email,
        phoneNumber: supplier.phoneNumber,
        state: supplier.state,
        district: supplier.district,
        streetAddress: supplier.streetAddress, // corrected here
        zipCode: supplier.zipCode,
        gender: supplier.gender,
        age: supplier.age,
        category: supplier.category,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", status: "fail" });
  }
};

module.exports = { signUp, signIn };
