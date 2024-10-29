import React, { useState, useEffect } from 'react';
import Adminsidebar from '../admin-module/Adminsidebar';

const TodayOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'John Doe', item: 'Laptop', quantity: 1, status: 'Delivered' },
    { id: 2, customerName: 'Jane Smith', item: 'Phone', quantity: 2, status: 'Pending' },
    { id: 3, customerName: 'Mark Wilson', item: 'Tablet', quantity: 1, status: 'Shipped' },
  ]);

  useEffect(() => {
    // Fetch orders from API if needed
    // fetch('/api/orders/today')
    //   .then(response => response.json())
    //   .then(data => setOrders(data));
  }, []);

  return (
    <div className="flex">
      <Adminsidebar />
      <div className="ml-64 p-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Today's Orders</h2>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">ID</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Customer Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Item</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Quantity</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">{order.id}</td>
                <td className="py-3 px-4 text-gray-700">{order.customerName}</td>
                <td className="py-3 px-4 text-gray-700">{order.item}</td>
                <td className="py-3 px-4 text-gray-700">{order.quantity}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayOrders;
