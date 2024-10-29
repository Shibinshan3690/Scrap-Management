import React from 'react'
import "./adminaccount.css";
import { MdAccountCircle, MdDashboard, MdOutlinePeopleOutline, MdOutlineShoppingBag } from 'react-icons/md';
import { FaPeopleCarry } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminAcount = () => {
    const navigate=useNavigate();
  return (
    <>
    
    
    
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
    
    
    
    
    </>
  )
}

export default AdminAcount
