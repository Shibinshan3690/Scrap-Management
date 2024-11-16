import React, { useEffect, useState } from 'react';
import Adminsidebar from './Adminsidebar';
import { useParams } from 'react-router-dom';
import adminApi from '../../api/adminInterceptor';
import suplireApi from "../../api/suplyerinterceptor"

const OrderTimeline = ({ status }) => {
  const stages = ["Placed", "Processed", "Shipped", "Delivered"];
  return (
    <div className="timeline flex justify-between items-center gap-4 mb-6">
      {stages.map((stage, index) => (
        <div
          key={index}
          className={`flex-1 text-center ${
            status === stage ? 'font-semibold text-blue-600' : 'text-gray-400'
          }`}
        >
          <span>{stage}</span>
        </div>
      ))}
    </div>
  );
};

const SupplierAssignment = ({ suppliers, onAssign }) => {
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  

  
  useEffect(() => {
    // Filter suppliers based on the search query
    if (searchQuery) {
      setFilteredSuppliers(
        suppliers.filter((supplier) =>
          supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredSuppliers(suppliers);
    }
  }, [searchQuery, suppliers]);




   const handleAssign = () => {
    if (selectedSupplier) {
      onAssign(selectedSupplier);
    } else {
      alert('Please select a supplier');
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-6 ">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Assign Supplier
      </h2>

      <div className="mb-4">
        <label htmlFor="supplier-search" className="block text-gray-600 font-medium mb-2">
          Search Suppliers
        </label>
        <input
          id="supplier-search"
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Search by supplier name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="supplier-select" className="block text-gray-600 font-medium mb-2">
          Select a Supplier
        </label>
        <select
          id="supplier-select"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
        >
          <option value="" disabled>
            Select Supplier
          </option>
          {filteredSuppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name} - {supplier.contact || 'No contact info'}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAssign}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition duration-200"
        >
          Assign Supplier
        </button>
      </div>

      {/* Additional Details Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Supplier Details</h3>
        {selectedSupplier ? (
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-800">
              <strong>Name:</strong>{' '}
              {filteredSuppliers.find((supplier) => supplier.id === selectedSupplier)?.name}
            </p>
            <p className="text-gray-800">
              <strong>Contact:</strong>{' '}
              {filteredSuppliers.find((supplier) => supplier.id === selectedSupplier)?.contact || 'N/A'}
            </p>
            <p className="text-gray-800">
              <strong>Location:</strong>{' '}
              {filteredSuppliers.find((supplier) => supplier.id === selectedSupplier)?.location || 'N/A'}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 italic">Select a supplier to view details.</p>
        )}
      </div>
    </div>
  );
};

const UserOrderDetails = () => {
  const { id } = useParams();
  const [userOrder, setUserOrder] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await adminApi.get(`/getOrderById/${id}`);
        setUserOrder(response.data.data);
      } catch (error) {
        console.error("Failed to fetch order details", error);
        setError("Failed to fetch order details");
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await suplireApi.get('/allSupplires');
        setSuppliers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch suppliers", error);
      }
    };

    fetchOrderDetails();
    fetchSuppliers();
  }, []);

  const assignSupplier = async (supplierId) => {
    try {
      await adminApi.post(`/assignSupplier/${id}`, { supplierId });
      alert("Supplier assigned successfully");
    } catch (error) {
      console.error("Failed to assign supplier", error);
      alert("Failed to assign supplier");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Adminsidebar />
      <div className="flex flex-col bg-white ml-[275px] w-[1400px] h-[710px] mt-[15px] rounded-lg">
        <div className="  flex flex-col h-[710px]">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full h-full flex flex-col space-y-6">
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
            {userOrder ? (
              <>
                <OrderTimeline status={userOrder.status} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-gray-600">Customer Name</span>
                    <span className="text-gray-900 font-medium">{userOrder?.user?.name || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600">Phone Number</span>
                    <span className="text-gray-900 font-medium">{userOrder.phoneNumber}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600">Address</span>
                    <span className="text-gray-900 font-medium">{userOrder.adress}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-gray-600">Distric</span>
                    <span className="text-gray-900 font-medium">{userOrder.distric}</span>
                  </div>

                </div>

                <SupplierAssignment suppliers={suppliers} onAssign={assignSupplier} />
              </>
            ) : (
              <p className="text-center text-gray-500">Loading order details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetails;
