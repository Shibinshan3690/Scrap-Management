import React, { useState, useEffect } from 'react';
import { MdDashboard, MdOutlinePeopleOutline, MdOutlineShoppingBag, MdSearch } from 'react-icons/md';
import { FaPeopleCarry } from 'react-icons/fa';
import AdminSidebar from './Adminsidebar';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import adminApi from '../../api/adminInterceptor';
import axios from 'axios';
import susupplierApi from '../../api/suplyerinterceptor';
import { toast, ToastContainer } from 'react-toastify';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [todayOrder, setTodayOrders] = useState([]);
  const [error, setError] = useState(null);

   const [suppliers, setSuppliers] = useState([]);


  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await adminApi.get('/getAdminuserDeatils');
        setCustomers(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch customers");
      }
    };
    fetchCustomer();
  }, []);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await adminApi.get('/getAdminUserSellDeatils');
        setOrders(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTotalOrders();
  }, []);

  useEffect(() => {
    const todayOrders = async () => {
      try {
        const response = await adminApi.get('/getUserOrderCurrentDate');
        setTodayOrders(response.data.data);
      } catch (error) {
        console.error("Failed to fetch today's orders", error);
        setError("Failed to fetch today's orders");
      }
    };
    todayOrders();
  }, []);




  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await susupplierApi.get("/allSupplires");
        setSuppliers(response.data.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        toast.error("Failed to fetch suppliers. Please try again.");
      }
    };

    fetchSuppliers();
  }, []);
  // Data for charts
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [4000, 3000, 5000, 7000, 6000, 8000, 9000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue',
        data: [3000, 4000, 5500, 6500, 6200, 7000, 9500],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: ['Completed Orders', 'Pending Orders', 'Cancelled Orders'],
    datasets: [
      {
        label: 'Order Types',
        data: [55, 25, 20],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true },
    },
  };
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
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <ToastContainer/>
      <AdminSidebar unreadCount={unreadCount}  />
      <main className="flex-1 p-6 space-y-6" style={{marginLeft:"250px",marginTop:"-30px"}}>
      <h1 className="text-1xl font-bold text-gray-800 text-right mr-8 mt-6 tracking-tight" style={{float:"right",marginTop:"20px",marginRight:"90px"}}>Dashboard</h1>
        {/* Search Bar */}
        <div className="flex items-center mb-6 space-x-4">
          <div className="relative w-full lg:w-1/2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-300">
            Search
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div
            className="bg-white p-6 rounded-lg shadow-lg flex items-center cursor-pointer hover:bg-blue-50"
            onClick={() => navigate('/adminCostomers')}
          >
            <MdDashboard className="text-blue-500 h-8 w-8" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-gray-600">{customers.length}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center hover:bg-green-50">
            <MdOutlinePeopleOutline className="text-green-500 h-8 w-8" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Total Suppliers</h2>
              <p className="text-gray-600">{suppliers.length}</p>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg flex items-center cursor-pointer hover:bg-red-50"
            onClick={() => navigate('/tottalOrders')}
          >
            <MdOutlineShoppingBag className="text-red-500 h-8 w-8" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Total Orders</h2>
              <p className="text-gray-600">{orders.length}</p>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg flex items-center cursor-pointer hover:bg-purple-50"
            onClick={() => navigate('/todayOrders')}
          >
            <FaPeopleCarry className="text-purple-500 h-8 w-8" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Today’s Orders</h2>
              <p className="text-gray-600">{todayOrder?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Sales Overview</h2>
            <Bar data={barData} options={{ ...chartOptions, title: { text: 'Monthly Sales' } }} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Revenue Trend</h2>
            <Line data={lineData} options={{ ...chartOptions, title: { text: 'Revenue Growth' } }} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6  flex flex-col items-center w-[1400px] h-[600px]">
            <h2 className="text-2xl font-semibold mb-4">Order Distribution</h2>
            <Pie data={pieData} options={{ ...chartOptions, title: { text: 'Order Types' } }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
