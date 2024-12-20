import React, { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import adminApi from '../../api/adminInterceptor';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';

const AdminCustomers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await adminApi.get('/getAdminuserDeatils');
        setCustomers(response.data.data);
        setFilteredCustomers(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch customers");
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notification/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleBlockUser = async (id) => {
    try {
      const response = await adminApi.put(`/blockUser/${id}`);
      localStorage.removeItem('supplier');
      localStorage.removeItem('supplierToken');

      toast.success(response.data.message);

      const updatedCustomers = customers.map((customer) =>
        customer._id === id ? { ...customer, isBlocked: true } : customer
      );
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Failed to block user");
    }
  };

  const handleUnblockUser = async (id) => {
    try {
      const response = await adminApi.put(`/unblockedUser/${id}`);
      toast.success(response.data.message);

      const updatedCustomers = customers.map((customer) =>
        customer._id === id ? { ...customer, isBlocked: false } : customer
      );
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("Failed to unblock user");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term)
    );
    setFilteredCustomers(filtered);
  };

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <div className="flex bg-yellow-400 min-h-screen">
      <AdminSidebar unreadCount={unreadCount} />
      <ToastContainer />
      <main className="flex-1 "style={{marginTop:"14px"}}>
      <div className="bg-white h-[715px] w-[1420px] shadow-md p-6 ml-[270px] overflow-y-scroll overflow-y-hidden rounded-3xl">
       

          <div className="flex items-center mb-6 space-x-4">
    
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name or email..."
                className="h-10 pl-10 pr-4 bg-white rounded-full border-4 border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
            />
             <button
            onClick={() => {}}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Search
          </button>
          </div>
         
        

        <div className="bg-white rounded-lg shadow-lg p-4" style={{ width: "1350px", marginTop: "10px" }}>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <table className="w-full text-left border-collapse border-yellow-400">
            <thead>
              <tr className='border-yellow-400'>
                <th className="px-6 py-3 border-b-2 font-semibold text-gray-600">Name</th>
                <th className="px-6 py-3 border-b-2 font-semibold text-gray-600">Email</th>
                <th className="px-6 py-3 border-b-2 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-yellow-200 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    <td className="px-6 py-4 border-b text-gray-700" onClick={() => navigate(`/userDeatilsGetById/${customer._id}`)}>{customer.name}</td>
                    <td className="px-6 py-4 border-b text-gray-700" onClick={() => navigate(`/userDeatilsGetById/${customer._id}`)}>{customer.email}</td>
                    <td className="px-6 py-4 border-b text-gray-700 flex space-x-3">
                      {customer.isBlocked ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnblockUser(customer._id);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition duration-300 transform hover:scale-105"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBlockUser(customer._id);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-300 transform hover:scale-105"
                        >
                          Block
                        </button>
                      )}
                      {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition duration-300 transform hover:scale-105">
                        Message
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </main>
    </div>
  );
};

export default AdminCustomers;
