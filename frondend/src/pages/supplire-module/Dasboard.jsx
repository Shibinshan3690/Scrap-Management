import React, { useEffect, useState } from 'react'
import SuppliyerSidebar from '../../Components/SuppliyerSidebar'
import { FaCheckCircle, FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa'
import { MdPendingActions } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import susupplierApi from "../../api/suplyerinterceptor";

const Dasboard = () => {
const navigate=useNavigate();

const [orders, setOrders] = useState([]);

const [error, setError] = useState("");
const [supplierId, setSupplierId] = useState(null);



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


  return (
    <>
      <div className="flex w-[1684px] rounded-lg ">
        <SuppliyerSidebar />
        <div className="flex-1 p-10 bg-blue-50 ml-[305px] mt-4 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Welcome, Delivery Team</h2>

          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center" onClick={()=>navigate("/totaltask")}>
              <FaClipboardList className="text-4xl mr-3" />
              <div    >
                <h3 className="text-xl font-semibold">Total Tasks</h3>
                <p>{orders.length} Tasks</p>
              </div>
            </div>
            <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center" onClick={()=>navigate("/compleateOrder")}>
              <FaCheckCircle className="text-4xl mr-3" />
              <div >
                <h3 className="text-xl font-semibold">Completed</h3>
                <p>{orders.filter((order) => order.status === "compleated").length} Tasks</p>
              </div>
            </div>
            <div className="bg-yellow-600 text-white p-4 rounded-lg shadow-lg flex items-center" onClick={()=>navigate("/pendingOrder")}>
              <MdPendingActions className="text-4xl mr-3" />
              <div>
                <h3 className="text-xl font-semibold"> Pending</h3>
                <p>   {orders.filter((order) => order.status === "pending").length}Tasks</p>
              </div>
            </div>
          </div>

          {/* Task Overview */}
          <div className="bg-white p-12 shadow-lg rounded-lg mb-6 items-center justify-center" onClick={()=>navigate("/report")}>
          <button className="ml-[400px] h-14 w-80 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 ease-in-out">
  Create Report
</button>

          </div>

          {/* Map View Section */}
          <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
            <h3 className="text-2xl font-semibold mb-4">Map View</h3>
            <div className="h-48 bg-gray-200 flex items-center justify-center rounded-lg">
              {/* Placeholder for a map */}
              <FaMapMarkerAlt className="text-5xl text-gray-500" />
              <p className="text-gray-600 text-lg ml-3">Map loading...</p>
            </div>
          </div>

          {/* Task Update Form */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Update Task Status</h3>
            <form>
              <input
                type="text"
                placeholder="Enter Order ID"
                className="border p-2 w-full mb-4 rounded-lg"
              />
              <textarea
                placeholder="Comments (optional)"
                className="border p-2 w-full rounded-lg mb-4"
              ></textarea>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg w-full">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dasboard
