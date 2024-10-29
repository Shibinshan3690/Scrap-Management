const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,  
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

const adminUser = mongoose.model("adminUser", adminSchema);
module.exports = adminUser;
