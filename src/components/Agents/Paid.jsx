import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { UploadCloud, FileText, UserCheck, Clock } from 'lucide-react';

const Paid = ({ darkMode }) => {
  const [paidFile, setPaidFile] = useState(null);
  const [selectedProcess, setSelectedProcess] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPaidData, setShowPaidData] = useState(false);
  const [paidData, setPaidData] = useState([]);

  const teamLeaders = [
    'axis_loan',
    'axis_npa',
    'axis_card',
    'city_paid',
    'encore_paid',
    'iifl_paid',
    'sbi_recovery_paid',
  ];

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
  const tableClasses = darkMode
    ? 'bg-gray-800 text-gray-100 border-gray-600'
    : 'bg-white text-gray-800 border-gray-300';
  const headerClasses = darkMode
    ? 'bg-gray-700 border-gray-600'
    : 'bg-gray-100 border-gray-300';
  const cellClasses = darkMode ? 'border-gray-600' : 'border-gray-300';

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setPaidFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setPaidData(jsonData);
        setShowPaidData(true);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleSubmit = async () => {
    if (!paidFile || !selectedProcess) {
      setMessage('❌ Please select both a process and a file');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', paidFile);
    formData.append('Process', selectedProcess);

    try {
      await axios.post('https://phdashboard-backend.onrender.com/ph/api/agent/targetfile/upload', formData);
      setMessage('✅ File uploaded successfully');
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 md:p-10 mx-auto ${bgColor} ${textColor} min-h-screen`}>
      <div
        className={`border p-8 rounded-2xl shadow-lg max-w-3xl mx-auto mb-8 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <UploadCloud className="text-indigo-500" size={32} />
          <h2 className="text-2xl font-bold text-indigo-400">Upload Paid File</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-1 flex items-center gap-1">
              <UserCheck className="w-4 h-4" /> Select Process
            </label>
            <select
              value={selectedProcess}
              onChange={(e) => setSelectedProcess(e.target.value)}
              className={`w-full p-2 rounded-lg border ${
                darkMode ? 'border-gray-600' : 'border-gray-300'
              } bg-transparent`}
            >
              <option value="">-- Select Process --</option>
              {teamLeaders.map((tl) => (
                <option key={tl} value={tl} className={darkMode ? 'text-black' : ''}>
                  {tl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">📄 Paid File</label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-4 ${
                darkMode ? 'border-gray-600' : 'border-gray-300'
              } hover:border-indigo-500 transition`}
            >
              <input
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileChange}
                className="opacity-0 absolute inset-0 z-50 cursor-pointer"
              />
              <div className="flex items-center gap-3 text-sm">
                <FileText />
                <span>{paidFile ? paidFile.name : 'Choose paid file (.csv, .xls, .xlsx)'}</span>
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

            <button
              onClick={() => setShowPaidData(!showPaidData)}
              className="flex-1 mt-4 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2.5 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <Clock size={18} /> {showPaidData ? 'Hide Paid Data' : 'View Paid Data'}
            </button>
          </div>

          {message && (
            <div
              className={`text-center font-medium text-sm mt-4 ${
                message.includes('✅') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>

      {showPaidData && paidData.length > 0 && (
        <div className={`p-4 rounded shadow overflow-auto ${tableClasses} mt-8`}>
          <h2
            className={`text-xl font-bold mb-4 flex items-center gap-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            <Clock size={20} /> Uploaded Paid Data
          </h2>
          <div className="overflow-x-auto">
            <table className={`min-w-max border border-collapse text-sm ${tableClasses}`}>
              <thead>
                <tr className={headerClasses}>
                  <th className={`border px-2 py-1 ${cellClasses}`}>S.No</th>
                  {Object.keys(paidData[0]).map((key) => (
                    <th key={key} className={`border px-2 py-1 ${cellClasses}`}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paidData.map((row, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? darkMode
                          ? 'bg-gray-800'
                          : 'bg-white'
                        : darkMode
                        ? 'bg-gray-700'
                        : 'bg-gray-50'
                    }
                  >
                    <td className={`border px-2 py-1 text-center ${cellClasses}`}>
                      {index + 1}
                    </td>
                    {Object.values(row).map((value, i) => (
                      <td
                        key={i}
                        className={`border px-2 py-1 text-center ${cellClasses}`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paid;
