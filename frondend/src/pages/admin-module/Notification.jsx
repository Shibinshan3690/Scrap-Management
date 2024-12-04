import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBell, FaCheckCircle } from 'react-icons/fa';
import Adminsidebar from './AdminSidebar';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

 
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notification/notifications');
          console.log(response,'response')
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

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

  
  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <div className="flex  min-h-screen bg-yellow-400">
      <Adminsidebar unreadCount={unreadCount} />
      <main className="flex-1 "style={{marginTop:"14px"}}>

         <div className="bg-white h-[715px] w-[1420px] shadow-md p-6 ml-[270px]  rounded-3xl">
        <h2 className="text-3xl font-bold text-yellow-800 mb-6 flex items-center gap-2">
          <FaBell className="text-yellow-500" />
          Notifications
        </h2>

        <div className="overflow-y-auto h-5/6">
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification?._id}
                className={`flex justify-between items-center p-4 border-l-4 rounded-lg shadow-sm transition duration-300 ${
                  notification.isRead ? 'border-gray-300 bg-yellow-100' : 'border-blue-500 bg-yellow-300'
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
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
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
      </main>
    </div>
  );
}

export default Notification;
