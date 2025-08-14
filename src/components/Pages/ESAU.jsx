import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";

function ESAU({ darkMode = false }) {
  const processList = [
    "axis_loan",
    "axis_npa",
    "axis_card",
    "city_paid",
    "encore_paid",
    "iifl_paid",
    "sbi_recovery_paid",
  ];

  const [filters, setFilters] = useState({
    process: "",
    am: "",
    tl: "",
    esau: "",
    startDate: "",
    endDate: "",
  });

  const [esauData, setEsauData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get unique AMs and TLs from fetched data
  const uniqueAMs = useMemo(() => {
    const ams = new Set();
    esauData.forEach((item) => item.am && ams.add(item.am));
    return Array.from(ams).sort();
  }, [esauData]);

  const uniqueTLs = useMemo(() => {
    const tls = new Set();
    esauData.forEach((item) => item.teamleader && tls.add(item.teamleader));
    return Array.from(tls).sort();
  }, [esauData]);

  // Map ESAU status to human-readable format
  const getESAUStatusString = (status) => {
    switch (status) {
      case "U":
        return "Under Performer";
      case "S":
        return "Satisfactory";
      case "A":
        return "Average Performer";
      case "E":
        return "Excellent Performer";
      case "O":
        return "Over Achiever";
      default:
        return status;
    }
  };

  // Handle data fetching
  const handleData = async () => {
    if (!filters.process || !filters.startDate || !filters.endDate) {
      setError("Please select Process, Start Date, and End Date");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.get("http://local/ph/api/esau/target", {
        params: {
          process: filters.process,
          startDate: filters.startDate,
          endDate: filters.endDate,
        },
      });

      if (response.data?.success) {
        setEsauData(response.data.data);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      setError("Error fetching data: " + (err.message || "Server error"));
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to data
  const filteredData = useMemo(() => {
    return esauData.filter((item) => {
      // AM filter
      if (filters.am && item.am !== filters.am) return false;

      // TL filter
      if (filters.tl && item.teamleader !== filters.tl) return false;

      // ESAU filter
      if (filters.esau) {
        const statusMap = {
          "Under Performer": "U",
          Satisfactory: "S",
          "Average Performer": "A",
          "Excellent Performer": "E",
          "Over Achiever": "O",
        };

        if (item.esau_status !== statusMap[filters.esau]) return false;
      }

      return true;
    });
  }, [esauData, filters]);

  // Theme variables
  const bgColor = darkMode ? "bg-gray-900" : "bg-white";
  const textColor = darkMode ? "text-gray-100" : "text-gray-800";
  const headerBgColor = darkMode ? "bg-gray-800" : "bg-gray-100";
  const headerTextColor = darkMode ? "text-gray-200" : "text-gray-700";
  const hoverBgColor = darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-300";
  const selectBgColor = darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-800";
  const rowBgColor = darkMode ? "bg-gray-800" : "bg-white";
  const statusColors = {
    U: darkMode ? "bg-red-900" : "bg-red-200",
    S: darkMode ? "bg-yellow-900" : "bg-yellow-200",
    A: darkMode ? "bg-blue-900" : "bg-blue-200",
    E: darkMode ? "bg-green-900" : "bg-green-200",
    O: darkMode ? "bg-purple-900" : "bg-purple-200",
  };

  return (
    <div className={`p-6 min-h-screen ${bgColor} ${textColor}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">ESAU Dashboard</h2>
        <button
          onClick={handleData}
          disabled={loading}
          className={`px-4 py-2 rounded-lg cursor-pointer shadow transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : darkMode
              ? "bg-amber-600 hover:bg-amber-700"
              : "bg-amber-400 hover:bg-amber-500"
          } text-white font-medium`}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>

      {error && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            darkMode ? "bg-red-800 text-red-100" : "bg-red-200 text-red-800"
          }`}
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
        <div>
          <span className="block mb-1 text-sm">Select Process</span>
          <select
            value={filters.process}
            onChange={(e) =>
              setFilters({ ...filters, process: e.target.value })
            }
            className={`border ${borderColor} rounded-lg p-2 w-full ${selectBgColor}`}
          >
            <option value="">Select PROCESS</option>
            {processList.map((process, index) => (
              <option key={index} value={process}>
                {process}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="block mb-1 text-sm">From</span>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
            className={`border ${borderColor} rounded-lg p-2 w-full ${selectBgColor}`}
          />
        </div>

        <div>
          <span className="block mb-1 text-sm">To</span>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
            className={`border ${borderColor} rounded-lg p-2 w-full ${selectBgColor}`}
          />
        </div>

        <div>
          <span className="block mb-1 text-sm">Select AM</span>
          <select
            value={filters.am}
            onChange={(e) => setFilters({ ...filters, am: e.target.value })}
            className={`border ${borderColor} rounded-lg p-2 w-full ${selectBgColor}`}
            disabled={uniqueAMs.length === 0}
          >
            <option value="">All AMs</option>
            {uniqueAMs.map((am, index) => (
              <option key={index} value={am}>
                {am}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="block mb-1 text-sm">Select TL</span>
          <select
            value={filters.tl}
            onChange={(e) => setFilters({ ...filters, tl: e.target.value })}
            className={`border ${borderColor} rounded-lg p-2 w-full ${selectBgColor}`}
            disabled={uniqueTLs.length === 0}
          >
            <option value="">All TLs</option>
            {uniqueTLs.map((tl, index) => (
              <option key={index} value={tl}>
                {tl}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="block mb-1 text-sm">Filter ESAU</span>
          <select
            value={filters.esau}
            onChange={(e) => setFilters({ ...filters, esau: e.target.value })}
            className={`border ${borderColor} rounded-lg p-2 w-full ${selectBgColor}`}
          >
            <option value="">All Statuses</option>
            <option value="Under Performer">Under Performer</option>
            <option value="Satisfactory">Satisfactory</option>
            <option value="Average Performer">Average Performer</option>
            <option value="Excellent Performer">Excellent Performer</option>
            <option value="Over Achiever">Over Achiever</option>
          </select>
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full">
            <thead className={`${headerBgColor} ${headerTextColor}`}>
              <tr>
                <th className="p-3 text-left">Agent Code</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">AM</th>
                <th className="p-3 text-left">TL</th>
                <th className="p-3 text-left">Process</th>
                <th className="p-3 text-right">Target</th>
                <th className="p-3 text-right">Collected</th>
                <th className="p-3 text-right">Remaining</th>
                <th className="p-3 text-right">Achieved</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-left">Dates</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((agent, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? rowBgColor : headerBgColor
                  } border-b ${borderColor}`}
                >
                  <td className="p-3">{agent.agent_code}</td>
                  <td className="p-3">{agent.emp_name}</td>
                  <td className="p-3">{agent.am}</td>
                  <td className="p-3">{agent.teamleader || "N/A"}</td>
                  <td className="p-3">{agent.process}</td>
                  <td className="p-3 text-right">
                    ₹{agent.target.toLocaleString()}
                  </td>
                  <td className="p-3 text-right">
                    ₹{agent.total_collected.toLocaleString()}
                  </td>
                  <td className="p-3 text-right">
                    ₹{Math.abs(agent.rest).toLocaleString()}
                  </td>
                  <td className="p-3 text-right">{agent.percentage}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusColors[agent.esau_status] || "bg-gray-200"
                      }`}
                    >
                      {getESAUStatusString(agent.esau_status)}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="group relative inline-block">
                      <span className="cursor-pointer underline text-blue-500">
                        {agent.dates.length} days
                      </span>
                      <div
                        className={`absolute hidden group-hover:block z-10 p-2 rounded shadow-lg min-w-max ${
                          darkMode ? "bg-gray-800" : "bg-white"
                        } border ${borderColor}`}
                      >
                        <div className="font-semibold mb-1">
                          Collection Dates:
                        </div>
                        <div className="max-h-40 overflow-y-auto">
                          {agent.dates.join(", ")}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={`text-center py-8 rounded-lg border ${borderColor}`}>
          {loading
            ? "Loading data..."
            : "No data available. Submit your query to see results."}
        </div>
      )}
    </div>
  );
}

export default ESAU;
