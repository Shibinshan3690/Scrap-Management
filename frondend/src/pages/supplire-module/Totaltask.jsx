import React, { useState, useEffect } from 'react';
import SuppliyerSidebar from '../../Components/SuppliyerSidebar';
import supplierApi from '../../api/suplyerinterceptor';
import { toast, ToastContainer } from 'react-toastify';

// TaskModal Component
const TaskModal = ({ task, onClose, onTaskUpdate }) => {
  if (!task) return null;

  const handleConfirmOrder = async () => {
    try {
      const supplierData = JSON.parse(localStorage.getItem('supplire'));
      if (!supplierData || !supplierData.id) {
        toast.error('Supplier data not found!');
        return;
      }

      const response = await supplierApi.put(`/confirm/${task._id}`, {
        supplierId: supplierData.id,
      });
        console.log(response,"responseeee")
      toast.success('Order confirmed successfully!');
      onTaskUpdate(task._id, response.data.order);
      onClose();
    } catch (error) {
      console.error('Error confirming order:', error);
      toast.error('Failed to confirm order. Please try again.');
    }
  };

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-lg p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Order Details</h2>
        </div>
        <div className="mt-4">
          <p>
            <span className="font-semibold">Order from:</span> {task.user?.name || 'No name provided'}
          </p>
          <p className="mt-2">
            <span className="font-semibold">District:</span> {task?.distric || 'Not specified'}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Pickup Date:</span> {task.date || 'No date provided'}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Vehicle:</span> {task.vehical || 'Not provided'}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Address:</span> {task.adress || 'Not provided'}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Pincode:</span> {task.pincode || 'Not provided'}
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleConfirmOrder}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition"
          >
            Confirm Order
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// TaskCard Component
const TaskCard = ({ task, onViewDetails }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Orders</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            task.status === 'Completed'
              ? 'bg-green-100 text-green-600'
              : task.status === 'confirm'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {task.status}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-gray-600">
          <span className="font-semibold">Order To:</span> {task.user?.name || 'No name provided'}
        </p>
        <p className="text-gray-600 mt-2">
          <span className="font-semibold">District:</span> {task.distric || 'Not specified'}
        </p>
        <p className="text-gray-600 mt-2">
          <span className="font-semibold">Pickup Date:</span> {task.date || 'No date provided'}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => onViewDetails(task)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
        >
          View Details
        </button>
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
    <div className="flex bg-gray-100 min-h-screen">
      <SuppliyerSidebar />
      <ToastContainer/>
      <div className="flex flex-col p-6 ml-[280px] w-full">
        <header className="flex justify-between items-center bg-white shadow-sm p-4 rounded-md">
          <h1 className="text-xl font-bold text-gray-800">Task Management</h1>
          <select
            className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="confirm" >Confirm</option>
            <option value="Completed">Completed</option>
          </select>
        </header>
        <main className="mt-6">
          {loading ? (
            <p className="text-gray-500 text-center">Loading tasks...</p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
