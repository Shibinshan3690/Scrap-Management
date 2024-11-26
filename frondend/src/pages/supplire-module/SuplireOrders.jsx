import React, { useState, useEffect } from "react";
import SuppliyerSidebar from "../../Components/SuppliyerSidebar";
import axios from "axios";
import susupplierApi from "../../api/suplyerinterceptor";
import { useNavigate } from "react-router-dom";

const SupplierOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState("");
  const [supplierId, setSupplierId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const navigate=useNavigate();

  
  useEffect(() => {
    const storedSupplier = localStorage.getItem('supplire');
    if (storedSupplier) {
      const supplier = JSON.parse(storedSupplier);
      setSupplierId(supplier.id);
      console.log(supplier.id);
    } else {
      console.log("Supplier not found in localStorage");
    }
  }, []);

  // Fetch orders from API based on supplierId
  useEffect(() => {
    if (supplierId) {
      const fetchOrders = async () => {
        try {
          const response = await susupplierApi.get(`/assigned-orders/${supplierId}`);
          console.log(response, "response");
          setOrders(response.data.orders);
        } catch (err) {
          console.error("Error fetching orders:", err);
          setError(err.response?.data?.message || "Failed to fetch orders");
        }
      };

      fetchOrders();
    }
  }, [supplierId]);

  // Function to handle opening the modal
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex bg--100 min-h-screen">
      <div>
        <SuppliyerSidebar />
      </div>

      <div className="p-4 ml-[290px] w-full">
        <div className="bg-blue-50 shadow rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Supplier Orders
          </h1>

          {/* Display Error If Any */}
          {error && <p className="text-red-500">{error}</p>}

          {!error && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center">
                  <h2 className="text-lg font-semibold">Total Orders</h2>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
                <div className="bg-green-100 text-green-800 p-4 rounded shadow text-center" onClick={()=>navigate("/compleateOrder")}>
                  <h2 className="text-lg font-semibold">Completed Orders</h2>
                  <p className="text-2xl font-bold">
                    {orders.filter((order) => order.status === "compleated").length}
                  </p>
                </div>
                <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow text-center" onClick={()=>navigate("/pendingOrder")}>
                  <h2 className="text-lg font-semibold">Pending Orders</h2>
                  <p className="text-2xl font-bold">
                    {orders.filter((order) => order.status === "pending").length}
                  </p>
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
                      <th className="px-4 py-2 text-left text-gray-600">Product</th>
                      <th className="px-4 py-2 text-left text-gray-600">Quantity</th>
                      <th className="px-4 py-2 text-left text-gray-600">Status</th>
                      <th className="px-4 py-2 text-left text-gray-600">Date</th>
                      <th className="px-4 py-2 text-left text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-2 text-gray-700">{order._id}</td>
                        <td className="px-4 py-2 text-gray-700">{order.productName}</td>
                        <td className="px-4 py-2 text-gray-700">{order.distric}</td>
                        <td
                          className={`px-4 py-2 font-semibold ${
                            order.status === "compleated"
                              ? "text-green-500"
                              : order.status === "pending"
                              ? "text-yellow-500"
                              : "text-blue-500"
                          }`}
                        >
                          {order.status}
                        </td>
                        <td className="px-4 py-2 text-gray-700">{order.date}</td>
                        <td className="px-4 py-2 text-gray-700">
                          <button
                            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => openModal(order)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal for Order Details */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4  ">Order Details</h2>
            <div className="mb-4">
              <strong>Order ID:</strong ><span className="font-bold text-1xl text-gray-800">{selectedOrder._id} </span>
            </div>
            <div className="mb-4">
              <strong>Product:</strong> <span className="font-bold text-1xl text-gray-800">{selectedOrder.productName}</span> 
            </div>
            <div className="mb-4">
              <strong>Status:</strong>  <span 
               className={`px-4 py-2 font-semibold ${
                selectedOrder?.status === "compleated"
                  ? "text-green-500"
                  : selectedOrder?.status === "pending"
                  ? "text-yellow-500"
                  : "text-blue-500"
              }`}
              >{selectedOrder.status}</span>
            </div>
            <div className="mb-4">
              <strong>Date:</strong> <span className="font-bold text-1xl text-gray-800">{selectedOrder.date}</span>
            </div>
            <div className="mb-4">
              <strong>Address:</strong><span className=" font-bold text-1xl text-gray-800">{selectedOrder.adress}</span> 
            </div>
            <div className="mb-4">
              <strong>Phone Number:</strong> <span className="font-bold text-1xl text-gray-800"> {selectedOrder.phoneNumber}</span>
            </div>
            <div className="mb-4">
              <strong>Vehicale:</strong> <span className="font-bold text-1xl text-gray-800">{selectedOrder.vehical}</span>
            </div>
            <div className="mb-4">
              <strong>Description:</strong><span className="font-bold text-1xl text-gray-800">{selectedOrder.description}</span> 
            </div>
            <div className="mb-4">
              <strong>Pincode:</strong><span className="font-bold text-1xl text-gray-800">{selectedOrder.pincode}</span> 
            </div>

            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierOrders;
