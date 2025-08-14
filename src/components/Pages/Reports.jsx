import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaUserCheck,
  FaBullseye,
  FaMoneyBillWave,
  FaFolderOpen,
  FaChartPie,
  FaDollarSign,
  FaUserTie,
  FaUserFriends,
  FaCalendarAlt,
  FaSync,
} from "react-icons/fa";

const icons = {
  totalHeadcount: <FaUsers className="text-blue-500 text-2xl" />,
  currentHeadcount: <FaUserCheck className="text-green-500 text-2xl" />,
  targets: <FaBullseye className="text-purple-500 text-2xl" />,
  avgSalary: <FaMoneyBillWave className="text-yellow-500 text-2xl" />,
  currentMonthArchive: <FaFolderOpen className="text-orange-500 text-2xl" />,
  allocationCount: <FaChartPie className="text-pink-500 text-2xl" />,
  totalMonthCollection: <FaDollarSign className="text-indigo-500 text-2xl" />,
};

const Reports = ({ darkMode }) => {
  const [processData, setProcessData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(true);
  const [error, setError] = useState(null);

  // Date range state
  const [dateRange, setDateRange] = useState({
    startDate: getFirstDayOfMonth(),
    endDate: getToday(),
  });

  // Helper functions for dates
  function getFirstDayOfMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1)
      .toISOString()
      .split("T")[0];
  }

  function getToday() {
    return new Date().toISOString().split("T")[0];
  }

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://phdashboard-backend.onrender.com/ph/api/dashboarddata",
        {
          params: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          },
        }
      );
      setProcessData(response.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Removed the useEffect that automatically fetches data on dateRange change

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    // Validation
    if (name === "endDate" && new Date(value) < new Date(dateRange.startDate)) {
      setError("End date cannot be before start date");
      return;
    }

    setError(null);
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetToCurrentMonth = () => {
    setDateRange({
      startDate: getFirstDayOfMonth(),
      endDate: getToday(),
    });
    // Don't fetch automatically here either
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Process Reports
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg border dark:border-gray-600">
              <FaCalendarAlt className="text-gray-500 dark:text-gray-400" />
              <input
                type="date"
                name="startDate"
                value={dateRange.startDate}
                onChange={handleDateChange}
                className="bg-transparent border-none focus:outline-none text-sm dark:text-white"
              />
            </div>

            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg border dark:border-gray-600">
              <FaCalendarAlt className="text-gray-500 dark:text-gray-400" />
              <input
                type="date"
                name="endDate"
                value={dateRange.endDate}
                onChange={handleDateChange}
                className="bg-transparent border-none focus:outline-none text-sm dark:text-white"
                min={dateRange.startDate}
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={resetToCurrentMonth}
                className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-2 rounded-lg transition text-sm"
              >
                <span>This Month</span>
              </button>

              <button
                onClick={fetchReports}
                disabled={loading}
                className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition disabled:opacity-50"
              >
                <FaSync className={`${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : showData && processData.length > 0 ? (
          <div className="space-y-12 max-w-7xl mx-auto">
            {processData.map((process, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-700 p-6"
              >
                <h3 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 border-b pb-2 dark:border-gray-700">
                  {process.name} Process
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="bg-indigo-50 dark:bg-gray-800 rounded-lg border dark:border-gray-600 p-5 flex items-center space-x-4">
                    <FaUserTie className="text-indigo-500 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total AMs
                      </p>
                      <p className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                        {process.AMs}
                      </p>
                    </div>
                  </div>
                  <div className="bg-indigo-50 dark:bg-gray-800 rounded-lg border dark:border-gray-600 p-5 flex items-center space-x-4">
                    <FaUserFriends className="text-indigo-500 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total TLs
                      </p>
                      <p className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                        {process.TLs}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Object.entries(process.stats).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-600 shadow-sm hover:shadow-md p-5 transition transform hover:-translate-y-1"
                    >
                      <div className="flex items-center space-x-4">
                        <div>{icons[key]}</div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {formatLabel(key)}
                          </p>
                          <p className="text-xl font-bold text-gray-800 dark:text-white">
                            {value}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No data available. Select dates and click Refresh to load data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export default Reports;
