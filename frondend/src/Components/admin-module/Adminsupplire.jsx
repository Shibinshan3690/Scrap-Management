import React, { useState } from 'react'
import "./adminsupplire.css";


import { MdAccountCircle, MdDashboard, MdOutlinePeopleOutline, MdOutlineShoppingBag } from 'react-icons/md';
import { FaPeopleCarry } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
// import logo from '../../pics/scrap-logo.webp';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Adminsupplire = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
  
    // Sample data for the supplier chart
    const supplierChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Number of Suppliers',
          data: [12, 19, 8, 15, 25, 18],
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderWidth: 2,
        },
      ],
    };
  
    const supplierChartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Monthly Supplier Statistics' },
      },
    };
  
    // Sample supplier details (table)
    const suppliers = [
      { id: 1, name: 'Supplier 1', contact: 'supplier1@example.com', status: 'Active' },
      { id: 2, name: 'Supplier 2', contact: 'supplier2@example.com', status: 'Inactive' },
      { id: 3, name: 'Supplier 3', contact: 'supplier3@example.com', status: 'Active' },
    ];
  
    const totalSuppliers = suppliers.length;
    const activeSuppliers = suppliers.filter(supplier => supplier.status === 'Active').length;
    const inactiveSuppliers = totalSuppliers - activeSuppliers;
  
    // Handle Edit click
    const handleEdit = (id) => {
      // Handle edit functionality (e.g., navigate to edit page)
      console.log(`Edit Supplier ID: ${id}`);
    };
  
    // Handle Message click
    const handleMessage = (id) => {
      // Handle sending a message or navigating to a messaging system
      console.log(`Message Supplier ID: ${id}`);
    };
  
  return (
<>






<div className="main-container-supply flex flex-col lg:flex-row p-10" id='mainn'>
      {/* Sidebar */}
      <div className="sidebar bg-white w-64 p-5 rounded-2xl shadow-lg lg:fixed lg:top-10 lg:left-10" id='side'>
        <div>
          <div className="flex items-center mb-10">
            <img src="" alt="logo" className="h-12 w-12 rounded-full lg:h-16 lg:w-16" />
            <span className="ml-4 text-xl font-bold text-gray-800 hidden lg:block">Scrap</span>
          </div>

          <div className="space-y-4">
            <div
              className="flex flex-col items-center lg:flex-row p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300"
              onClick={() => navigate('/adminDashboard')}
            >
              <MdDashboard className="h-6 w-6 lg:mr-3" />
              <span className="hidden lg:inline">Dashboard</span>
            </div>

            <div
              className="flex flex-col items-center lg:flex-row p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300"
              onClick={() => navigate('/adminCostomers')}
            >
              <MdOutlinePeopleOutline className="h-6 w-6 lg:mr-3" />
              <span className="hidden lg:inline">Customers</span>
            </div>

            <div
              className="flex flex-col items-center lg:flex-row p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300"
              onClick={() => navigate('/adminSupplire')}
            >
              <FaPeopleCarry className="h-6 w-6 lg:mr-3" />
              <span className="hidden lg:inline">Suppliers</span>
            </div>

            <div
              className="flex flex-col items-center lg:flex-row p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300"
              onClick={() => navigate('/adminOrders')}
            >
              <MdOutlineShoppingBag className="h-6 w-6 lg:mr-3" />
              <span className="hidden lg:inline">Orders</span>
            </div>

            <div className="flex flex-col items-center lg:flex-row p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300" onClick={()=>navigate("/adminAccount")}>
              <MdAccountCircle className="h-6 w-6 lg:mr-3" />
              <span className="hidden lg:inline">Accounts</span>
            </div>
          </div>
        </div>

        <button className="bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition mt-20" id='log'>
          Logout
        </button>
     
      </div>

      {/* Right content */}
      <div className="content flex flex-col lg:flex-row gap-10 lg:ml-80 w-full">
        {/* Supplier Stats & Chart */}
        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-5">Suppliers</h2>

          {/* Supplier Stats (Boxes) */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Total Suppliers</h3>
              <p className="text-2xl font-bold">{totalSuppliers}</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Active Suppliers</h3>
              <p className="text-2xl font-bold">{activeSuppliers}</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Inactive Suppliers</h3>
              <p className="text-2xl font-bold">{inactiveSuppliers}</p>
            </div>
          </div>

          {/* Supplier Chart */}
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <Line data={supplierChartData} options={supplierChartOptions} />
          </div>
        </div>

        {/* Supplier Details */}
        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Supplier Details</h3>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2">ID</th>
                <th className="px-4 py-2 border-b-2">Name</th>
                <th className="px-4 py-2 border-b-2">Contact</th>
                <th className="px-4 py-2 border-b-2">Status</th>
                <th className="px-4 py-2 border-b-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="px-4 py-2 border-b">{supplier.id}</td>
                  <td className="px-4 py-2 border-b">{supplier.name}</td>
                  <td className="px-4 py-2 border-b">{supplier.contact}</td>
                  <td className="px-4 py-2 border-b">{supplier.status}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      className="text-blue-500 hover:underline mr-4"
                      onClick={() => handleEdit(supplier.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-green-500 hover:underline"
                      onClick={() => handleMessage(supplier.id)}
                    >
                      Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>










</>
  )
}

export default Adminsupplire