import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminSupplier = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    

   

    const suppliers = [
      { id: 1, name: 'Supplier 1', contact: 'supplier1@example.com', status: 'Active' },
      { id: 2, name: 'Supplier 2', contact: 'supplier2@example.com', status: 'Inactive' },
      { id: 3, name: 'Supplier 3', contact: 'supplier3@example.com', status: 'Active' },
    ];

    const totalSuppliers = suppliers.length;
    const activeSuppliers = suppliers.filter(supplier => supplier.status === 'Active').length;
    const inactiveSuppliers = totalSuppliers - activeSuppliers;

    const handleEdit = (id) => {
      console.log(`Edit Supplier ID: ${id}`);
    };

    const handleMessage = (id) => {
      console.log(`Message Supplier ID: ${id}`);
    };

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

    const unreadCount = notifications.filter(notification => !notification.isRead).length;

    return (
      <div className="flex min-h-screen bg-gray-100 text-gray-800">
            <AdminSidebar unreadCount={unreadCount} />

            <div className="content flex flex-col lg:flex-row gap-10 ml-[280px] w-full mt-2">
                <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold mb-4 text-gray-700">Suppliers Overview</h2>

                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <StatBox title="Total Suppliers" count={totalSuppliers} />
                        <StatBox title="Active Suppliers" count={activeSuppliers} color="text-green-600" />
                        <StatBox title="Inactive Suppliers" count={inactiveSuppliers} color="text-red-600" />
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md">
                      
                    </div>
                </div>

                <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-5 text-gray-700">Supplier Details</h3>
                    <table className="min-w-full border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-6 py-3 border-b text-left">ID</th>
                                <th className="px-6 py-3 border-b text-left">Name</th>
                                <th className="px-6 py-3 border-b text-left">Contact</th>
                                <th className="px-6 py-3 border-b text-left">Status</th>
                                <th className="px-6 py-3 border-b text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map(supplier => (
                                <tr key={supplier.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 border-b">{supplier.id}</td>
                                    <td className="px-6 py-4 border-b">{supplier.name}</td>
                                    <td className="px-6 py-4 border-b">{supplier.contact}</td>
                                    <td className="px-6 py-4 border-b">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${supplier.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {supplier.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <button className="text-blue-500 hover:underline mr-4" onClick={() => handleEdit(supplier.id)}>Edit</button>
                                        <button className="text-green-500 hover:underline" onClick={() => handleMessage(supplier.id)}>Message</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatBox = ({ title, count, color = 'text-gray-800' }) => (
    <div className="p-5 bg-gray-50 rounded-lg shadow-sm text-center transition transform hover:scale-105">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className={`text-2xl font-semibold ${color}`}>{count}</p>
    </div>
);

export default AdminSupplier;
