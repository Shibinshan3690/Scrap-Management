const express = require("express");
const router = express.Router();
const AdminMessage = require("../model/adminMessageSchema");
const Notification = require("../model/notificationSchema");
const mongoose = require("mongoose");

// Reply to a specific notification
router.post("/notification/:notificationId/reply", async (req, res) => {
  const { notificationId } = req.params;
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ message: "Reply message cannot be empty" });
  }

  try {
    // Find the notification by ID
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Create a new admin message with the reply
    const adminMessage = new AdminMessage({
      message: message,
      adminId: req.adminId, // Assuming you have authentication middleware that sets adminId
      userId: notification.userId, // The user to whom the notification is related
      reply: {
        content: message,
        repliedAt: new Date(),
        repliedBy: req.adminId, // Admin replying to the message
      },
    });
    // Save the reply message to the database
    await adminMessage.save();

    // Optionally update the notification as 'replied'
    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: "Reply sent successfully" });
  } catch (error) {
    console.error("Error replying to notification:", error);
    res.status(500).json({ message: "Error replying to notification" });
  }
});

module.exports = router;
