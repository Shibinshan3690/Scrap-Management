import React from "react";
import "./suppliyerSidebar.css";
import {
  MdDashboard,
  MdOutlineShoppingBag,
  MdOutlineAnalytics,
} from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SuppliyerSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("supplire");
    localStorage.removeItem("supplireToken");
    navigate("/signUpSupllire");
  };

  return (
    <div className="sidebar bg-gradient-to-b p-6 mt-3 from-blue-100 to-blue-50 w-64  rounded-3xl fixed  ml-2 lg:w-72">
      {/* Logo Section */}
      <div className="flex items-center space-x-4 mb-10">
       
        <span className="text-2xl font-extrabold text-blue-700">ScrapPro</span>
      </div>

      {/* Navigation Links */}
      <div className="space-y-4">
        <div
          className="sidebar-link"
          onClick={() => navigate("/dashboard")}
        >
          <MdDashboard className="h-6 w-6 mr-3" />
          <span>Dashboard</span>
        </div>

        <div
          className="sidebar-link"
          onClick={() => navigate("/suplireOrders")}
        >
          <MdOutlineShoppingBag className="h-6 w-6 mr-3" />
          <span>Orders</span>
        </div>

        <div
          className="sidebar-link"
          onClick={() => navigate("/analytics")}
        >
          <MdOutlineAnalytics className="h-6 w-6 mr-3" />
          <span>Analytics</span>
        </div>

        <div
          className="sidebar-link"
          onClick={() => navigate("/report")}
        >
          <FaFileInvoiceDollar className="h-6 w-6 mr-3" />
          <span>Reports</span>
        </div>

        <div
          className="sidebar-link"
          onClick={() => navigate("/profile")}
        >
          <RiProfileLine className="h-6 w-6 mr-3" />
          <span>Profile</span>
        </div>

        <div
          className="sidebar-link"
          onClick={() => navigate("/notifications")}
        >
          <IoIosNotifications className="h-6 w-6 mr-3" />
          <span>Notifications</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t my-6"></div>

      {/* Help and Support */}
      <div
        className="sidebar-link"
        onClick={() => navigate("/help")}
      >
        <span className="font-semibold">Help & Support</span>
      </div>
      <div
        className="sidebar-link"
        onClick={() => navigate("/settings")}
      >
        <span className="font-semibold">Settings</span>
      </div>

      {/* Logout Button */}
      <button
        className="bg-blue-600  text-white font-bold p-3  justify-center  items-center rounded-lg mt-20 h-[40px] w-[150px] shadow-md  transition-all"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default SuppliyerSidebar;
