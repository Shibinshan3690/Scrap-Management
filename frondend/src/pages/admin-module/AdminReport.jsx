import React, { useEffect, useState } from "react";
import Adminsidebar from "./Adminsidebar";
import adminApi from "../../api/adminInterceptor";
import { useNavigate } from "react-router-dom";

const AdminReport = () => {
  const [notifications, setNotifications] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  // Fetch Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/notification/notifications"
        );
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
        const response = await adminApi.get("/getReportAdmin");
        console.log("response", response);
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

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <div className="flex  min-h-screen bg-yellow-400">
      <Adminsidebar unreadCount={unreadCount} />
      <main className="flex-1 "style={{marginTop:"14px"}}>
      <div className="bg-white h-[715px] w-[1420px] shadow-md p-6 ml-[270px] overflow-y-scroll rounded-3xl">
          <h1 className="text-1xl font-bold text-gray-800 mb-6 border-b-2 border-yellow-400 pb-2">
            Reports
          </h1>
          {loading ? (
            <p className="text-gray-500">Loading reports...</p>
          ) : (
            <div className="flex flex-wrap gap-6">
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow border-t-4 border-yellow-400 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33%-0.75rem)]"
                  >
                    <h2 className="text-xxl font-bold text-gray-800 tracking-wide">
                      Order ID:{" "}
                      <span className="text-blue-500 font-medium underline">
                        {report?.orderId?._id || "N/A"}
                      </span>
                    </h2>
                    <p className="text-sm mt-4  text-gray-800 tracking-wide  font-bold">
                      User ID:
                      <span className="font-medium">
                        {report?.orderId?.user}
                      </span>
                    </p>
                    <p className="text-sm mt-4  text-gray-800 tracking-wide  font-bold">
                      Supplier ID:
                      <span className="font-medium">
                        {report?.supplierId?._id || "N/A"}
                      </span>
                    </p>
                    <p className="text-sm mt-4  text-gray-800 tracking-wide  font-bold">
                      Date:
                      <span className="font-medium">
                        {report?.orderId?.date || "N/A"}
                      </span>
                    </p>
                    {/* Status */}
                    <p className="text-sm mt-4  text-gray-800 tracking-wide  font-bold">
                      Status:
                      <span
                        className={`font-semibold px-2 py-1 rounded ${
                          report?.orderId?.status === "compleated"
                            ? "bg-green-100 text-green-700"
                            : report.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {report?.orderId?.status || "Unknown"}
                      </span>
                    </p>
                    <p className="text-sm mt-4 text-gray-800 tracking-wide font-bold">
  Created:
  <span className="font-medium ml-2">
    {report?.createdAt
      ? new Date(report.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
      : "N/A"}
  </span>
  <br />
   <div  style={{marginTop:"10px"}}>
  Time:
  <span className="font-medium ml-2  " >
    {report?.createdAt
      ? new Date(report.createdAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })
      : "N/A"}
  </span>
  </div>
</p>


                    <button className="w-22 h-8 ml-[300px] mb-4  font-light bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
                    onClick={()=>navigate(`/specificReportAdmin/${report?.orderId?._id }`)}
                    >
  Check
</button>

                  </div>
                ))
              ) : (
                <p className="flex justify-center items-center w-full text-center text-gray-500">
                  No reports available
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminReport;
