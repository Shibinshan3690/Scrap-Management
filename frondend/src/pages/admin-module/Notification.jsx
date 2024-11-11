import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBell, FaCheckCircle } from 'react-icons/fa';
import Adminsidebar from './AdminSidebar';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notification/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  // Function to mark a notification as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/notification/${id}/mark-as-read`);
      // Update state after marking notification as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id ? { ...notification, isRead: true } : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Total unread notification count
  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Adminsidebar unreadCount={unreadCount} />

      <div className="bg-[#E6F0EF] rounded-3xl mx-auto p-10 w-[1200px] h-[700px] ml-[280px] mt-3 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaBell className="text-blue-500" />
          Notifications
        </h2>

        <div className="overflow-y-auto h-5/6">
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification?._id}
                className={`flex justify-between items-center p-4 border-l-4 rounded-lg shadow-sm transition duration-300 ${
                  notification.isRead ? 'border-gray-300 bg-white' : 'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Notification Icon */}
                  {notification.isRead ? (
                    <FaCheckCircle className="text-green-500 text-lg" />
                  ) : (
                    <FaBell className="text-blue-500 text-lg animate-pulse" />
                  )}

                  <div>
                    {/* Notification Message */}
                    <p className="text-gray-800 font-medium">
                      {notification?.message}
                    </p>
                    {/* Additional Details */}
                    <span className="text-sm text-gray-500">
                      {new Date(notification?.createdAt).toLocaleString()}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Type: {notification?.type || 'General'}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                {!notification.isRead && (
                  <button
                    className="text-blue-500 text-sm hover:text-blue-700 transition"
                    onClick={() => markAsRead(notification._id)}
                  >
                    Mark as Read
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Notification;
