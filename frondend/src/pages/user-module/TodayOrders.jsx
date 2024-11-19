import React, { useState, useEffect } from 'react';
import Adminsidebar from '../admin-module/Adminsidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import adminApi from '../../api/adminInterceptor';

const TodayOrders = () => {
  const navigate = useNavigate();
  const [todayOrders, setTodayOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayOrders = async () => {
      try {
        const response = await adminApi.get('/getUserOrderCurrentDate');
        setTodayOrders(response.data.data);
      } catch (error) {
        console.error("Failed to fetch today's orders", error);
        setError("Failed to fetch today's orders");
      }
    };
    fetchTodayOrders();
  }, []);


  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notification/notifications');
        setNotifications(response.data);
        console.log("response", response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  // total unread notification count
  const unreadCount = notifications.filter(notification => !notification.isRead).length;


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Adminsidebar unreadCount={unreadCount}/>
      <div className="flex flex-col bg-white ml-[275px] w-[1400px] h-[710px] mt-[15px] rounded-lg">
      <div className="flex flex-col p-6 ml-[2px]">
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Today's Orders</h2>
          <p className="text-gray-500">View all orders placed today with their details.</p>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="bg-white shadow-lg rounded-lg p-6">
          <table className="w-full table-auto text-gray-700">
            <thead>
              <tr className="bg-gray-200 text-left">
               
                <th className="py-4 px-6 font-medium">Customer Name</th>
                <th className="py-4 px-6 font-medium">Product Name</th>
                <th className="py-4 px-6 font-medium">Phone Number</th>
                <th className="py-4 px-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {todayOrders.length > 0 ? (
                todayOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => navigate(`/userOrderDetails/${order._id}`)}>
                    
                    <td className="py-4 px-6">{order?.user?.name || "N/A"}</td>
                    <td className="py-4 px-6">{order?.productName || "N/A"}</td>
                    <td className="py-4 px-6">{order?.phoneNumber || "N/A"}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-600">No orders found for today.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TodayOrders;
