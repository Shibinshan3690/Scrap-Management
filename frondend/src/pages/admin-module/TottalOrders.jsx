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
        setTotalOrders(response.data.data.reverse());
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
    <div  className="flex  min-h-screen bg-yellow-400" >
     <Adminsidebar unreadCount={unreadCount}/>
     <main className="flex-1 "style={{marginTop:"14px"}}>

      <div className="bg-white h-[715px] w-[1420px] shadow-md p-6 ml-[270px] overflow-y-scroll rounded-3xl">
    

    
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Table Container */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden   w-[1350px]">
          <table className="min-w-full leading-normal">
            <thead >
              <tr className="bg-yellow-300 text-gray-600 uppercase text-sm font-semibold">
                
                <th >Customer Name</th>
                <th >Product Name</th>
                <th >Phone Number</th>
                <th>Pincode</th>
                <th >PicUp Date</th>
                <th >Status</th>
                <th className=" py-4 ">Actions</th>
              </tr>
            </thead>
            <tbody  >
              {totalOrders.length > 0 ? (
                totalOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 text-gray-600 uppercase text-sm font-semibold">
                  
                    <td className="px-6 py-4 text-gray-700">{order?.user?.name}</td>
                    <td className="px-6 py-4 text-gray-700">{order?.productName}</td>
                    <td className="px-6 py-4 text-gray-700">{order?.phoneNumber}</td>
                    <td className="px-6 py-4 text-gray-700">{order?.pincode}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {format(new Date(order.date), 'dd/MM/yyyy')}
                    </td>
                    <td className="">
                      <span
                        className={`px-3 py-1 inline-block font-semibold text-sm rounded-full  ${
                          order.status === 'compleated'
              ? 'bg-green-500 text-green-100'
              : order.status === 'confirm'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-red-100 text-red-600'
          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td >
                      <button
                        onClick={() => navigate(`/userOrderDetails/${order._id}`)}
                       className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
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
      </main>
      </div>
    </>
  );
};

export default TottalOrders;
