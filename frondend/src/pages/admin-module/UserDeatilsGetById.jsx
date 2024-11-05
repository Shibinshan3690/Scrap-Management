import React, { useEffect, useState } from 'react';
import Adminsidebar from './Adminsidebar';
import { useParams } from 'react-router-dom';
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
        const response = await axios.get(`http://localhost:5000/admin/getIdUserDeatilAndUserOrder/${id}`);
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
      <Adminsidebar />
      <div className="p-8 bg-gray-100 h-screen flex flex-col items-center overflow-hidden">
        {/* User Information Card */}
        <div className="bg-white p-10 rounded-lg shadow-lg w-full mb-6" style={{ width: "1000px" ,marginTop:"20px" }}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Details</h2>
          {userDetails ? (
            <>
              <p className="text-gray-700"><strong>Name:</strong> {userDetails?.user?.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {userDetails?.user?.email}</p>
            </>
          ) : (
            <p className="text-gray-700">Loading user details...</p>
          )}
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Edit</button>
        </div>

        {/* Order Details Section */}
        <div className="bg-white rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 p-8"  style={{width:"1000px"}}>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h3>
          {loading ? (
            <p className="text-center text-gray-500">Loading order details...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : userOrders.length > 0 ? (
            <div className="overflow-y-auto max-h-96">
              {userOrders.map((order, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Product Name:</span>
                    <span className="text-gray-900">{order.productName}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-gray-700">Vehicle:</span>
                    <span className="text-gray-900">{order.vehical}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-gray-700">Phone Number:</span>
                    <span className="text-gray-900">{order.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-gray-700">Address:</span>
                    <span className="text-gray-900">{order.adress}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-gray-700">Description:</span>
                    <span className="text-gray-900">{order.description}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-gray-700">Pincode:</span>
                    <span className="text-gray-900">{order.pincode}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-gray-700">Date:</span>
                    <span className="text-gray-900">{new Date(order.date).toLocaleDateString()}</span>
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
