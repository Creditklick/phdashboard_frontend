import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Attendance({ darkmode, distuser }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const [attendanceData, setAttendanceData] = useState([]);
  const [datewiseStats, setDatewiseStats] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [filters, setFilters] = useState({ process: "", am: "" });
  const [processList, setProcessList] = useState([]);
  const [amList, setAmList] = useState([]);
  const [currentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear] = useState(new Date().getFullYear());

  // Fetch distinct filter values
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get(
          "https://phdashboard-backend.onrender.com/ph/api/attendance/getdistint"
        );
        setProcessList(res.data.processes);
        setAmList(res.data.ams);
      } catch (err) {
        console.error("Error loading filter lists", err);
      }
    };
    fetchFilters();
  }, []);

  const getAttendance = async (filters) => {
    try {
      const params = {};
      if (filters.process) params.process = filters.process;
      if (filters.am) params.am = filters.am;

      const res = await axios.get(
        "https://phdashboard-backend.onrender.com/ph/api/attendance/getdata",
        {
          params: {
            am: params.am,
            process: params.process,
          },
        }
      );

      // Check if response has no data
      if (!res.data.data && res.data.success === true) {
        setAttendanceData([]);
        setDatewiseStats([]);
        return;
      }

      // Handle both array and single object responses
      const responseData = res.data.success ? res.data.data : res.data;

      // If responseData is empty or just {success: true}
      if (
        !responseData ||
        (typeof responseData === "object" &&
          Object.keys(responseData).length === 0)
      ) {
        setAttendanceData([]);
        setDatewiseStats([]);
        return;
      }

      const dataToProcess = Array.isArray(responseData)
        ? responseData
        : [responseData];

      const latest = getLatestRecordsByEmployee(dataToProcess);
      setAttendanceData(latest);
      calculateDatewiseStats(latest);
    } catch (err) {
      console.error("Error fetching attendance", err);
      setAttendanceData([]);
      setDatewiseStats([]);
    }
  };

  useEffect(() => {
    if (filters.process || filters.am) {
      getAttendance(filters);
    } else {
      setAttendanceData([]);
      setDatewiseStats([]);
    }
  }, [filters]);

  // ... rest of your component code remains the same ...

  const calculateDatewiseStats = (data) => {
    if (!data || data.length === 0) {
      setDatewiseStats([]);
      return;
    }

    const stats = days.map((day) => {
      let present = 0,
        absent = 0;
      data.forEach((emp) => {
        const recs = emp.attendance_records
          ? emp.attendance_records.split(",")
          : [];
        if (day <= recs.length) {
          present += recs[day - 1] === "P" ? 1 : 0;
          absent += recs[day - 1] === "A" ? 1 : 0;
        }
      });
      return {
        day,
        date: new Date(currentYear, currentMonth - 1, day).toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric" }
        ),
        present,
        absent,
      };
    });
    setDatewiseStats(stats);
  };

  const getLatestRecordsByEmployee = (data) => {
    const dataArray = Array.isArray(data) ? data : [data];
    const map = new Map();
    dataArray.forEach((e) => {
      const prev = map.get(e.emp_code);
      if (!prev || new Date(e.upload_date) > new Date(prev.upload_date)) {
        map.set(e.emp_code, e);
      }
    });
    return Array.from(map.values());
  };

  const countStatus = (recs, s) => recs.filter((r) => r === s).length;

  const handleExport = () => {
    if (attendanceData.length === 0) return;

    const wb = XLSX.utils.book_new();
    const excelData = attendanceData.map((emp, i) => {
      const recs = emp.attendance_records
        ? emp.attendance_records.split(",")
        : [];
      return {
        "S.No": i + 1,
        "Emp. Code": emp.emp_code,
        "Emp. Name": emp.emp_name,
        ...days.reduce(
          (a, d, idx) => ((a[`Day ${d}`] = recs[idx] || "-"), a),
          {}
        ),
        "Total Present": countStatus(recs, "P"),
        "Total Absent": countStatus(recs, "A"),
      };
    });
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, "attendance_report.xlsx");
  };

  const toggleView = () => setShowGraph((prev) => !prev);

  const chartData = {
    labels: datewiseStats.map((s) => s.date),
    datasets: [
      {
        label: "Present",
        data: datewiseStats.map((s) => s.present),
        backgroundColor: darkmode
          ? "rgba(74,222,128,0.7)"
          : "rgba(74,222,128,0.5)",
        borderColor: "rgba(74,222,128,1)",
        borderWidth: 1,
      },
      {
        label: "Absent",
        data: datewiseStats.map((s) => s.absent),
        backgroundColor: darkmode
          ? "rgba(248,113,113,0.7)"
          : "rgba(248,113,113,0.5)",
        borderColor: "rgba(248,113,113,1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: darkmode ? "#f3f4f6" : "#111827" },
      },
      title: {
        display: true,
        text: `Daily Attendance - ${new Date(
          currentYear,
          currentMonth - 1
        ).toLocaleDateString("en-US", { month: "long", year: "numeric" })}`,
        color: darkmode ? "#f3f4f6" : "#111827",
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkmode ? "#f3f4f6" : "#111827",
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: darkmode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        },
      },
      y: {
        beginAtZero: true,
        max:
          Math.max(...datewiseStats.map((s) => Math.max(s.present, s.absent))) +
          1,
        ticks: {
          stepSize: 1,
          precision: 0,
          color: darkmode ? "#f3f4f6" : "#111827",
        },
        grid: {
          color: darkmode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        },
      },
    },
  };

  const classes = {
    container: darkmode
      ? "bg-gray-900 text-gray-100"
      : "bg-white text-gray-800",
    table: darkmode
      ? "bg-gray-800 text-gray-100 border-gray-600"
      : "bg-white text-gray-800 border-gray-300",
    header: darkmode
      ? "bg-gray-700 border-gray-600"
      : "bg-gray-100 border-gray-300",
    cell: darkmode ? "border-gray-600" : "border-gray-300",
    present: darkmode ? "text-green-400" : "text-green-700",
    absent: darkmode ? "text-red-400" : "text-red-700",
    button: darkmode
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-blue-500 hover:bg-blue-600 text-white",
    toggle: darkmode
      ? "bg-purple-600 hover:bg-purple-700 text-white"
      : "bg-purple-500 hover:bg-purple-600 text-white",
  };

  return (
    <div className="p-6 grid md:grid-col-1 lg:grid-col-1">
      <div
        className={`p-6 overflow-x-auto max-w-[1200px] ${classes.container}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Attendance Tracking</h2>
          <div className="flex gap-2">
            <button
              onClick={toggleView}
              className={`px-4 py-2 rounded-md font-medium ${classes.toggle}`}
            >
              {showGraph ? "Show Table" : "View Graph"}
            </button>
            {!showGraph && attendanceData.length > 0 && (
              <button
                onClick={handleExport}
                className={`px-4 py-2 rounded-md font-medium ${classes.button}`}
              >
                Export to Excel
              </button>
            )}
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <select
            className="border rounded-lg p-2 w-full"
            value={filters.process}
            onChange={(e) =>
              setFilters((f) => ({ ...f, process: e.target.value }))
            }
          >
            <option value="">Select PROCESS</option>
            {processList.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select
            className="border rounded-lg p-2 w-full"
            value={filters.am}
            onChange={(e) => setFilters((f) => ({ ...f, am: e.target.value }))}
          >
            <option value="">Select AM</option>
            {amList.map((a, i) => (
              <option key={i} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {showGraph ? (
          <div className={`mb-6 p-4 rounded shadow ${classes.table}`}>
            <h2 className="text-xl font-bold mb-4">
              📊 Daily Attendance Overview
            </h2>
            <div className="h-[500px] w-full">
              {datewiseStats.length > 0 ? (
                <Bar data={chartData} options={chartOptions} />
              ) : (
                <p className="text-center py-10">
                  No data available for the selected filters
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className={`p-4 rounded shadow overflow-auto ${classes.table}`}>
            <h2 className="text-xl font-bold mb-4">🕒 Monthly Attendance</h2>
            {attendanceData.length > 0 ? (
              <table
                className={`min-w-max border border-collapse text-sm ${classes.table}`}
              >
                <thead>
                  <tr className={classes.header}>
                    <th className={`border px-2 py-1 ${classes.cell}`}>S.No</th>
                    <th className={`border px-2 py-1 ${classes.cell}`}>
                      Emp. Code
                    </th>
                    <th className={`border px-2 py-1 ${classes.cell}`}>
                      Emp. Name
                    </th>
                    {days.map((d) => (
                      <th
                        key={d}
                        className={`border px-2 py-1 text-center ${classes.cell}`}
                      >
                        {d}
                      </th>
                    ))}
                    <th className={`border px-2 py-1 ${classes.present}`}>
                      Total P
                    </th>
                    <th className={`border px-2 py-1 ${classes.absent}`}>
                      Total A
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((emp, idx) => {
                    const recs = emp.attendance_records
                      ? emp.attendance_records.split(",")
                      : [];
                    return (
                      <tr
                        key={emp.id || idx}
                        className={
                          idx % 2
                            ? darkmode
                              ? "bg-gray-700"
                              : "bg-gray-50"
                            : darkmode
                            ? "bg-gray-800"
                            : "bg-white"
                        }
                      >
                        <td
                          className={`border px-2 py-1 text-center ${classes.cell}`}
                        >
                          {idx + 1}
                        </td>
                        <td
                          className={`border px-2 py-1 font-medium ${classes.cell}`}
                        >
                          {emp.emp_code}
                        </td>
                        <td
                          className={`border px-2 py-1 font-medium ${classes.cell}`}
                        >
                          {emp.emp_name}
                        </td>
                        {days.map((_, i) => (
                          <td
                            key={i}
                            className={`border px-2 py-1 text-center ${
                              classes.cell
                            } ${
                              recs[i] === "P"
                                ? classes.present
                                : recs[i] === "A"
                                ? classes.absent
                                : ""
                            }`}
                          >
                            {recs[i] || "-"}
                          </td>
                        ))}
                        <td
                          className={`border px-2 py-1 text-center font-bold ${classes.present}`}
                        >
                          {countStatus(recs, "P")}
                        </td>
                        <td
                          className={`border px-2 py-1 text-center font-bold ${classes.absent}`}
                        >
                          {countStatus(recs, "A")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-10">
                No attendance data available for the selected filters
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
