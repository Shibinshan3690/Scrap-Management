import React, { useState } from 'react'
import "./adminorders.css";
import { MdAccountCircle, MdDashboard, MdOutlinePeopleOutline, MdOutlineShoppingBag } from 'react-icons/md';
import { FaPeopleCarry } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import logo from '../../pics/scrap-logo.webp';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

// Registering chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Adminorder = () => {
    const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [value, setValue] = useState(new Date());

  
  const orderChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Orders',
        data: [30, 45, 25, 60, 40, 70],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const orderChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Order Statistics' },
    },
  };


  const totalOrders = 120;
  const pendingOrders = 15;
  const todayOrders = 8;






  
  return (
   <>
   
   
   <div className="main-container-order flex flex-col lg:flex-row " >
      {/* Sidebar */}
      <div
        className={`sidebar bg-white h-screen w-64 p-5 rounded-2xl shadow-lg lg:fixed lg:top-10 lg:left-10 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full' 
        } lg:translate-x-0`} id="maain"
      >
        <div>
          {/* Header */}
          <div className="flex items-center mb-10">
            <img src="" alt="logo" className="h-12 w-12 rounded-full lg:h-16 lg:w-16" />
            <span className="ml-4 text-xl font-bold text-gray-800 hidden lg:block">Scrap</span>
          </div>

          {/* List of options */}
          <div className="space-y-4">
            <div className="flex items-center p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300" onClick={() => navigate('/adminDashboard')}>
              <MdDashboard className="h-6 w-6 lg:mr-3" />
              <span className="hidden lg:inline">Dashboard</span>
            </div>

            <div className="flex items-center p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300" onClick={() => navigate('/adminCostomers')}>
              <MdOutlinePeopleOutline className="h-6 w-6 lg:mr-3" />
              <span className="hidden lg:inline">Customers</span>
            </div>

            <div className="flex items-center p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300" onClick={() => navigate('/adminSupplire')}>
              <FaPeopleCarry className="h-6 w-6 lg:mr-3" />
              <span className="hidden lg:inline">Suppliers</span>
            </div>

            <div className="flex items-center p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300" onClick={() => navigate('/adminOrders')}>
              <MdOutlineShoppingBag className="h-6 w-6 lg:mr-3" />
              <span className="hidden lg:inline">Orders</span>
            </div>

            <div className="flex items-center p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300" onClick={()=>navigate("/adminAccount")}>
              <MdAccountCircle className="h-6 w-6 lg:mr-3" />
              <span className="hidden lg:inline">Accounts</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button className="bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300" id="log">Logout</button>
      </div>








      {/* Right content */}
      <div className="content flex flex-col lg:flex-row gap-10 lg: w-full"  id="rightContent" >
      {/* Order Stats (Three Boxes) */}
      <div className="orderStatu" onClick={()=>navigate("/todayOrders")}>
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 rounded-xl shadow-lg text-white text-center  h-40 w-40">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-4xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-gradient-to-r from-teal-500 to-teal-400 p-6 rounded-xl shadow-lg text-white text-center ml-10  h-40 w-40"  >
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-4xl font-bold">{pendingOrders}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-400 p-6 rounded-xl shadow-lg text-white text-center ml-10  h-40 w-40">
          <h3 className="text-lg font-semibold">Today's Orders</h3>
          <p className="text-4xl font-bold">{todayOrders}</p>
        </div>
      </div>
  







        {/* Order Stats & Chart */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg" id='orderchart'>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders Overview</h2>

          {/* Order Stats (Cards) */}
        

          {/* Order Chart */}
          <div className="bg-white p-5 rounded-lg shadow-lg " >
            <Line data={orderChartData} options={orderChartOptions} />
          </div>
        </div>

        {/* Order Details */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
  {/* Flex container for title and button */}
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-semibold text-gray-900">Recent Order Details</h3>
    <button className="bg-yellow-400 text-white font-bold py-1 px-3 rounded hover:bg-yellow-500 transition duration-300 w-20 h-10">
      View 
    </button>
  </div>

  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
    <thead>
      <tr>
        <th className="px-4 py-3 border-b text-gray-700 font-semibold">Order ID</th>
        <th className="px-4 py-3 border-b text-gray-700 font-semibold">Customer</th>
        <th className="px-4 py-3 border-b text-gray-700 font-semibold">Status</th>
        <th className="px-4 py-3 border-b text-gray-700 font-semibold">Total</th>
      </tr>
    </thead>
    <tbody>
      {/* Sample data */}
      <tr>
        <td className="px-4 py-3 border-b text-gray-600">001</td>
        <td className="px-4 py-3 border-b text-gray-600">John Doe</td>
        <td className="px-4 py-3 border-b text-orange-500 font-semibold">Pending</td>
        <td className="px-4 py-3 border-b text-gray-600">$120</td>
      </tr>
      <tr>
        <td className="px-4 py-3 border-b text-gray-600">002</td>
        <td className="px-4 py-3 border-b text-gray-600">Jane Smith</td>
        <td className="px-4 py-3 border-b text-green-500 font-semibold">Completed</td>
        <td className="px-4 py-3 border-b text-gray-600">$250</td>
      </tr>
      <tr>
        <td className="px-4 py-3 border-b text-gray-600">003</td>
        <td className="px-4 py-3 border-b text-gray-600">Alice Johnson</td>
        <td className="px-4 py-3 border-b text-green-500 font-semibold">Completed</td>
        <td className="px-4 py-3 border-b text-gray-600">$300</td>
      </tr>
      <tr>
        <td className="px-4 py-3 border-b text-gray-600">004</td>
        <td className="px-4 py-3 border-b text-gray-600">Mark Brown</td>
        <td className="px-4 py-3 border-b text-orange-500 font-semibold">Pending</td>
        <td className="px-4 py-3 border-b text-gray-600">$150</td>
      </tr>
      {/* Add more rows as needed */}
    </tbody>
  </table>

  <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg" id='calender'>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Date for Orders</h3>
    <Calendar
      onChange={setValue}
      value={value}
      className="rounded-lg shadow-lg"
    />
  </div>
</div>

        
      </div>
    </div>
   
   
   </>
  )
}

export default Adminorder
