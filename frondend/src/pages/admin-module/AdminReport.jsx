import React, { useEffect, useState } from "react";
import Adminsidebar from "./Adminsidebar";

const AdminReport = () => {
  const [notifications, setNotifications] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:5000/notification/notifications");
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Fetch Reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/admin/reportes"); 
     
        const data = await response.json();
      
        if (response.ok) {
          setReports(data.reports);
           console.log("report",reports);
        

        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Adminsidebar unreadCount={unreadCount} />
      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-md p-6 w-[1409px] ml-[250px]">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Report Summary</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Report ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Supplier
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Order ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-4">
                      Loading reports...
                    </td>
                  </tr>
                ) : reports.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-4">
                      No reports available at the moment.
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-700">{report._id}</td>
                      <td className="px-4 py-2 text-gray-700">
                        {report.supplierId?.name || "N/A"}
                      </td>
                      <td className="px-4 py-2 text-gray-700">{report.orderId || "N/A"}</td>
                      <td className="px-4 py-2 text-gray-700">
                        {report.status || "Pending"}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        <button className="text-blue-600 hover:underline">View</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminReport;
