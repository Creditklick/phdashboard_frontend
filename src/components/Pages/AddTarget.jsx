import React, { useState } from "react";
import axios from "axios";
import {
  UploadCloud,
  Loader2,
  FileText,
  X,
  CheckCircle,
  Calendar,
  ChevronDown,
} from "lucide-react";

function AddTarget() {
  const [formData, setFormData] = useState({
    month: "",
    year: "2025",
    file: null,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [darkMode] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2025", "2026", "2027", "2028", "2029", "2030"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check for allowed file types
      const allowedTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
        "application/csv",
        "text/x-csv",
        "application/x-csv",
        "text/comma-separated-values",
        "text/x-comma-separated-values",
      ];

      if (
        allowedTypes.includes(selectedFile.type) ||
        selectedFile.name.endsWith(".csv") ||
        selectedFile.name.endsWith(".xls") ||
        selectedFile.name.endsWith(".xlsx")
      ) {
        setFormData((prev) => ({ ...prev, file: selectedFile }));
        setMessage({ text: "", type: "" });
      } else {
        setMessage({
          text: "Please upload only Excel or CSV files",
          type: "error",
        });
      }
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, file: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.month || !formData.year || !formData.file) {
      setMessage({
        text: "Please select month, year and upload a file",
        type: "error",
      });
      return;
    }

    const formPayload = new FormData();
    formPayload.append("month", formData.month);
    formPayload.append("year", formData.year);
    formPayload.append("file", formData.file);

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      await axios.post(
        "https://phdashboard-backend.onrender.com/ph/api/member/uplaod/target/agentwise",
        formPayload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage({
        text: "File uploaded successfully!",
        type: "success",
      });
      setFormData({
        month: "",
        year: "2025",
        file: null,
      });
    } catch (error) {
      console.error("Upload error:", error);
      const errorMsg =
        error.response?.data?.message ||
        "File upload failed. Please try again.";
      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const bgColor = darkMode ? "bg-gray-900" : "bg-white";
  const textColor = darkMode ? "text-gray-100" : "text-gray-800";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const inputBg = darkMode ? "bg-gray-700" : "bg-gray-50";

  return (
    <div className={`p-4 md:p-8 mx-auto ${bgColor} ${textColor} min-h-screen`}>
      <div
        className={`border ${borderColor} p-6 md:p-8 rounded-2xl shadow-xl max-w-2xl mx-auto mb-8 ${cardBg} transition-all duration-300 hover:shadow-2xl`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-400">
            <UploadCloud size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-indigo-400">
              Upload Target Data
            </h2>
            <p className="text-sm text-gray-500">
              Select period and upload your file
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <label
                htmlFor="month"
                className="block text-sm font-medium mb-1 text-gray-600"
              >
                <Calendar className="inline mr-2 w-4 h-4" />
                Select Month
              </label>
              <div className="relative">
                <select
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border ${borderColor} ${inputBg} appearance-none pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  required
                >
                  <option value="">-- Select Month --</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="year"
                className="block text-sm font-medium mb-1 text-gray-600"
              >
                <Calendar className="inline mr-2 w-4 h-4" />
                Select Year
              </label>
              <div className="relative">
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border ${borderColor} ${inputBg} appearance-none pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  required
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600">
              <FileText className="inline mr-2 w-4 h-4" />
              Upload File
            </label>
            <div
              className={`relative border-2 border-dashed ${borderColor} rounded-xl p-6 text-center transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50/30`}
            >
              <input
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileChange}
                className="opacity-0 absolute inset-0 z-50 w-full h-full cursor-pointer"
                required
              />
              {formData.file ? (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg w-full max-w-md">
                    <FileText className="text-indigo-600 flex-shrink-0" />
                    <span className="truncate flex-grow text-sm">
                      {formData.file.name}
                    </span>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                      aria-label="Remove file"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <span className="mt-2 text-xs text-green-600">
                    File selected and ready to upload
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <UploadCloud className="w-10 h-10 text-indigo-400" />
                  <div>
                    <p className="text-sm font-medium">
                      Drag and drop or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Supports CSV, XLS, XLSX (Max 10MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-medium py-3.5 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 shadow-md hover:shadow-lg ${
              loading ? "opacity-80" : ""
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <UploadCloud size={18} />
                <span>Upload File</span>
              </>
            )}
          </button>

          {message.text && (
            <div
              className={`p-4 rounded-lg mt-6 text-center font-medium text-sm border ${
                message.type === "success"
                  ? "bg-green-50/80 border-green-200 text-green-700"
                  : "bg-red-50/80 border-red-200 text-red-700"
              }`}
            >
              {message.type === "success" ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>File uploaded successfully!</span>
                </div>
              ) : (
                message.text
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddTarget;
