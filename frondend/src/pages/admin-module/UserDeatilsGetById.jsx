import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useParams } from 'react-router-dom';
import adminApi from '../../api/adminInterceptor';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaClipboardList, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

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

  return (
    <>
      <AdminSidebar />
      <div className="p-10 bg-gray-100  h-[744px]" >
        {/* User Information Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg  max-w-8xl mb-4 ml-[240px] mt-[-18px] transform transition duration-300 hover:scale-105   ">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
            <FaUser className="mr-2 text-blue-500" /> User Details
          </h2>
          {userDetails ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Name:</strong> {userDetails?.user?.name}</p>
              <p><strong>Email:</strong> {userDetails?.user?.email}</p>
              <p><strong>Account Created:</strong> {new Date(userDetails?.user?.createdAt).toLocaleDateString()}</p>
            </div>
          ) : (
            <p className="text-gray-700">Loading user details...</p>
          )}
          <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105">
            Edit User
          </button>
        </div>

        {/* Order Details Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg   overflow-y-auto ml-[240px] w-[1400px]"  style={{ maxHeight: '460px'}}>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <FaClipboardList className="mr-2 text-green-500" /> Order Details
          </h3>
          {loading ? (
            <p className="text-center text-gray-500">Loading order details...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : userOrders.length > 0 ? (
            <div>
              {userOrders.map((order, index) => (
                <div key={index} className="mb-6 p-5 bg-gray-50 rounded-lg border border-gray-200 shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105">
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
                      <span className={`ml-2 px-2 py-1 rounded-full text-white ${
                        order.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                        {order.status || 'Pending'}
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
    </>
  );
};

export default UserDetailsGetById;
