import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, FileText, UserCheck } from 'lucide-react';

const UploadFiles = () => {
  const [attendanceFile, setAttendanceFile] = useState(null);
  const [paidFile, setPaidFile] = useState(null);
  const [selectedTL, setSelectedTL] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const teamLeaders = ['TL1', 'TL2', 'TL3', 'TL4']; // You can also fetch this dynamically from your backend

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'attendance') setAttendanceFile(file);
    else setPaidFile(file);
  };

  const handleSubmit = async () => {
    if (!attendanceFile || !paidFile || !selectedTL) {
      setMessage('⚠️ Please select TL and both files before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('attendance', attendanceFile);
    formData.append('paid', paidFile);
    formData.append('tl', selectedTL); // Attach TL info to the upload

    try {
      setLoading(true);
      await axios.post('https://phdashboard-backend.onrender.com/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('✅ Files uploaded successfully!');
      setAttendanceFile(null);
      setPaidFile(null);
      setSelectedTL('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <UploadCloud className="text-indigo-600" size={32} />
          <h2 className="text-2xl font-bold text-indigo-700">Upload Attendance & Paid Files</h2>
        </div>

        <div className="space-y-6">
          {/* TL Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
              <UserCheck className="w-4 h-4" /> Select Team Leader (TL)
            </label>
            <select
              value={selectedTL}
              onChange={(e) => setSelectedTL(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              <option value="">-- Select TL --</option>
              {teamLeaders.map((tl) => (
                <option key={tl} value={tl}>
                  {tl}
                </option>
              ))}
            </select>
          </div>

          {/* Attendance File Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">📄 Attendance File</label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-indigo-400 transition">
              <input
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={(e) => handleFileChange(e, 'attendance')}
                className="opacity-0 absolute inset-0 z-50 cursor-pointer"
              />
              <div className="flex items-center gap-3 text-gray-600">
                <FileText />
                <span className="text-sm">
                  {attendanceFile ? attendanceFile.name : 'Choose attendance file (.csv, .xls, .xlsx)'}
                </span>
              </div>
            </div>
          </div>

          {/* Paid File Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">📄 Paid File</label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-indigo-400 transition">
              <input
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={(e) => handleFileChange(e, 'paid')}
                className="opacity-0 absolute inset-0 z-50 cursor-pointer"
              />
              <div className="flex items-center gap-3 text-gray-600">
                <FileText />
                <span className="text-sm">
                  {paidFile ? paidFile.name : 'Choose paid file (.csv, .xls, .xlsx)'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition duration-300"
          >
            {loading ? 'Uploading...' : 'Upload Files'}
          </button>

          {message && (
            <div
              className={`text-center font-medium text-sm mt-4 ${
                message.includes('✅') ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadFiles;
