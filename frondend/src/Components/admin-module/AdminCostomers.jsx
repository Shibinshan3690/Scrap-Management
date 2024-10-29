import React from 'react'
import "./admincostomers.css";
import { MdAccountCircle, MdDashboard, MdOutlinePeopleOutline, MdOutlineShoppingBag, MdSearch } from 'react-icons/md';
import { FaPeopleCarry } from 'react-icons/fa';
// import logo from "../../pics/scrap-logo.webp";
import { useNavigate } from 'react-router-dom';

const AdminCostomers = () => {
    const navigate = useNavigate();

  const customers = [
    { name: 'John Doe', status: 'Active', email: 'john@example.com', phone: '123-456-7890' },
    { name: 'Jane Smith', status: 'Inactive', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Bob Johnson', status: 'Active', email: 'bob@example.com', phone: '555-444-3333' },
    { name: 'John Doe', status: 'Active', email: 'john@example.com', phone: '123-456-7890' },
    { name: 'Jane Smith', status: 'Inactive', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Bob Johnson', status: 'Active', email: 'bob@example.com', phone: '555-444-3333' },
    { name: 'John Doe', status: 'Active', email: 'john@example.com', phone: '123-456-7890' },
    { name: 'Jane Smith', status: 'Inactive', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Bob Johnson', status: 'Active', email: 'bob@example.com', phone: '555-444-3333' },
    { name: 'John Doe', status: 'Active', email: 'john@example.com', phone: '123-456-7890' },
    { name: 'Jane Smith', status: 'Inactive', email: 'jane@example.com', phone: '987-654-3210' },
    { name: 'Bob Johnson', status: 'Active', email: 'bob@example.com', phone: '555-444-3333' }
    // Add more customer data here
  ];
 
  return (
  <>
  
  
  
  <div className="main-container-supply flex flex-col lg:flex-row p-10" id='adminCostomerContainer'>

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

        {/* Input Box with Label */}
        <div className="relative w-1/2 mt-10 lg:ml-80" id='admibCustomerinputBox'>
          <span className="absolute transform -translate-y-1/2 text-gray-600" id="spanCoustomer">Customer</span>
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

        {/* Customers List */}
        

        <div className='coustomerlist bg-white p-6 rounded-lg shadow-lg' id='listSecondContainer'>
  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
    <thead>
      <tr>
        <th className="px-4 py-3 border-b text-gray-700 font-semibold">Name</th>
        <th className="px-4 py-3 border-b text-gray-700 font-semibold">Status</th>
        <th className="px-4 py-3 border-b text-gray-700 font-semibold">Email</th>
        <th className="px-4 py-3 border-b text-gray-700 font-semibold">Phone</th>
        <th className="px-4 py-3 border-b text-gray-700 font-semibold">Actions</th> {/* New Actions column */}
      </tr>
    </thead>
    <tbody>
      {customers.map((customer, index) => (
        <tr key={index}>
          <td className="px-4 py-3 border-b text-gray-600">{customer.name}</td>
          <td className={`px-4 py-3 border-b font-semibold ${customer.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
            {customer.status}
          </td>
          <td className="px-4 py-3 border-b text-gray-600">{customer.email}</td>
          <td className="px-4 py-3 border-b text-gray-600">{customer.phone}</td>
          <td className="px-4 py-3 border-b text-gray-600">
            <button 
              className="bg-yellow-400 text-white rounded-md px-3 py-1 mr-2 hover:bg-yellow-500 transition duration-300 w-20"
              
            >
              Edit
            </button>
            <button 
              className="bg-blue-500  text-white rounded-md px-3 py-1 mr-2 hover:bg-yellow-500 transition duration-300 w-20`"
                style={{width:"100px", marginLeft:"60px"}}
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
  
  
  
  </>
  )
}

export default AdminCostomers
