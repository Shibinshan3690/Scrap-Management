import React, { useEffect, useState } from "react";
import Adminsidebar from "./Adminsidebar";
import adminApi from "../../api/adminInterceptor";

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
        const response = await adminApi.get("/getReportAdmin"); // Fetch data using admin interceptor
        if (response.status === 200) {
          setReports(response.data.reports); // Assuming the API response contains `reports`
        } else {
          console.error("Failed to fetch reports:", response.data.message);
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
      <main className="flex-1 mt-4">
        <div className="bg-white rounded-lg shadow-md p-6 ml-[270px] h-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
            Reports
          </h1>
          {loading ? (
            <p>Loading reports...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-blue-200">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold" colSpan="4">
                      1. Order Report
                    </th>
                  </tr>
                  <tr className="bg-white">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-blue-100">
                      Order ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">UserId</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-[200px] bg-blue-100">
                      Supplier ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length > 0 ? (
                    reports.map((report, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2 text-left">
                          {/* {report.orderId || "N/A"} */}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-left">
                          {/* {report.address || "N/A"} */}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-left">
                          {/* {report.supplierId || "N/A"} */}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-left">
                          {report.date || "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">
                        No reports available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminReport;
