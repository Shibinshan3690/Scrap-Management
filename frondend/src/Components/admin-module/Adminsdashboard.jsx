import React, { useState,useEffect } from 'react';
import { MdDashboard, MdOutlinePeopleOutline, MdOutlineShoppingBag, MdSearch } from 'react-icons/md';
import { FaPeopleCarry } from 'react-icons/fa';
import AdminSidebar from './Adminsidebar';
import { Bar } from 'react-chartjs-2'; // Import Bar chart component
import Chart from 'chart.js/auto'; // Automatically register necessary components
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();


  const [customers,setCustomers]=useState([]);
  const [error,setError]=useState(null)
  
  useEffect(()=>{
    
    const fetchCustomer=async()=>{
        try {
          const response=await axios.get(`http://localhost:5000/admin/getAdminuserDeatils`);
          setCustomers(response.data.data)
        } catch (error) {
         console.error(error);
         setError("Failed to fetch customers");
         
        }
    };
    fetchCustomer();
},[])









  // Sample data for the Bar chart
  const data = {
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-80 p-6 bg-gray-100" style={{ marginTop: "10px", marginLeft: "-00px" }}>
        {/* Search Bar */}
        <div className="relative w-1/2 " id='admibCustomerinputBox' style={{marginLeft:"-0px"}}>
        
          <input
            type="text"
            placeholder="Search..."
            className="w-7/12 h-10 pl-10 pr-4 bg-white rounded-[20px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2" id='ic'>
          <MdSearch className="h-5 w-5 text-gray-400" />
          </div>
          <button className='butonSearch bg-yellow-400 text-white rounded-md px-3 py-1 ml-2 hover:bg-yellow-500 transition duration-300'>
            Search
          </button>
          </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 " style={{marginTop:"30px"}}>
          <div className="bg-white p-10 rounded-lg shadow-md flex items-center" onClick={()=>navigate("/adminCostomers")} >
            <MdDashboard className="h-6 w-6 text-blue-500" />
            <div className="ml-4">
      
              <h2 className="text-lg font-semibold">Total Users</h2>
              <p className="text-gray-600">{customers.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <MdOutlinePeopleOutline className="h-6 w-6 text-green-500" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Total Suplayers</h2>
              <p className="text-gray-600">12</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <MdOutlineShoppingBag className="h-6 w-6 text-red-500" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Total orders</h2>
              <p className="text-gray-600">300</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <FaPeopleCarry className="h-6 w-6 text-purple-500" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Today Orders</h2>
              <p className="text-gray-600">5</p>
            </div>
          </div>
        </div>

        {/* Bar Chart Component */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
