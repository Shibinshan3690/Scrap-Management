import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import susupplierApi from "../../api/suplyerinterceptor";
import adminApi from "../../api/adminInterceptor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false); 
    const navigate=useNavigate()

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

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await susupplierApi.get("/allSupplires");
        const allSuppliers = response.data.data;
        setSuppliers(allSuppliers);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        toast.error("Failed to fetch suppliers. Please try again.");
      }
    };

    fetchSuppliers();
  }, []);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const acceptSupplier = async (supplierId) => {
    try {
      const response = await adminApi.put(`/accept/${supplierId}`);
      if (response.data.status === "success") {
        setSuppliers((suppliers) =>
          suppliers.map((supplier) =>
            supplier._id === supplierId
              ? { ...supplier, status: "accepted" }
              : supplier
          )
        );
        notifySuccess("Supplier accepted successfully!");
      }
    } catch (error) {
      console.error("Error accepting supplier:", error);
      notifyError("Failed to accept supplier.");
    }
  };

  const unacceptSupplier = async (supplierId) => {
    try {
      const response = await adminApi.put(`/unaccept/${supplierId}`);
      if (response.data.status === "success") {
        setSuppliers((suppliers) =>
          suppliers.map((supplier) =>
            supplier._id === supplierId
              ? { ...supplier, status: "inactive" }
              : supplier
          )
        );
        notifySuccess("Supplier unaccepted successfully!");

      }
    } catch (error) {
      console.error("Error unaccepting supplier:", error);
      notifyError("Failed to unaccept supplier.");
    }
  };

  const blockSupplier = async (supplierId) => {
    setLoading(true); // Show loading spinner
    setSuppliers((suppliers) =>
      suppliers.map((supplier) =>
        supplier._id === supplierId
          ? { ...supplier, isBlocked: true }
          : supplier
      )
    );

    try {
      const response = await adminApi.put(`/blockSuplire/${supplierId}`);

        // console.log("response11",response)
      if (response.data.status === "success") {
        localStorage.removeItem('supplire');
        localStorage.removeItem('supplireToken');

         
        notifySuccess("Supplier blocked successfully!");
      } else {
        throw new Error("Failed to block supplier.");
      }
    } catch (error) {
      console.error("Error blocking supplier:", error);
      notifyError("Failed to block supplier.");
      setSuppliers((suppliers) =>
        suppliers.map((supplier) =>
          supplier._id === supplierId
            ? { ...supplier, isBlocked: false }
            : supplier
        )
      );
    } finally {
      setLoading(false); 
    }
  };

  const unblockSupplier = async (supplierId) => {
    setLoading(true); // Show loading spinner
    setSuppliers((suppliers) =>
      suppliers.map((supplier) =>
        supplier._id === supplierId
          ? { ...supplier, isBlocked: false }
          : supplier
      )
    );

    try {
      const response = await adminApi.put(`/unBlockSuplire/${supplierId}`);
       
      if (response.data.status === "success") {
        notifySuccess("Supplier unblocked successfully!");
      } else {
        throw new Error("Failed to unblock supplier.");
      }
    } catch (error) {
      console.error("Error unblocking supplier:", error);
      notifyError("Failed to unblock supplier.");
      setSuppliers((suppliers) =>
        suppliers.map((supplier) =>
          supplier._id === supplierId
            ? { ...supplier, isBlocked: true }
            : supplier
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const activeSuppliers = suppliers.filter((s) => s.status === "accepted").length;
  const inactiveSuppliers = suppliers.filter((s) => s.status !== "accepted").length;

  const StatBox = ({ title, count, color = "text-gray-700" }) => (
    <div className="bg-yellow-200 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-600 ml-28">{title}</h3>
      <p className={`text-2xl font-bold ml-40 ${color}`}>{count}</p>
    </div>
  );

  return (
    <div className="flex  min-h-screen bg-yellow-400">
      <AdminSidebar unreadCount={unreadCount}/>
      <ToastContainer position="top-right" autoClose={3000} />
      <main className="flex-1 "style={{marginTop:"14px"}}>

      <div className="bg-white h-[715px] w-[1420px] shadow-md p-6 ml-[270px] overflow-y-scroll rounded-3xl">
        <h1 className="text-1xl font-semibold text-gray-700 mb-6">Suppliers Management</h1>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatBox title="Total Suppliers" count={suppliers.length} />
          <StatBox title="Active Suppliers" count={activeSuppliers} color="text-green-600" />
          <StatBox title="Inactive Suppliers" count={inactiveSuppliers} color="text-red-600" />
        </div>

        {/* Supplier List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-1xl font-semibold text-gray-700 mb-4">Supplier Details</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-yellow-400 ">
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{supplier.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{supplier.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{supplier.phoneNumber}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${supplier.status === "accepted" ? "bg-green-500" : "bg-red-500"}`}
                      >
                        {supplier.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {supplier.isBlocked ? (
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                          onClick={() => unblockSupplier(supplier._id)}
                          disabled={loading}
                        >
                          {loading ? "Unblocking..." : "Unblock"}
                        </button>
                      ) : (
                        <>
                          {supplier.status !== "accepted" && (
                            <button
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                              onClick={() => acceptSupplier(supplier._id)}
                            >
                              Accept
                            </button>
                          )}
                          {supplier.status === "accepted" && (
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                              onClick={() => unacceptSupplier(supplier._id)}
                            >
                              Unaccept
                            </button>
                          )}
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => blockSupplier(supplier._id)}
                            disabled={loading}
                          >
                            {loading ? "Blocking..." : "Block"}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
};

export default AdminSupplier;
