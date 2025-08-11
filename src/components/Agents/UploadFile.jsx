import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { UploadCloud, FileText, UserCheck, Clock } from 'lucide-react';

const UploadFile = ({ darkMode }) => {
  const [attendanceFile, setAttendanceFile] = useState(null);
  const [selectedTL, setSelectedTL] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);



  const [attendanceData, setAttendanceData] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);


  

  const teamLeaders = ['credit_card', 'axis_loan', 'axis_npa', 'city_paid','encore_paid','iifl_paid','sbi_recovery_paid'];

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('https://phdashboard-backend.onrender.com/ph/api/attendance/getdata');                                                                                                                                                                                                                        
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const handleFileChange = (e) => {
    setAttendanceFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!attendanceFile || !selectedTL) {
      setMessage('⚠️ Please select TL and attendance file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('attendance', attendanceFile);
    formData.append('tl', selectedTL);

    try {
      setLoading(true);
      const response = await axios.post('https://phdashboard-backend.onrender.com/ph/api/attendance/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('✅ Files uploaded successfully!');
      setAttendanceFile(null);
      setSelectedTL('');
      setAttendanceData(response.data.data);
    } catch (error) {
      console.error(error);
      setMessage('❌ Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
  const tableClasses = darkMode ? 'bg-gray-800 text-gray-100 border-gray-600' : 'bg-white text-gray-800 border-gray-300';
  const headerClasses = darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300';
  const cellClasses = darkMode ? 'border-gray-600' : 'border-gray-300';
  const presentClasses = darkMode ? 'text-green-400' : 'text-green-700';
  const absentClasses = darkMode ? 'text-red-400' : 'text-red-700';

  const countStatus = (records, status) => records.filter(r => r === status).length;

  return (
    <div className={`p-6 md:p-10 mx-auto ${bgColor} ${textColor} min-h-screen`}>
      <div className={`border p-8 rounded-2xl shadow-lg max-w-3xl mx-auto mb-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-6">
          <UploadCloud className="text-indigo-500" size={32} />
          <h2 className="text-2xl font-bold text-indigo-400">Upload Attendance File</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-1 flex items-center gap-1">
              <UserCheck className="w-4 h-4" /> Select Process (Process)
            </label>
            <select
              value={selectedTL}
              onChange={(e) => setSelectedTL(e.target.value)}
              className={`w-full p-2 rounded-lg border ${darkMode ? 'border-gray-600' : 'border-gray-300'} bg-transparent`}
            >
              <option value="">-- Select Process --</option>
              {teamLeaders.map((tl) => (
                <option key={tl} value={tl} className={darkMode ? 'text-black' : ''}>{tl}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">📄 Attendance File</label>
            <div className={`relative border-2 border-dashed rounded-xl p-4 ${darkMode ? 'border-gray-600' : 'border-gray-300'} hover:border-indigo-500 transition`}>
              <input
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileChange}
                className="opacity-0 absolute inset-0 z-50 cursor-pointer"
              />
              <div className="flex items-center gap-3 text-sm">
                <FileText />
                <span>{attendanceFile ? attendanceFile.name : 'Choose attendance file (.csv, .xls, .xlsx)'}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition duration-300"
            >
              {loading ? 'Uploading...' : 'Upload File'}
            </button>

          
          </div>

          {message && (
            <div className={`text-center font-medium text-sm mt-4 ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>{message}</div>
          )}
        </div>
      </div>

     
    </div>
  );
};

export default UploadFile;



































