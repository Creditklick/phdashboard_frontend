

// import React, { useEffect, useState, useRef } from "react";
// import { ChevronDown, X, Upload, Loader2 } from "lucide-react";
// import axios from "axios";

// // Toast component
// const MessageToast = ({ message, type, onClose }) => {
//   const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(false);
//       onClose();
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   if (!isVisible) return null;

//   return (
//     <div
//       className={`fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg text-white ${bgColor} z-[100] cursor-pointer`}
//       onClick={() => {
//         setIsVisible(false);
//         onClose();
//       }}
//       role="alert"
//       aria-live="assertive"
//     >
//       {message}
//     </div>
//   );
// };



//   const UploadModal = ({ onClose, onUploadSuccess }) => {
//     const [file, setFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');
//     const [messageType, setMessageType] = useState('');
    
//     const dateInputRef = useRef(null);
//     const [selectedDate, setSelectedDate] = useState('');

//     const handleFileChange = (e) => {
//       setFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
    
//       if (loading) return;
    
//       if (!selectedDate && !file) {
//         setMessage("Please select both a date and a file.");
//         setMessageType("error");
//         return;
//       } else if (!selectedDate) {
//         setMessage("Please select a date.");
//         setMessageType("error");
//         return;
//       } else if (!file) {
//         setMessage("Please select a file.");
//         setMessageType("error");
//         return;
//       }

//       setLoading(true);
//       setMessage(""); // Clear any previous messages

//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('date', selectedDate);

//       try {
//         // Make the actual API call
      
//         const response = await axios.post(
//     "https://phdashboard-backend.onrender.com/milestone/upload/milestones",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );
//         // Assuming your API returns an object with a message and the uploaded data
//         // For example: { message: "File uploaded successfully", data: [...] }
//         setMessage(response.data.message || "File uploaded successfully");
//         setMessageType("success");
        
//         // Call the success callback with the data from the API
//         // You may need to adjust "response.data.data" based on your API's response structure
//         if (response.data.data) {
//           onUploadSuccess(response.data.data);
//         }
        
//       } catch (error) {
//         console.error("Upload failed:", error);
//         // Check for a specific error message from the backend
//         const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
//         setMessage(errorMessage);
//         setMessageType("error");
//       } finally {
//         setLoading(false);
//         // We don't close the modal here so the user can see the message.
//         // The message will disappear automatically after a few seconds.
//       }


//       setFile('');
//       setSelectedDate('');
//     };
      
//     const handleClick = () => {
//       if (dateInputRef.current?.showPicker) {
//         dateInputRef.current.showPicker();
//       } else {
//         dateInputRef.current.click();  
//       }
//     };

//     const handleChange = (e) => {
//       setSelectedDate(e.target.value);
//     };

//     return (
//       <div
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-gray-400/30 dark:bg-gray-800/50"
//         onClick={onClose}
//       >
//         <div
//           className="bg-white dark:bg-gray-700 dark:text-gray-200 rounded-lg shadow-xl p-8 w-full max-w-md space-y-6 relative"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
//           >
//             <X size={24} />
//           </button>

//           <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">Upload Milestone Data</h2>
          
//           <div className="relative flex flex-col gap-2">
//             <button
//               onClick={handleClick}
//               className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
//             >
//               Select Date
//             </button>
//             <input
//               type="date"
//               ref={dateInputRef}
//               onChange={handleChange}
//               className="absolute opacity-0 w-0 h-0 pointer-events-none"
//             />

//             {selectedDate && (
//               <p className="mt-2 text-sm text-center text-gray-700 dark:text-gray-300">Selected: {selectedDate}</p>
//             )}
//           </div>

//           <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-8 cursor-pointer hover:border-blue-500 transition-colors">
//             <Upload className="text-blue-500 mb-2" size={48} />
//             <p className="text-gray-500 dark:text-gray-300 text-sm mb-2 text-center">Drag and drop your file here, or click to select</p>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="hidden"
//               id="file-upload"
//               accept=".xlsx, .xls"
//             />
//             <label
//               htmlFor="file-upload"
//               className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md cursor-pointer hover:bg-blue-700 transition-colors"
//             >
//               {file ? file.name : 'Choose File'}
//             </label>
//           </div>

//           <button
//             onClick={handleUpload}
//             disabled={loading || !file || !selectedDate}
//             className={`w-full px-4 py-3 font-semibold rounded-md shadow-md transition-colors flex items-center justify-center gap-2 ${
//               loading || !file || !selectedDate ? 'bg-gray-300 text-gray-500 dark:bg-gray-500 dark:text-gray-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
//             }`}
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="animate-spin" size={20} /> Uploading...
//               </>
//             ) : (
//               'Upload'
//             )}
//           </button>
//         </div>
//         {message && <MessageToast message={message} type={messageType} onClose={() => setMessage('')} />}
//       </div>
//     );
//   };


