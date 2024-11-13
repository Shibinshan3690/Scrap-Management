import React from 'react'
import SuppliyerSidebar from '../../Components/SuppliyerSidebar'
import { FaCheckCircle, FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa'
import { MdPendingActions } from 'react-icons/md'

const Dasboard = () => {
  return (
    <>
      <div className="flex w-[1684px] rounded-lg ">
        <SuppliyerSidebar />
        <div className="flex-1 p-10 bg-gray-100 ml-[310px] mt-4 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Welcome, Delivery Team</h2>

          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center">
              <FaClipboardList className="text-4xl mr-3" />
              <div>
                <h3 className="text-xl font-semibold">Total Tasks</h3>
                <p>15 Tasks</p>
              </div>
            </div>
            <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center">
              <FaCheckCircle className="text-4xl mr-3" />
              <div>
                <h3 className="text-xl font-semibold">Completed</h3>
                <p>10 Tasks</p>
              </div>
            </div>
            <div className="bg-yellow-600 text-white p-4 rounded-lg shadow-lg flex items-center">
              <MdPendingActions className="text-4xl mr-3" />
              <div>
                <h3 className="text-xl font-semibold">Pending</h3>
                <p>5 Tasks</p>
              </div>
            </div>
          </div>

          {/* Task Overview */}
          <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
            <h3 className="text-2xl font-semibold mb-4">Today's Pickup Tasks</h3>
            <div className="space-y-4">
              {/* Example of a Task Card */}
              <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-md">
                <div>
                  <h4 className="text-lg font-bold">Order ID: 12345</h4>
                  <p>Pickup Location: 123 Street, City</p>
                  <p className="text-sm text-gray-600">Time: 3:00 PM</p>
                </div>
                <button className="text-green-600 font-semibold flex items-center">
                  <FaCheckCircle className="mr-2" /> Mark as Completed
                </button>
              </div>
              {/* Add more task cards if needed */}
            </div>
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
