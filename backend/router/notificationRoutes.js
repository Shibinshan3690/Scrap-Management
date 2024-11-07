const express = require('express');
const notificationRoutes = express.Router();
const Notification=require("../model/notificationSchema");


notificationRoutes.get('/notifications', async (req, res) => {
    try {
      const notifications = await Notification.find({}).sort({ createdAt: -1 }); // Get all notifications, sorted by most recent
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  module.exports = notificationRoutes;
