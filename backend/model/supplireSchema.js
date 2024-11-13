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
        enum: ['Kerala'], // Only allows "Kerala" as a value
    },
    district: {
        type: String,
        required: true,
        enum: [
            "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", 
            "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", 
            "Kozhikode", "Wayanad", "Kannur", "Kasargod"
        ]
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
        enum: ['male', 'female'],
    },
    age: {
        type: String,
        enum: ['18-25', '26-30', '31-35', '36-40'],
    },
    category: {
        type: String,
        required: true,
        enum: ['raw_materials', 'finished_goods', 'services'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
  
});

const supllireSchemaa = mongoose.model("supllireSchema", supllireSchema);
module.exports = supllireSchemaa;