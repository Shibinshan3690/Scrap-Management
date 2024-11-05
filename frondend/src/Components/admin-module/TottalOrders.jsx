import React, { useEffect, useState } from 'react';
import Adminsidebar from './Adminsidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TottalOrders = () => {
  const navigate=useNavigate("")
  const [tottalOrders, setTottalOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/getAdminUserSellDeatils`);
        setTottalOrders(response.data.data);
        // console.log(response, "all orders");
      } catch (error) {
        console.error(error);
        setError("Failed to fetch customers");
      }
    };

    fetchTotalOrders();
  }, []);

  return (
    <>
      <div>
        <Adminsidebar />
      </div>

      <div style={{ marginTop: "-150px", marginLeft: "200px", width: "1200px" }}>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Total Orders</h2>

        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">ID</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Customer Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Product Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Phone Number</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">pincode</th>
            </tr>
          </thead>
          <tbody  >
            {tottalOrders.length > 0 ? (
              tottalOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50"  onClick={()=>navigate(`/userOrderDetail/${order._id}`)}>
                  <td className="py-3 px-4 text-gray-700">{order._id}</td> {/* Display Order ID */}
                  <td className="py-3 px-4 text-gray-700">{order.user.name}</td> {/* Replace with actual field */}
                  <td className="py-3 px-4 text-gray-700">{order.productName}</td>
                  <td className="py-3 px-4 text-gray-700">{order.phoneNumber}</td>
                  <td className="py-3 px-4 text-gray-700">{order.pincode}</td>
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
    </>
  );
};

export default TottalOrders;
