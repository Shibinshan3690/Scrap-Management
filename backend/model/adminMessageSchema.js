const mongoose = require('mongoose');

const adminMessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reply: {
    content: { type: String },
    repliedAt: { type: Date },
    repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  createdAt: { type: Date, default: Date.now },
});

const AdminMessage = mongoose.model('AdminMessage', adminMessageSchema);
module.exports = AdminMessage;
