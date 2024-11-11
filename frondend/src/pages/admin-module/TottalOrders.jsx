import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import adminApi from '../../api/adminInterceptor';
import { format } from 'date-fns';
import Adminsidebar from './AdminSidebar';


const TottalOrders = () => {
  const navigate = useNavigate();
  const [totalOrders, setTotalOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await adminApi.get(`/getAdminUserSellDeatils`);
        console.log(response,'res')
        setTotalOrders(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch customers");
      }
    };

    fetchTotalOrders();
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
    <>
    <div className="flex min-h-screen bg-gray-100 text-gray-800" >
   <div>
     <Adminsidebar unreadCount={unreadCount}/>
   </div>

      <div className="flex flex-col  ml-[275px] mt-[10px]">
    

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Table Container */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden   w-[1400px]">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer Name</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Phone Number</th>
                <th className="px-6 py-3">Pincode</th>
                <th className="px-6 py-3">Order Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {totalOrders.length > 0 ? (
                totalOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">{order?._id}</td>
                    <td className="px-6 py-4 text-gray-700">{order?.user?.name}</td>
                    <td className="px-6 py-4 text-gray-700">{order?.productName}</td>
                    <td className="px-6 py-4 text-gray-700">{order?.phoneNumber}</td>
                    <td className="px-6 py-4 text-gray-700">{order?.pincode}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {format(new Date(order.date), 'dd/MM/yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 inline-block font-semibold text-sm rounded-full ${
                          order.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/userOrderDetail/${order._id}`)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  );
};

export default TottalOrders;
