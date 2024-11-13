import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { AiOutlineCalendar, AiOutlinePhone, AiOutlineEnvironment, AiOutlineInfoCircle, AiOutlineDollarCircle } from 'react-icons/ai';
import { FaProductHunt, FaTruck } from 'react-icons/fa';
import adminApi from '../../api/adminInterceptor';
import axios from 'axios';

const UserGetById = () => {
  const { id } = useParams();
  const [userOrder, setUserOrder] = useState(null);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);

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

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  useEffect(() => {
    const getOrderById = async () => {
      try {
        const response = await adminApi.get(`/getOrderById/${id}`);
        setUserOrder(response.data.data);
      } catch (error) {
        console.error("Failed to fetch order details", error);
        setError("Failed to fetch order details");
      }
    };
    getOrderById();
  }, [id]);

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <AdminSidebar unreadCount={unreadCount} />
      <div className="flex flex-col bg-white ml-[275px] w-full p-6 mt-[15px] rounded-lg">
        <div className="flex flex-col gap-5    ">
          {userOrder ? (
            <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 space-y-4">
              {/* Order Details */}
              <OrderDetail icon={<FaProductHunt className="text-yellow-500" />} label="Product Name" value={userOrder.productName} />
              <OrderDetail icon={<FaTruck className="text-green-500" />} label="Vehicle" value={userOrder.vehical} />
              <OrderDetail icon={<AiOutlinePhone className="text-blue-500" />} label="Phone Number" value={userOrder.phoneNumber} />
              <OrderDetail icon={<AiOutlineEnvironment className="text-purple-500" />} label="Address" value={userOrder.adress} />
              <OrderDetail icon={<AiOutlineInfoCircle className="text-gray-500" />} label="Description" value={userOrder.description} />
              <OrderDetail icon={<AiOutlineEnvironment className="text-indigo-500" />} label="Pincode" value={userOrder.pincode} />
              <OrderDetail icon={<AiOutlineCalendar className="text-red-500" />} label="Order Date" value={new Date(userOrder.date).toLocaleDateString()} />
              <OrderDetail icon={<AiOutlineCalendar className="text-red-500" />} label="Delivery Date" value={userOrder.deliveryDate ? new Date(userOrder.deliveryDate).toLocaleDateString() : "N/A"} />
              <OrderDetail icon={<AiOutlineInfoCircle className="text-gray-500" />} label="Order Status" value={userOrder.status || "Pending"} />
              {/* Additional Details */}
              <OrderDetail icon={<AiOutlineDollarCircle className="text-green-500" />} label="Order Total" value={`$${userOrder.totalAmount || '0.00'}`} />
              <OrderDetail icon={<AiOutlineInfoCircle className="text-blue-500" />} label="Payment Status" value={userOrder.paymentStatus || "Unpaid"} />
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading order details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

// OrderDetail Component
const OrderDetail = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm transition transform hover:scale-105 duration-200 hover:bg-yellow-50">
    <div className="text-2xl">{icon}</div>
    <div className="flex flex-col">
      <span className="text-gray-500 font-semibold">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  </div>
);

export default UserGetById;
