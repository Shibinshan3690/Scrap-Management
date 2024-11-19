import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import userApi from "../../api/userInterceptor";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    productName: "",
    vehical: "",
    adress: "",
    date: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await userApi.get("/myorders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        setOrders(response.data.orders);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleEdit = (order) => {
    setCurrentOrder(order);
    setUpdatedDetails({
      productName: order.productName,
      vehical: order.vehical,
      adress: order.adress,
      date: order.date,
    });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await userApi.put(`/orders/${currentOrder._id}`, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === currentOrder._id ? { ...order, ...updatedDetails } : order
        )
      );
      setIsEditing(false);
      setCurrentOrder(null);
      toast.success("Order updated successfully!");
    } catch (err) {
      console.error("Failed to update order:", err);
      setError("Failed to update the order");
      toast.error("Failed to update the order");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleDelete = async (orderId) => {
    try {
      await userApi.delete(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Failed to delete order:", err);
      setError("Failed to delete the order");
    }
  };

  return (
    <>
      <div style={{ marginTop: "365px" }}>
        <Nav />
      </div>
      <div className="min-h-screen bg-gray-100 pt-10">
         <ToastContainer/>
        <div className="p-4 mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            My Orders
          </h1>
          {loading ? (
            <p className="text-center text-gray-600">Loading orders...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-600">No orders found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 relative"
                >
                  <h2 className="text-lg font-bold text-gray-800">
                    Order #{order._id}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    <span className="font-semibold">Product:</span> {order.productName}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-semibold">Vehicle:</span> {order.vehical}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-semibold">Address:</span> {order.adress}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-semibold">PickUp Date:</span>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p
                    className={`mt-4 text-sm font-medium px-4 py-2 rounded-full ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "confirm"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {order.status}
                  </p>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(order)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {isEditing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Order</h2>
            <label className="block mb-2">
              Product Name:
              <input
                type="text"
                name="productName"
                value={updatedDetails.productName}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="block mb-2">
              Vehicle:
              <input
                type="text"
                name="vehical"
                value={updatedDetails.vehical}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="block mb-2">
              Address:
              <input
                type="text"
                name="adress"
                value={updatedDetails.adress}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="block mb-2">
              PickUp Date:
              <input
                type="date"
                name="date"
                value={updatedDetails.date}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md p-2"
              />
            </label>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
