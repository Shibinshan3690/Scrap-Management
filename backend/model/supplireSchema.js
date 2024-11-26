const mongoose = require('mongoose');

const supllireSchema = new mongoose.Schema({
    name: {
        type: String,  
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    }
    ,
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        // enum: ['Kerala'], // Only allows "Kerala" as a value
    },
    district: {
        type: String,
        required: true,
        // enum: [
        //     "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", 
        //     "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", 
        //     "Kozhikode", "Wayanad", "Kannur", "Kasargod"
        // ]
    },
    streetAddress: {
        type: String,
        trim: true,
    },
    zipCode: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        // enum: ['male', 'female'],
        trim:true
    },
    age: {
        type: String,
      trim:true
    },
    category: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'inactive'],
        default: 'pending',
    },
    role: {
        type: String,
        enum: ['supplier'], // Currently only 'supplier' role
        default: 'supplier',
    },
    isBlocked: {
        type:Boolean,
        default:false
    }
  
});

const  supllireSchemaa = mongoose.model("supllireSchema", supllireSchema);
module.exports = supllireSchemaa;
