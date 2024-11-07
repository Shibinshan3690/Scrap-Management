import React, { useState, useEffect } from 'react';
import Adminsidebar from '../admin-module/Adminsidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import adminApi from '../../api/adminInterceptor';

const TodayOrders = () => {
     const navigate=useNavigate();
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

  return (
    <div className="flex">
      <Adminsidebar />
      <div  style={{marginTop:"-350px",marginLeft:"200px",width:"1200px"}} >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Today's Orders</h2>
        
        {error && <div className="mb-4 text-red-500">{error}</div>} {/* Display error message if any */}
        
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">ID</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Customer Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Product Name</th>
           
              <th className="text-left py-3 px-4 font-semibold text-gray-600">PhoneNumber</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {todayOrders.length > 0 ? (
              todayOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50" onClick={()=>navigate(`/userOrderDetails/${order._id}`)}> {/* Use order._id if it's available */}
                  <td className="py-3 px-4 text-gray-700">{order._id}</td> {/* Display Order ID */}
                  <td className="py-3 px-4 text-gray-700">{order.user.name}</td> 
                  <td className="py-3 px-4 text-gray-700">{order.productName}</td> 
                  <td className="py-3 px-4 text-gray-700">{order.phoneNumber}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        order.status === 'Delivered'
                          ? 'bg-green-500'
                          : order.status === 'Pending'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-4 text-gray-700 text-center">No orders found for today.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayOrders;
