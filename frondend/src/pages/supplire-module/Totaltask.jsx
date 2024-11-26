import React, { useState, useEffect } from 'react';
import SuppliyerSidebar from '../../Components/SuppliyerSidebar';
import supplierApi from '../../api/suplyerinterceptor';
import { toast, ToastContainer } from 'react-toastify';


const TaskModal = ({ task, onClose, onTaskUpdate }) => {
  if (!task) return null;

  const handleConfirmOrder = async () => {
    try {
      const supplierData = JSON.parse(localStorage.getItem("supplire"));
      if (!supplierData || !supplierData.id) {
        toast.error("Supplier data not found!");
        return;
      }

      const response = await supplierApi.put(`/confirm/${task._id}`, {
        supplierId: supplierData.id,
      });

      toast.success("Order confirmed successfully!");
      onTaskUpdate(task._id, response.data.order);
      onClose();
    } catch (error) {
      console.error("Error confirming order:", error);
      toast.error("Failed to confirm order. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-2xl overflow-hidden animate-fade-in">
        <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Order Details</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl  border-none hover:text-gray-300 transition"
          >
            ✖
          </button>
        </header>
        <main className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block font-semibold text-gray-700">Order from:</span>
              <span>{task.user?.name || "No name provided"}</span>
            </div>
            <div>
              <span className="block font-semibold text-gray-700">District:</span>
              <span>{task?.distric || "Not specified"}</span>
            </div>
            <div>
              <span className="block font-semibold text-gray-700">Pickup Date:</span>
              <span>{task.date || "No date provided"}</span>
            </div>
            <div>
              <span className="block font-semibold text-gray-700">Vehicle:</span>
              <span>{task.vehical || "Not provided"}</span>
            </div>
            <div>
              <span className="block font-semibold text-gray-700">Address:</span>
              <span>{task.adress || "Not provided"}</span>
            </div>
            <div>
              <span className="block font-semibold text-gray-700">Pincode:</span>
              <span>{task.pincode || "Not provided"}</span>
            </div>
          </div>
        </main>
        <footer className="p-6 bg-gray-100 flex flex-col sm:flex-row  w-[672px] mb-[150px] ml-[507px] justify-center items-center gap-4">
          <button
            onClick={handleConfirmOrder}
            className="flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-green-600 transition-all"
          >
            ✅ Confirm Order
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 bg-red-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-red-600 transition-all"
          >
            ❌ Close
          </button>
        </footer>
      </div>
    </div>
  );
};





// TaskCard Component
const TaskCard = ({ task, onViewDetails }) => {
  return (
    <div className="p-5 bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-2xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Task Details</h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${
            task.status === 'compleated'
              ? 'bg-green-100 text-green-600'
              : task.status === 'confirm'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {task.status}
        </span>
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-gray-700">
          <span className="font-medium">Order From:</span> {task.user?.name || 'No name provided'}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">District:</span> {task.distric || 'Not specified'}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Pickup Date:</span> {task.date || 'No date provided'}
        </p>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => onViewDetails(task)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300"
        >
          View Details
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600 hover:scale-110 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};


// Totaltask Component
const Totaltask = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const supplierData = JSON.parse(localStorage.getItem('supplire'));
    const supplierId = supplierData?.id;

    if (!supplierId) {
      setError('Supplier ID is missing.');
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await supplierApi.get(`/tasks/${supplierId}`);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Error fetching tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskUpdate = (taskId, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
    );
  };

  const filteredTasks =
    statusFilter === 'All'
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  return (
    <div className="flex bg-white min-h-screen">
      <SuppliyerSidebar />
      <ToastContainer />
      <div className="flex flex-col p-4 ml-[300px] w-full">
        <header className="flex justify-between items-center bg-gradient-to-r from-blue-100 to-white shadow-md p-5 rounded-lg">
          <h1 className="text-2xl font-bold text-blue-700">Task Management</h1>
          <select
            className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="confirm">Confirm</option>
            <option value="compleated">Completed</option>
          </select>
        </header>
        <main className="mt-6">
          {loading ? (
            <p className="text-gray-500 text-center">Loading tasks...</p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard key={task._id} task={task} onViewDetails={setSelectedTask} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No tasks available.</p>
          )}
        </main>
        {selectedTask && (
          <TaskModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onTaskUpdate={handleTaskUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Totaltask;
