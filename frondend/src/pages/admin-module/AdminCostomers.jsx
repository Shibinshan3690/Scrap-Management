import React, { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Adminsidebar from './Adminsidebar';

const AdminCostomers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/getAdminuserDeatils`);
        setCustomers(response.data.data);
        setFilteredCustomers(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch customers");
      }
    };
    fetchCustomer();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(term.toLowerCase()) ||
      customer.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  return (
    <>
      <div>
        <Adminsidebar />
      </div>
      <div className="space-y-5" style={{ marginLeft: "200px",marginTop:"-100px" }}>
        <span className="transform -translate-y-1/2 text-gray-600 font-serif" style={{ fontWeight: "600", fontSize: "20px" }}>Customer</span>
        
        {/* Search Input */}
        <div className="relative w-full mt-4 flex">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full h-12 pl-10 pr-4 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" id="icon" />
          <button className="bg-yellow-400 text-white rounded-lg px-4 py-2 ml-4 hover:bg-yellow-500 transition duration-300">
            Search
          </button>
        </div>

        {/* Customers List */}
        <div className="bg-white p-8 rounded-lg shadow-lg" style={{ width: "1300px", height:"500px"}}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="overflow-y-auto max-h-96"> {/* Scrollable Table Container */}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b text-gray-700 font-semibold text-left">Name</th>
                  <th className="px-6 py-3 border-b text-gray-700 font-semibold text-left">Email</th>
                  <th className="px-6 py-3 border-b text-gray-700 font-semibold text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/userDeatilsGetById/${customer._id}`)}
                  >
                    <td className="px-6 py-3 border-b text-gray-600">{customer.name}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{customer.email}</td>
                    <td className="px-6 py-3 border-b text-gray-600 flex space-x-4">
                      <button className="bg-yellow-400 text-white rounded-lg px-4 py-2 hover:bg-yellow-500 transition duration-300">
                        Block
                      </button>
                      <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300">
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
  );
};

export default AdminCostomers;
