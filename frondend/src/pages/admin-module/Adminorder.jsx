// import React, { useEffect, useState } from 'react';
// import './adminorders.css';
// import {
//   MdAccountCircle,
//   MdDashboard,
//   MdOutlinePeopleOutline,
//   MdOutlineShoppingBag
// } from 'react-icons/md';
// import { FaPeopleCarry } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import adminApi from '../../api/adminInterceptor';
// import Adminsidebar from './Adminsidebar';

// // Registering chart components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const Adminorder = () => {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [value, setValue] = useState(new Date());
//   const [orderlist, setAllOrderList] = useState([]);
//   const [error, setError] = useState(null);
//   const [todayOrders, setTodayOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrderList = async () => {
//       try {
//         const response = await adminApi.get(`/getAdminUserSellDeatils`);
//         setAllOrderList(response.data.data);
//       } catch (error) {
//         console.error(error);
//         setError("Failed to fetch customers");
//       }
//     };

//     const fetchTodayOrders = async () => {
//       try {
//         const response = await adminApi.get(`/getUserOrderCurrentDate`);
//         setTodayOrders(response.data.data);
//         console.log("respon ",response)
//       } catch (error) {
//         console.error("Failed to fetch today's orders", error);
//         setError("Failed to fetch today's orders");
//       }
//     };

//     fetchOrderList();
//     fetchTodayOrders();
//   }, []);

//   const orderChartData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'Monthly Orders',
//         data: [30, 45, 25, 60, 40, 70],
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderWidth: 2,
//       },
//     ],
//   };

//   const orderChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Monthly Order Statistics' },
//     },
//   };

//   const pendingOrders = 15;

//   return (
//     <div className="main-container-order flex flex-col lg:flex-row bg-gray-100 min-h-screen">
//       {/* Sidebar */}
//       <Adminsidebar />

//       {/* Main Content */}
//       <div className="content flex flex-col lg:flex-row gap-10 w-full p-5 lg:p-10">
//         {/* Order Stats (Three Boxes) */}
//         <div className="orderStatus flex gap-5">
//           {[
//             { label: "Total Orders", count: orderlist.length, color: "from-orange-500 to-orange-400", route: "/tottalOrders" },
//             { label: "Pending Orders", count: pendingOrders, color: "from-teal-500 to-teal-400" },
//             { label: "Today's Orders", count: todayOrders.length, color: "from-purple-500 to-purple-400", route: "/todayOrders" }
//           ].map((stat, index) => (
//             <div
//               key={index}
//               className={`p-6 rounded-xl shadow-lg text-white text-center h-40 w-40 bg-gradient-to-r ${stat.color} cursor-pointer transform transition duration-300 hover:scale-105`}
//               onClick={() => stat.route && navigate(stat.route)}
//             >
//               <h3 className="text-lg font-semibold">{stat.label}</h3>
//               <p className="text-4xl font-bold">{stat.count}</p>
//             </div>
//           ))}
//         </div>

//         {/* Order Chart */}
//         <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg transition duration-500 transform hover:scale-105" id="orderchart">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders Overview</h2>
//           <div className="bg-white p-5 rounded-lg shadow-lg">
//             <Line data={orderChartData} options={orderChartOptions} />
//           </div>
//         </div>

//         {/* Order Details & Calendar */}
//         <div className="flex flex-col gap-6 w-full lg:w-1/2">
//           <div className="w-full bg-white p-6 rounded-lg shadow-lg transition duration-500 transform hover:scale-105">
//             {/* Flex container for title and button */}
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold text-gray-900">Recent Order Details</h3>
//               <button
//                 className="bg-yellow-400 text-white font-bold py-1 px-3 rounded hover:bg-yellow-500 transition duration-300 w-20 h-10"
//                 onClick={() => navigate("/todayOrders")}
//               >
//                 View
//               </button>
//             </div>
//             <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//               <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//                 <thead>
//                   <tr>
//                     <th className="px-4 py-3 border-b text-gray-700 font-semibold">Name</th>
//                     <th className="px-4 py-3 border-b text-gray-700 font-semibold">Item</th>
//                     <th className="px-4 py-3 border-b text-gray-700 font-semibold">Number</th>
//                     <th className="px-4 py-3 border-b text-gray-700 font-semibold">Pincode</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {todayOrders.length > 0 ? (
//                     todayOrders.map((order) => (
//                       <tr key={order._id} className="border-b hover:bg-gray-50">
//                         <td className="px-4 py-3 text-gray-600"></td>
//                         <td className="px-4 py-3 text-gray-600">{order.productName}</td>
//                         <td className="px-4 py-3 text-gray-600">{order.phoneNumber}</td>
//                         <td className="px-4 py-3 text-gray-600">{order.pincode}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="text-center py-4 text-gray-500">No orders found for today.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Calendar Section */}
//           <div className="w-full bg-white p-6 rounded-lg shadow-lg transition duration-500 transform hover:scale-105" id="calendar">
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Date for Orders</h3>
//             <Calendar onChange={setValue} value={value} className="rounded-lg shadow-lg" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Adminorder;