// // --- MultiSelectDropdown Component ---
// const MultiSelectDropdown = ({ label, options, selected, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleToggleOption = (option) => {
//     onChange(
//       selected.includes(option)
//         ? selected.filter((item) => item !== option)
//         : [...selected, option]
//     );
//   };

//   const filteredOptions = options.filter((opt) =>
//     opt.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="relative w-full" ref={dropdownRef}>
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full h-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 flex justify-between items-center"
//         aria-haspopup="listbox"
//         aria-expanded={isOpen}
//       >
//         <span className="truncate">
//           {selected.length > 0 ? `${selected.length} selected` : label}
//         </span>
//         <ChevronDown size={16} />
//       </button>
//       {isOpen && (
//         <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full px-2 py-1 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label={`Search ${label}`}
//           />
//           {filteredOptions.length > 0 ? (
//             <ul role="listbox" className="py-1">
//               {filteredOptions.map((option) => (
//                 <li
//                   key={option}
//                   className="flex items-center px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
//                   role="option"
//                   aria-selected={selected.includes(option)}
//                   onClick={() => handleToggleOption(option)}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selected.includes(option)}
//                     onChange={() => handleToggleOption(option)}
//                     className="mr-2"
//                     id={`checkbox-${label}-${option}`}
//                     tabIndex={-1}
//                   />
//                   <label htmlFor={`checkbox-${label}-${option}`} className="w-full cursor-pointer">
//                     {option}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="px-2 py-1 text-gray-500 dark:text-gray-400">No options found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // --- Main App Component ---
// export default function App() {
//   const [dropdownData, setDropdownData] = useState({
//     clientNames: [],
//     products: [],
//     buckets: [],
//     phs: [],
//     aphs: [],
//   });

//   const [filters, setFilters] = useState({
//     clientName: [],
//     product: [],
//     bucket: [],
//     ph: [],
//     aph: [],
//   });

//   const [allData, setAllData] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [isLoadingData, setIsLoadingData] = useState(false);
//   const [fetchError, setFetchError] = useState(null);

//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December",
//   ];
//   const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(String); // Convert years to string for consistent type with selectedYear
//   const currentMonth = new Date().toLocaleString("default", { month: "long" });
//   const currentYear = String(new Date().getFullYear()); // Ensure string type

//   const [selectedMonth, setSelectedMonth] = useState(currentMonth);
//   const [selectedYear, setSelectedYear] = useState(currentYear);

//   // State to control UploadModal visibility
//   const [showUploadModal, setShowUploadModal] = useState(false);

//   // Helper function for ordinal suffix, moved outside component if not using state/props
//   const getOrdinalSuffix = (day) => {
//     if (day === 1 || day === 21 || day === 31) return "st";
//     if (day === 2 || day === 22) return "nd";
//     if (day === 3 || day === 23) return "rd";
//     return "th";
//   };

//   const fetchMileStoneData = async () => {
//     setIsLoadingData(true);
//     setFetchError(null);
//     try {
//       const response = await axios.post(
//         "https://phdashboard-backend.onrender.com/milestone/getdata/milestones",
//         { month: selectedMonth, year: selectedYear }
//       );
//       if (response.data.success && Array.isArray(response.data.data)) {
//         // Ensure values from DB (VARCHAR) are treated as strings
//         const formattedData = response.data.data.map((item) => ({
//           clientName: String(item.client_name),
//           product: String(item.product),
//           bucket: String(item.bucket),
//           ph: String(item.ph),
//           aph: String(item.aph),
//           allocationCount: String(item.allocation_count), // Convert to string
//           allocationValueinCr: String(item.allocation_value_cr), // Convert to string
//           milestones_8th: String(item.milestones_8th),
//           milestones_14th: String(item.milestones_14th),
//           milestones_21st: String(item.milestones_21st),
//           milestones_28th: String(item.milestones_28th),
//           achievement_8th: String(item.achievement_8th),
//           achievement_14th: String(item.achievement_14th),
//           achievement_21st: String(item.achievement_21st),
//           achievement_28th: String(item.achievement_28th),
//           achievement_percent_8th: String(item.achievement_percent_8th),
//           achievement_percent_14th: String(item.achievement_percent_14th),
//           achievement_percent_21st: String(item.achievement_percent_21st),
//           achievement_percent_28th: String(item.achievement_percent_28th),
//           sdlm_8th: String(item.sdlm_8th),
//           sdlm_14th: String(item.sdlm_14th),
//           sdlm_21st: String(item.sdlm_21st),
//           sdlm_28th: String(item.sdlm_28th),
//           sdbm_8th: String(item.sdbm_8th),
//           sdbm_14th: String(item.sdbm_14th),
//           sdbm_21st: String(item.sdbm_21st),
//           sdbm_28th: String(item.sdbm_28th),
//         }));
//         setAllData(formattedData);
//       } else {
//         setAllData([]);
//         setFetchError(response.data.message || "No data found for the selected period.");
//       }
//     } catch (err) {
//       console.error("Error fetching milestone data:", err);
//       setFetchError("Error fetching data. Please try again.");
//       setAllData([]);
//     } finally {
//       setIsLoadingData(false);
//     }
//   };

