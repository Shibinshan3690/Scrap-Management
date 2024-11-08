import React, { useEffect, useState } from 'react'
import "./adminorders.css";
import { MdAccountCircle, MdDashboard, MdOutlinePeopleOutline, MdOutlineShoppingBag } from 'react-icons/md';
import { FaPeopleCarry } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import logo from '../../pics/scrap-logo.webp';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import axios from 'axios';
import Adminsidebar from './Adminsidebar';
import adminApi from '../../api/adminInterceptor';

// Registering chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Adminorder = () => {
    const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [value, setValue] = useState(new Date());
   const [orderlist,setAllOrderList]=useState([]);
   const [error,setError]=useState(null);
   const [orderdate,setorderDate]=useState("");
   const [todayOrders, setTodayOrders] = useState([]);




  useEffect(()=>{
  

        const fetchOrderList =async()=>{
            try {
                const response=await adminApi.get(`/getAdminUserSellDeatils`);
                setAllOrderList(response.data.data)
                
            } catch (error) {
              console.error(error);
              setError("Failed to fetch customers");
              
            }
        };
        const fetchTodayOrders = async () => {
          try {
            const response = await adminApi.get(`/getUserOrderCurrentDate`); // Adjust the endpoint as necessary
            setTodayOrders(response.data.data);
          } catch (error) {
            console.error("Failed to fetch today's orders", error);
            setError("Failed to fetch today's orders");
          }
        };

        fetchOrderList();
        fetchTodayOrders();
  },[])



  

  
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



  const pendingOrders = 15;
  






  
  return (
   <>
   
   
   <div className="main-container-order flex flex-col lg:flex-row " >
      {/* Sidebar */}
     
          <Adminsidebar/>

       







      {/* Right content */}
      <div className="content flex flex-col lg:flex-row gap-10 lg: w-full" id="rightContent"   >
      {/* Order Stats (Three Boxes) */}
      <div className="orderStatu" >
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 rounded-xl shadow-lg text-white text-center  h-40 w-40" onClick={()=>navigate("/tottalOrders")}>
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-4xl font-bold">{orderlist.length}</p>
        </div>
        <div className="bg-gradient-to-r from-teal-500 to-teal-400 p-6 rounded-xl shadow-lg text-white text-center ml-10  h-40 w-40"  >
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-4xl font-bold">{pendingOrders}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-400 p-6 rounded-xl shadow-lg text-white text-center ml-10  h-40 w-40" onClick={()=>navigate("/todayOrders")}>
          <h3 className="text-lg font-semibold">Today's Orders</h3>
          <p className="text-4xl font-bold">{todayOrders.length}</p>
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
    <button className="bg-yellow-400 text-white font-bold py-1 px-3 rounded hover:bg-yellow-500 transition duration-300 w-20 h-10" onClick={()=>navigate("/todayOrders")}>
      View 
    </button>
  </div>

  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="px-4 py-3 border-b text-gray-700 font-semibold">Name</th>
                  <th className="px-4 py-3 border-b text-gray-700 font-semibold">Item</th>
                  <th className="px-4 py-3 border-b text-gray-700 font-semibold">Number</th>
                  <th className="px-4 py-3 border-b text-gray-700 font-semibold">Pincode</th>
                </tr>
              </thead>
              <tbody>
                {todayOrders.length > 0 ? (
                  todayOrders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-600">{order.user.name}</td>
                      <td className="px-4 py-3 text-gray-600">{order.productName}</td>
                      <td className="px-4 py-3 text-gray-600">{order.phoneNumber}</td>
                      <td className="px-4 py-3 text-gray-600">{order.pincode}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No orders found for today.
                    </td>
                  </tr>
                )}
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
