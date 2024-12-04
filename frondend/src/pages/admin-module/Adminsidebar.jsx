import React from 'react'
import "./adminsidebar.css";
import { MdAccountCircle, MdDashboard, MdOutlinePeopleOutline, MdOutlineShoppingBag } from 'react-icons/md';
import { FaFileInvoiceDollar, FaPeopleCarry } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoIosNotifications } from 'react-icons/io';

const Adminsidebar = ({ unreadCount }) => {
      const navigate=useNavigate();
      const handleLogout = () => {
        // Remove admin ID and token from localStorage
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');

        // Navigate to the adminSignUp page
        navigate('/adminSignUp');
    };
  return (
  <>
  
  
  {/* Sidebar */}
  <div className="sidebar bg-white w-64 p-10 rounded-3xl shadow-lg lg:fixed " id='side'>
          <div >
            <div className=" mb-10">
              {/* <img src="" alt="logo" className="h-12 w-12 rounded-full lg:h-16 lg:w-16" /> */}
              <span className="ml-2 text-balance font-bold text-yellow-500 lg:block tracking-wide hei uppercase " style={{fontSize:"17px"}}>
  Scrap Pro
</span>

            </div>

            <div className="space-y-6">
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

              <div
         className="flex flex-col items-center lg:flex-row p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300"
          onClick={() => navigate("/adminReport")}
        >
          <FaFileInvoiceDollar className="h-6 w-6 lg:mr-3"/>
          <span>Reports</span>
        </div>

              <div className="flex flex-col items-center lg:flex-row p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300" onClick={()=>navigate("/adminAccount")}>
                <MdAccountCircle className="h-6 w-6 lg:mr-3" />
                <span className="hidden lg:inline">Accounts</span>
              </div>

              <div className="flex flex-col items-center lg:flex-row p-2 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300" onClick={()=>navigate("/notification")}>
              {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center" style={{marginTop:"-27px"}}>
              {unreadCount}
            </span>
          )}
                <IoIosNotifications className="h-6 w-6 lg:mr-3" style={{marginLeft:"-16px"}} />
                <span className="hidden lg:inline">Notification</span>
              </div>
                  
            </div>
          </div>

          <button className="bg-yellow-400 text-white font-bold px-4 rounded-lg hover:bg-yellow-500 transition 
          w-22 h-8  mb-4  font-light bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105
          "
          
           onClick={handleLogout}  style={{marginTop:"60px"}}>
            Logout
          </button>
        </div>
  
  
  
  
  
  
  
  
  
  
  
  
  </>
  )
}

export default Adminsidebar