//   useEffect(() => {
//     fetchMileStoneData();
//   }, [selectedMonth, selectedYear]); // Depend on month and year to refetch

//   useEffect(() => {
//     const clientNames = new Set();
//     const products = new Set();
//     const buckets = new Set();
//     const phs = new Set();
//     const aphs = new Set();

//     allData.forEach((row) => {
//       if (row.clientName) clientNames.add(row.clientName);
//       if (row.product) products.add(row.product);
//       if (row.bucket) buckets.add(row.bucket);
//       if (row.ph) phs.add(row.ph);
//       if (row.aph) aphs.add(row.aph);
//     });

//     setDropdownData({
//       clientNames: Array.from(clientNames),
//       products: Array.from(products),
//       buckets: Array.from(buckets),
//       phs: Array.from(phs),
//       aphs: Array.from(aphs),
//     });

//     setTableData(allData); // Initialize tableData with allData
//   }, [allData]);

//   const filteredTableData = tableData.filter((row) => {
//     return (
//       (filters.clientName.length === 0 ||
//         filters.clientName.includes(row.clientName)) &&
//       (filters.product.length === 0 || filters.product.includes(row.product)) &&
//       (filters.bucket.length === 0 || filters.bucket.includes(row.bucket)) &&
//       (filters.ph.length === 0 || filters.ph.includes(row.ph)) &&
//       (filters.aph.length === 0 || filters.aph.includes(row.aph))
//     );
//   });

//   const handleOpenUploadModal = () => {
//     setShowUploadModal(true);
//   };

//   const handleCloseUploadModal = () => {
//     setShowUploadModal(false);
//   };

//   const handleUploadSuccess = () => {
//     setShowUploadModal(false); // Close the modal
//     fetchMileStoneData(); // Re-fetch data to update the table with newly uploaded data
//   };

//   return (
//     <div className="xlg:max-w-7xl lg:max-w-6xl md:max-w-5xl mx-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//         <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
//           Allocation Dashboard
//         </h2>
//         <div className="flex gap-2">
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-200"
//             aria-label="Select month"
//           >
//             {months.map((m) => (
//               <option key={m} value={m}>
//                 {m}
//               </option>
//             ))}
//           </select>
//           <select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-200"
//             aria-label="Select year"
//           >
//             {years.map((y) => (
//               <option key={y} value={y}>
//                 {y}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={handleOpenUploadModal}
//             className="px-3 sm:px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base"
//             aria-label="Add new file"
//           >
//             <Upload size={18} /> <span className="hidden sm:inline">Add File</span>
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
//         <MultiSelectDropdown
//           label="Client Name"
//           options={dropdownData.clientNames}
//           selected={filters.clientName}
//           onChange={(val) => setFilters({ ...filters, clientName: val })}
//         />
//         <MultiSelectDropdown
//           label="Product"
//           options={dropdownData.products}
//           selected={filters.product}
//           onChange={(val) => setFilters({ ...filters, product: val })}
//         />
//         <MultiSelectDropdown
//           label="Bucket"
//           options={dropdownData.buckets}
//           selected={filters.bucket}
//           onChange={(val) => setFilters({ ...filters, bucket: val })}
//         />
//         <MultiSelectDropdown
//           label="PH"
//           options={dropdownData.phs}
//           selected={filters.ph}
//           onChange={(val) => setFilters({ ...filters, ph: val })}
//         />
//         <MultiSelectDropdown
//           label="APH"
//           options={dropdownData.aphs}
//           selected={filters.aph}
//           onChange={(val) => setFilters({ ...filters, aph: val })}
//         />
//         <button
//           onClick={() =>
//             setFilters({ clientName: [], product: [], bucket: [], ph: [], aph: [] })
//           }
//           className="bg-gray-200 px-3 py-2 rounded-md text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//           aria-label="Clear all filters"
//         >
//           Clear
//         </button>
//       </div>

