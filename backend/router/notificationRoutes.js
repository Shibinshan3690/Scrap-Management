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

  // / Route to mark a notification as read
  notificationRoutes.patch('/:id/mark-as-read', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the notification by ID and update its isRead status to true
      const updatedNotification = await Notification.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true } // Returns the updated document
      );
  
      if (!updatedNotification) {
        return res.status(404).json({ success: false, message: 'Notification not found' });
      }
  
      res.status(200).json({
        success: true,
        message: 'Notification marked as read successfully',
        data: updatedNotification,
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while marking the notification as read",
        error: error.message,
      });
    }
  });

      
  //  confirm  order  notfacation get 

  notificationRoutes.get('/notifications/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Fetch unread notifications for the user
      const notifications = await Notification.find({ userId, read: false })
        .sort({ createdAt: -1 }) // Sort by most recent
        .limit(10);
  
      res.status(200).json({ notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Error fetching notifications', error });
    }
  });


  notificationRoutes.get('/notificationss/:userId', async (req, res) => {
    try {
      const { userId } = req.params;

  
      
      const notifications = await Notification.find({ user: userId, supplier: supplier, isRead: false })
       console.log(notifications,"notifications")
        .sort({ createdAt: -1 }) 
        .limit(10);
  
      res.status(200).json({ notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Error fetching notifications', error });
    }
  });
  



  
  module.exports = notificationRoutes;
