// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function AddTarget() {
//   const [formData, setFormData] = useState({
//     process: '',
//     am: '',
//     targetValue: '',
//     month: '',
//     year: ''
//   });

//   const [entries, setEntries] = useState([]);
//   const [listdata, setListData] = useState([]);
//   const [message, setMessage] = useState('');
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://phdashboard-backend.onrender.com/ph/api/target/data');
//         console.log("Add Target Response data is ",response.data);
//         setListData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching process/AM:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const uniqueProcesses = [...new Set(listdata.map(item => item.Process))];
//   const filteredAms = listdata
//     .filter(item => item.Process === formData.process)
//     .map(item => item.AM);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAddEntry = () => {
//     const { process, am, targetValue, month , year} = formData;


//     console.log("form data is ",formData);

//     if (!process || !am || !targetValue || !month || !year) {
//       setMessage('Please fill all fields');
//       setIsError(true);
//       return;
//     }

//     // Prevent duplicate Process+AM+Month+Year entries
//     const duplicate = entries.some(entry =>
//       entry.processName === process &&
//       entry.amName === am 
    
//     //   &&
//     //   entry.month === month &&
//     //   entry.year === year



//     );

//     console.log("Total Duplications ",duplicate);

//     if (duplicate) {
//       setMessage('Duplicate entry for same Process, AM, Month, and Year');
//       setIsError(true);
//       return;
//     }

//      const formattedMonth = `${month.slice(0, 3)}-${year.toString()}`;

//     const newEntry = {
//       id: Date.now(),
//       processName: process,
//       amName: am,
//       targetValue,
//       month: formattedMonth,
      
//     };




//     setEntries([...entries, newEntry]);
//     setFormData({ process, am: '', targetValue: '', month: '', year: '' });
//     setMessage('Entry added');
//     setIsError(false);
//   };

//   const handleRemoveEntry = (id) => {
//     setEntries(entries.filter(entry => entry.id !== id));
//   };

//   const handleSubmit = async () => {
    
//     if (entries.length === 0) {
//       setMessage('No entries to submit');
//       setIsError(true);
//       return;
//     }


//     console.log("Entires is ",entries);


//     try {
//          console.log("Hnadle Submit",entries);
//         await axios.post('https://phdashboard-backend.onrender.com/ph/api/saveTargetToAgentRecovery', entries);
//       setMessage('Targets saved successfully!'); 
//       setEntries([]);
//       setFormData({ process: '', am: '', targetValue: '', month: '', year: '' });
//     } catch (error) {
//       console.error('Error saving targets:', error.message);
//       setMessage('Failed to save targets');
//       setIsError(true);
//     }
//   };

//   return (
//     <div className="p-6 w-full mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Add Targets</h1>

//       {message && (
//         <div className={`mb-4 p-3 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
//           {message}
//         </div>
//       )}

//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4">Add New Target</h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           <div>
//             <label className="block mb-1">Process</label>
//             <select
//               name="process"
//               value={formData.process}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value="">Select Process</option>
//               {uniqueProcesses.map((proc, idx) => (
//                 <option key={idx} value={proc}>{proc}</option>
//               ))}
//             </select>
//           </div>




//           <div>
//             <label className="block mb-1">AM</label>
//             <select
//               name="am"
//               value={formData.am}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               disabled={!formData.process}
//             >
//               <option value="">Select AM</option>
//               {[...new Set(filteredAms)].map((am, idx) => (
//                 <option key={idx} value={am}>{am}</option>
//               ))}
//             </select>
//           </div>

         

//           <div>
//             <label className="block mb-1">Month</label>
//             <select
//               name="month"
//               value={formData.month}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value="">Select Month</option>
//               {[
//                 'January', 'February', 'March', 'April', 'May', 'June',
//                 'July', 'August', 'September', 'October', 'November', 'December'
//               ].map((month, index) => (
//                 <option key={index} value={month}>{month}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1">Year</label>
//             <select
//               name="year"
//               value={formData.year}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value="">Select Year</option>
//               {[2024, 2025, 2026  , 2027 , 2028 , 2029 , 2030 , 2031 , 2032 , 2033 , 2034 , 2035].map((year) => (
//                 <option key={year} value={year}>{year}</option>
//               ))}
//             </select>
//           </div>

         
//              <div className='w-full'>
//             <label className="block mb-2 ">Target</label>
//             <input
//               type="number"
//               name="targetValue"
//               value={formData.targetValue}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               placeholder="Enter Target"
//               disabled={!formData.am}
//             />
//           </div>

//         </div>

        