//       {/* Table */}
//       <div className="rounded-md border overflow-x-auto bg-white dark:bg-gray-800 shadow-md">
//         <table className="min-w-max w-full border-collapse text-sm">
//           <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white sticky top-0">
//             <tr>
//               <th rowSpan="2" className="border px-2 py-1">Client Name</th>
//               <th rowSpan="2" className="border px-2 py-1">Product</th>
//               <th rowSpan="2" className="border px-2 py-1">Bucket</th>
//               <th rowSpan="2" className="border px-2 py-1">PH</th>
//               <th rowSpan="2" className="border px-2 py-1">APH</th>
//               <th colSpan="2" className="border px-2 py-1">Allocation</th>
//               <th colSpan="4" className="border px-2 py-1">{selectedMonth} Milestones</th>
//               <th colSpan="4" className="border px-2 py-1">Achievement</th>
//               <th colSpan="4" className="border px-2 py-1">Achievement %</th>
//               <th colSpan="4" className="border px-2 py-1">SDLM</th>
//               <th colSpan="4" className="border px-2 py-1">SDBM</th>
//             </tr>
//             <tr className="bg-gray-100 dark:bg-gray-600">
//               <th className="border px-2 py-1">Count</th>
//               <th className="border px-2 py-1">Value in Cr</th>
//               {[8, 14, 21, 28].map((d) => (
//                 <th key={`m${d}`} className="border px-2 py-1">
//                   {d}
//                   {getOrdinalSuffix(d)}
//                 </th>
//               ))}
//               {[8, 14, 21, 28].map((d) => (
//                 <th key={`a${d}`} className="border px-2 py-1">
//                   {d}
//                   {getOrdinalSuffix(d)}
//                 </th>
//               ))}
//               {[8, 14, 21, 28].map((d) => (
//                 <th key={`ap${d}`} className="border px-2 py-1">
//                   {d}
//                   {getOrdinalSuffix(d)}
//                 </th>
//               ))}
//               {[8, 14, 21, 28].map((d) => (
//                 <th key={`sd${d}`} className="border px-2 py-1">
//                   {d}
//                   {getOrdinalSuffix(d)}
//                 </th>
//               ))}
//               {[8, 14, 21, 28].map((d) => (
//                 <th key={`sb${d}`} className="border px-2 py-1">
//                   {d}
//                   {getOrdinalSuffix(d)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="text-gray-900 dark:text-gray-200">
//             {isLoadingData ? (
//               <tr>
//                 <td colSpan="23" className="text-center py-4">
//                   Loading...
//                 </td>
//               </tr>
//             ) : filteredTableData.length > 0 ? (
//               filteredTableData.map((row, idx) => (
//                 <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
//                   <td className="border px-2 py-1">{row.clientName}</td>
//                   <td className="border px-2 py-1">{row.product}</td>
//                   <td className="border px-2 py-1">{row.bucket}</td>
//                   <td className="border px-2 py-1">{row.ph}</td>
//                   <td className="border px-2 py-1">{row.aph}</td>
//                   <td className="border px-2 py-1">{row.allocationCount}</td>
//                   <td className="border px-2 py-1">
//                     {row.allocationValueinCr}
//                   </td>
//                   {/* CORRECTED: Accessing data directly with the keys defined in formattedData */}
//                   <td className="border px-2 py-1">{row.milestones_8th}</td>
//                   <td className="border px-2 py-1">{row.milestones_14th}</td>
//                   <td className="border px-2 py-1">{row.milestones_21st}</td>
//                   <td className="border px-2 py-1">{row.milestones_28th}</td>

//                   <td className="border px-2 py-1">{row.achievement_8th}</td>
//                   <td className="border px-2 py-1">{row.achievement_14th}</td>
//                   <td className="border px-2 py-1">{row.achievement_21st}</td>
//                   <td className="border px-2 py-1">{row.achievement_28th}</td>

//                   <td className="border px-2 py-1">{row.achievement_percent_8th}%</td>
//                   <td className="border px-2 py-1">{row.achievement_percent_14th}%</td>
//                   <td className="border px-2 py-1">{row.achievement_percent_21st}%</td>
//                   <td className="border px-2 py-1">{row.achievement_percent_28th}%</td>

//                   <td className="border px-2 py-1">{row.sdlm_8th}</td>
//                   <td className="border px-2 py-1">{row.sdlm_14th}</td>
//                   <td className="border px-2 py-1">{row.sdlm_21st}</td>
//                   <td className="border px-2 py-1">{row.sdlm_28th}</td>

//                   <td className="border px-2 py-1">{row.sdbm_8th}</td>
//                   <td className="border px-2 py-1">{row.sdbm_14th}</td>
//                   <td className="border px-2 py-1">{row.sdbm_21st}</td>
//                   <td className="border px-2 py-1">{row.sdbm_28th}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="23" className="text-center py-4">
//                   {fetchError || "No data available based on current filters or selected month/year."}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       {showUploadModal && (
//         <UploadModal
//           onClose={handleCloseUploadModal}
//           onUploadSuccess={handleUploadSuccess}
//         />
//       )}
//     </div>
//   );
// }