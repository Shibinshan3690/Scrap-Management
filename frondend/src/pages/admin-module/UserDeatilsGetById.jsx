import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useParams } from 'react-router-dom';
import adminApi from '../../api/adminInterceptor';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaClipboardList, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';

const UserDetailsGetById = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrderById = async () => {
      try {
        const response = await adminApi.get(`/getIdUserDeatilAndUserOrder/${id}`);
        setUserDetails(response.data.data.userOrders[0]);
        setUserOrders(response.data.data.userOrders);
      } catch (error) {
        console.error("Failed to fetch order details", error);
        setError("Failed to fetch order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getOrderById();
  }, [id]);

  const [notifications, setNotifications] = useState([]);
   useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notification/notifications');
        setNotifications(response.data.reverse());
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
     <div className="flex  min-h-screen bg-yellow-400">
      <AdminSidebar unreadCount={unreadCount}/>
      <main className="flex-1 "style={{marginTop:"14px"}}>
        {/* User Information Card */}
   <div className="bg-white h-[715px] w-[1420px] shadow-md p-6 ml-[270px]  rounded-3xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <FaUser className="mr-2 text-yellow-600" /> User Details
          </h2>
          {userDetails ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p className='font-bold'><strong>Name:</strong> {userDetails?.user?.name}</p>
              <p className='font-bold'><strong >Email:</strong> {userDetails?.user?.email}</p>
              <p className='font-bold'><strong>Account Created:</strong> {new Date(userDetails?.user?.createdAt).toLocaleDateString()}</p>
            </div>
          ) : (
            <p className="text-gray-700">Loading user details...</p>
          )}
          <button className="mt-4 px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105">
            Edit User
          </button>
       

        {/* Order Details Section */}
        <div className="bg-white p-10 rounded-lg shadow-lg  mt-4  h-[500px] overflow-y-auto w-[1370px]">
          <h3 className="text-1xl font-bold text-gray-800 mb-6 flex items-center">
            <FaClipboardList className="mr-2  text-green-500" /> Order Details
          </h3>
          {loading ? (
            <p className="text-center text-gray-500">Loading order details...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : userOrders.length > 0 ? (
            <div>
              {userOrders.map((order, index) => (
                <div key={index} className="mb-6 p-5 bg-yellow-100 rounded-lg border border-gray-200 shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Order #{index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center">
                      <span className="font-semibold text-gray-700">Product:</span>
                      <span className="ml-2 text-gray-900">{order.productName}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="font-semibold text-gray-700">Vehicle:</span>
                      <span className="ml-2 text-gray-900">{order.vehical}</span>
                    </p>
                    <p className="flex items-center">
                      <FaPhone className="mr-1 text-gray-600" />
                      <span className="font-semibold text-gray-700">Phone:</span>
                      <span className="ml-2 text-gray-900">{order.phoneNumber}</span>
                    </p>
                    <p className="flex items-center">
                      <FaHome className="mr-1 text-gray-600" />
                      <span className="font-semibold text-gray-700">Address:</span>
                      <span className="ml-2 text-gray-900">{order.adress}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="font-semibold text-gray-700">Description:</span>
                      <span className="ml-2 text-gray-900">{order.description}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="font-semibold text-gray-700">Pincode:</span>
                      <span className="ml-2 text-gray-900">{order.pincode}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="font-semibold text-gray-700">Order Date:</span>
                      <span className="ml-2 text-gray-900">{new Date(order.date).toLocaleDateString()}</span>
                    </p>
                    <p className="flex items-center">
  <span className="font-semibold text-gray-700">Status:</span>
  <span
    className={`ml-2 px-2 py-1 rounded-full text-white ${
      order.status === 'compleated'
        ? 'bg-green-500' // Green for completed
        : order.status === 'pending'
        ? 'bg-yellow-500' // Yellow for pending
        : order.status === 'confirm'
        ? 'bg-blue-500' // Blue for confirmed
        : 'bg-gray-400' // Default for unknown status
    }`}
  >
    {order.status}
  </span>
</p>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No orders found for this user.</p>
          )}
        </div>
        </div>
        </main>
      </div>
     
    </>
  );
};

export default UserDetailsGetById;
