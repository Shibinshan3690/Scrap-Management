import React, { useState } from 'react';
import Adminsidebar from './Adminsidebar';

const UserDetailsGetById = () => {
  const [orders] = useState([
    { id: '#123456', date: '2024-11-04', amount: '$120.00', status: 'Completed' },
    { id: '#789012', date: '2024-10-29', amount: '$75.00', status: 'Pending' },
  ]);

  return (
    <>
      <Adminsidebar />
      <div className="p-8  bg-gray-100 min-h-screen" >
        {/* User Information Card */}
        <div className="bg-white p-16 rounded-lg shadow-lg mb-6 max-w-lg mx-auto space-x-6 space-y-10" style={{marginLeft:"1px",height:"500px",marginTop:"120px"}}>
          <h2 className="text-2xl font-semibold text-gray-800 " style={{marginLeft:"-200px"}}>User Details</h2>
          <p className="text-gray-700"><strong>Name:</strong> John Doe</p>
          <p className="text-gray-700"><strong>Email:</strong> john.doe@example.com</p>
          <p className="text-gray-700"><strong>Status:</strong> <span className="font-semibold text-green-500">Active</span></p>
          <p className="text-gray-700"><strong>Phone:</strong> +1234567890</p>
          <p className="text-gray-700"><strong>Address:</strong> 123 Main St, Anytown, USA</p>
            <button className='p-2 w-20 '>Edit</button>
        </div>

        {/* Order Details Cards */}
        <div className="max-w-4xl mx-auto" style={{marginLeft:"600px",marginTop:"-400px"}}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-semibold text-gray-800 mb-2">Order ID: {order.id}</p>
                <p className="text-gray-700"><strong>Date:</strong> {order.date}</p>
                <p className="text-gray-700"><strong>Total Amount:</strong> {order.amount}</p>
                <p className="text-gray-700"><strong>Status:</strong> 
                  <span className={`px-2 py-1 rounded ${order.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'} ml-2`}>
                    {order.status}
                  </span>
                </p>
                <div className="mt-4">
                  <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsGetById;