//         <button
//           onClick={handleAddEntry}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add to List
//         </button>
//       </div>

//       {entries.length > 0 && (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Targets to be Added</h2>

//           <table className="min-w-full border text-sm">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="px-4 py-2 border">Process</th>
//                 <th className="px-4 py-2 border">AM</th>
//                 <th className="px-4 py-2 border">Target</th>
//                 <th className="px-4 py-2 border">Month</th>
//                 <th className="px-4 py-2 border">Year</th>
//                 <th className="px-4 py-2 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {entries.map(entry => (
//                 <tr key={entry.id}>
//                   <td className="px-4 py-2 border">{entry.processName}</td>
//                   <td className="px-4 py-2 border">{entry.amName}</td>
//                   <td className="px-4 py-2 border">{entry.targetValue}</td>
//                   <td className="px-4 py-2 border">{entry.month}</td>
//                   <td className="px-4 py-2 border">{entry.year}</td>
//                   <td className="px-4 py-2 border">
//                     <button onClick={() => handleRemoveEntry(entry.id)} className="text-red-600">Remove</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="mt-4 text-right">
//             <button
//               onClick={handleSubmit}
//               className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//             >
//               Save All Targets
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddTarget;













import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, Loader2, FileText, X, CheckCircle, Calendar, ChevronDown } from 'lucide-react';

function AddTarget() {
  const [formData, setFormData] = useState({
    month: '',
    year: '2025',
    file: null
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [darkMode] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const years = ['2025', '2026', '2027', '2028', '2029', '2030'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check for allowed file types
      const allowedTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'application/csv',
        'text/x-csv',
        'application/x-csv',
        'text/comma-separated-values',
        'text/x-comma-separated-values'
      ];
      
      if (allowedTypes.includes(selectedFile.type) || 
          selectedFile.name.endsWith('.csv') || 
          selectedFile.name.endsWith('.xls') || 
          selectedFile.name.endsWith('.xlsx')) {
        setFormData(prev => ({ ...prev, file: selectedFile }));
        setMessage({ text: '', type: '' });
      } else {
        setMessage({ text: 'Please upload only Excel or CSV files', type: 'error' });
      }
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.month || !formData.year || !formData.file) {
      setMessage({ text: 'Please select month, year and upload a file', type: 'error' });
      return;
    }

    const formPayload = new FormData();
    formPayload.append('month', formData.month);
    formPayload.append('year', formData.year);
    formPayload.append('file', formData.file);

    try {
      setLoading(true);
      setMessage({ text: '', type: '' });
      
      await axios.post(
        'https://phdashboard-backend.onrender.com/ph/api/member/uplaod/target/agentwise',
        formPayload,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      
      setMessage({ 
        text: 'File uploaded successfully!', 
        type: 'success' 
      });
      setFormData({
        month: '',
        year: '2025',
        file: null
      });
    } catch (error) {
      console.error('Upload error:', error);
      const errorMsg = error.response?.data?.message || 'File upload failed. Please try again.';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-gray-50';

  return (
    <div className={`p-4 md:p-8 mx-auto ${bgColor} ${textColor} min-h-screen`}>
      <div className={`border ${borderColor} p-6 md:p-8 rounded-2xl shadow-xl max-w-2xl mx-auto mb-8 ${cardBg} transition-all duration-300 hover:shadow-2xl`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-400">
            <UploadCloud size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-indigo-400">Upload Target Data</h2>
            <p className="text-sm text-gray-500">Select period and upload your file</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <label htmlFor="month" className="block text-sm font-medium mb-1 text-gray-600">
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
              <label htmlFor="year" className="block text-sm font-medium mb-1 text-gray-600">
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
            <div className={`relative border-2 border-dashed ${borderColor} rounded-xl p-6 text-center transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50/30`}>
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
                    <span className="truncate flex-grow text-sm">{formData.file.name}</span>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                      aria-label="Remove file"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <span className="mt-2 text-xs text-green-600">File selected and ready to upload</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <UploadCloud className="w-10 h-10 text-indigo-400" />
                  <div>
                    <p className="text-sm font-medium">Drag and drop or click to browse</p>
                    <p className="text-xs text-gray-500 mt-1">Supports CSV, XLS, XLSX (Max 10MB)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-medium py-3.5 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 shadow-md hover:shadow-lg ${loading ? 'opacity-80' : ''}`}
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
                message.type === 'success'
                  ? 'bg-green-50/80 border-green-200 text-green-700'
                  : 'bg-red-50/80 border-red-200 text-red-700'
              }`}
            >
              {message.type === 'success' ? (
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