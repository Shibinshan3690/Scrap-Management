import React from 'react';
import './suppliyerSidebar.css';
import { 
    MdAccountCircle, MdDashboard, MdOutlinePeopleOutline, 
    MdOutlineShoppingBag, MdOutlineAnalytics 
} from 'react-icons/md';
import { FaPeopleCarry, FaFileInvoiceDollar } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { RiProfileLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const SuppliyerSidebar = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('supplire');
        localStorage.removeItem('supplireToken');
        navigate('/signUpSupllire');
    };
    
    return (
        <div className="sidebar bg-white w-72 p-8 rounded-3xl shadow-lg fixed h-full" id='side'>
            <div className="flex items-center space-x-4 mb-10">
                <img src="" alt="logo" className="h-12 w-12 rounded-full" />
                <span className="text-2xl font-bold text-gray-800">Scrap</span>
            </div>

            <div className="space-y-6">
                <div
                    className="flex items-center p-3 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300"
                    onClick={() => navigate("/dasboard")}
                >
                    <MdDashboard className="h-6 w-6 mr-3" />
                    <span>Dashboard</span>
                </div>

              
                <div
                    className="flex items-center p-3 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300"
                    onClick={() => navigate("/orders")}
                >
                    <MdOutlineShoppingBag className="h-6 w-6 mr-3" />
                    <span>Orders</span>
                </div>

                <div
                    className="flex items-center p-3 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300"
                    onClick={() => navigate("/analytics")}
                >
                    <MdOutlineAnalytics className="h-6 w-6 mr-3" />
                    <span>Analytics</span>
                </div>

                <div
                    className="flex items-center p-3 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300"
                    onClick={() => navigate("/reports")}
                >
                    <FaFileInvoiceDollar className="h-6 w-6 mr-3" />
                    <span>Reports</span>
                </div>

                <div
                    className="flex items-center p-3 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300"
                    onClick={() => navigate("/profile")}
                >
                    <RiProfileLine className="h-6 w-6 mr-3" />
                    <span>Profile</span>
                </div>

                <div
                    className="flex items-center p-3 hover:bg-yellow-400 rounded-lg cursor-pointer transition duration-300"
                    onClick={() => navigate("/notifications")}
                >
                    <IoIosNotifications className="h-6 w-6 mr-3" />
                    <span>Notifications</span>
                </div>
            </div>

            <button 
                className="bg-black text-white font-bold py-2 px-4 rounded-lg mt-20 w-full transition duration-300"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default SuppliyerSidebar;
