import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";

const NotificationUser = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notification/notifications");
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/notification/${id}/mark-as-read`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id ? { ...notification, isRead: true } : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Handle notification selection
  const handleSelectNotification = (notification) => {
    if (!notification.isRead) markAsRead(notification._id);
  };

  // Delete a specific notification
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notification/notifications/${id}`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Clear all notifications
  const clearAllNotifications = async () => {
    try {
      await axios.delete("http://localhost:5000/notification/notifications");
      setNotifications([]);
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  // Unread count for display in the Nav
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <>
      <div className="">
        <Nav unreadCount={unreadCount} />
      </div>

      <div className="min-h-screen bg-gray-100 pt-6 px-6">
        <div className="mx-auto bg-white rounded-lg shadow-md p-6">
          {/* Clear All Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={clearAllNotifications}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
            >
              Clear All
            </button>
          </div>

          {/* Loading spinner */}
          {loading ? (
            <p className="text-center text-gray-600">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-gray-600">No confirmed order notifications available.</p>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-4 rounded-md shadow-md flex items-start gap-4 mb-4 justify-between ${
                    notification.isRead ? "bg-gray-200" : "bg-gray-50"
                  }`}
                >
                  <div className="cursor-pointer" onClick={() => handleSelectNotification(notification)}>
                    <p className="text-gray-700">{notification.message}</p>
                    <span className="text-sm text-gray-500">
                      {/* Optional: Display additional info like time */}
                    </span>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteNotification(notification._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md shadow hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationUser;
