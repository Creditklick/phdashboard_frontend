







// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import EditMilestoneModal from "./EditMilestoneModal";

// // function ListMileStone() {
// //   const months = [
// //     "January", "February", "March", "April", "May", "June",
// //     "July", "August", "September", "October", "November", "December"
// //   ];

// //   const generateYears = () => {
// //     const currentYear = new Date().getFullYear();
// //     const years = [];
// //     for (let i = currentYear - 5; i <= currentYear + 5; i++) {
// //       years.push(i.toString());
// //     }
// //     return years;
// //   };

// //   const yearsList = generateYears();
// //   const currentDate = new Date();
// //   const [selectedMonth, setSelectedMonth] = useState(months[currentDate.getMonth()]);
// //   const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());
// //   const imsId = "IMS6167";
// //   const [milestoneData, setMilestoneData] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedRow, setSelectedRow] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);

// //   useEffect(() => {
// //     const fetchMonthMileStone = async () => {
// //       setIsLoading(true);
// //       try {
// //         const monthNumber = months.indexOf(selectedMonth) + 1;
// //         const yearNumber = parseInt(selectedYear, 10);

// //         const response = await axios.get(
// //           "https://phdashboard-backend.onrender.com/milestone/get_month/api",
// //           {
// //             params: {
// //               ims_id: imsId,
// //               month: monthNumber,
// //               year: yearNumber
// //             }
// //           }
// //         );
       

        

       

// //         const rawData = response.data.data;

// // const arrayData = Array.isArray(rawData) ? rawData : [rawData];

// // const processedData = arrayData.map(item => ({
// //   ...item,
// //   "8th_percentage": calculateAchievementPercentage(item["8th_Achievement"], item["8th"]),
// //   "14th_percentage": calculateAchievementPercentage(item["14th_Achievement"], item["14th"]),
// //   "21th_percentage": calculateAchievementPercentage(item["21th_Achievement"], item["21th"]),
// //   "28th_percentage": calculateAchievementPercentage(item["28th_Achievement"], item["28th"])
// // }));

// // setMilestoneData(processedData || []);

// //         setMilestoneData(processedData || []);
// //       } catch (err) {
// //         console.error("Error is", err.response?.data || err.message);
// //         setMilestoneData([]);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchMonthMileStone();
// //   }, [selectedMonth, selectedYear]);

// //   const handleEditClick = (rowData, rowIndex) => {
// //     setSelectedRow({ data: rowData, index: rowIndex });
// //     setIsModalOpen(true);
// //   };

// //   const handleSave = async (updatedData) => {
// //     setIsLoading(true);
// //     try {
// //       // API call to save the data

// //       console.log("update date is ",updatedData);
// //       const response = await axios.post(
// //         "https://phdashboard-backend.onrender.com/milestone/get_month/api",    
// //         updatedData
// //       );

// //     if(response.data.success){
// //         fetchMonthMileStone();
// //     }
     
// //       setIsModalOpen(false);
// //     } catch (error) {
// //       console.error("Error saving data:", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-6 space-y-6">
// //       {/* Filters Row */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
// //         <div>
// //           <label className="block text-gray-700 font-medium mb-2">IMS ID</label>
// //           <input
// //             type="text"
// //             value={imsId}
// //             disabled
// //             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-gray-700 font-medium mb-2">Select Month</label>
// //           <select
// //             value={selectedMonth}
// //             onChange={(e) => setSelectedMonth(e.target.value)}
// //             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           >
// //             {months.map((month, index) => (
// //               <option key={index} value={month}>
// //                 {month}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div>
// //           <label className="block text-gray-700 font-medium mb-2">Select Year</label>
// //           <select
// //             value={selectedYear}
// //             onChange={(e) => setSelectedYear(e.target.value)}
// //             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
// //           >
// //             {yearsList.map((year, index) => (
// //               <option key={index} value={year}>
// //                 {year}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //       </div>

// //       {/* Loading State */}
// //       {isLoading && (
// //         <div className="text-center py-4">
// //           <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
// //           <p className="mt-2 text-gray-600">Loading data...</p>
// //         </div>
// //       )}

// //       {/* Data Table */}
// //       {!isLoading && (
// //         <div className="overflow-x-auto">
// //           {milestoneData.length === 0 ? (
// //             <div className="text-center text-gray-500 py-6">
// //               No Data Found
// //             </div>
// //           ) : (
// //             <div className="border border-gray-300 rounded-lg overflow-hidden">
// //               <div className="overflow-x-auto">
// //                 <table className="min-w-full">
// //                   <thead className="bg-gray-100">
// //                     <tr>
// //                       <th className="p-3 border">Actions</th>
// //                       <th className="p-3 border">IMS ID</th>
// //                       <th className="p-3 border">Client</th>
// //                       <th className="p-3 border">Product</th>
// //                       <th className="p-3 border">Bucket</th>
// //                       <th className="p-3 border">Value (Cr)</th>
                      
// //                       {/* Target Headers */}
// //                       <th className="p-3 border">8th</th>
// //                       <th className="p-3 border">14th</th>
// //                       <th className="p-3 border">21th</th>
// //                       <th className="p-3 border">28th</th>
                      
// //                       {/* Achievement Headers */}
// //                       <th className="p-3 border">8th Achv</th>
// //                       <th className="p-3 border">14th Achv</th>
// //                       <th className="p-3 border">21th Achv</th>
// //                       <th className="p-3 border">28th Achv</th>
                      
// //                       {/* Percentage Headers */}
// //                       <th className="p-3 border">8th%</th>
// //                       <th className="p-3 border">14th%</th>
// //                       <th className="p-3 border">21th%</th>
// //                       <th className="p-3 border">28th%</th>
                      
// //                       {/* SDLM Headers */}
// //                       <th className="p-3 border">8th SDLM</th>
// //                       <th className="p-3 border">14th SDLM</th>
// //                       <th className="p-3 border">21th SDLM</th>
// //                       <th className="p-3 border">28th SDLM</th>
                      
// //                       {/* SDBM Headers */}
// //                       <th className="p-3 border">8th SDBM</th>
// //                       <th className="p-3 border">14th SDBM</th>
// //                       <th className="p-3 border">21th SDBM</th>
// //                       <th className="p-3 border">28th SDBM</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {milestoneData.map((item, index) => (
// //                       <tr key={item._id || index} className="hover:bg-gray-50">
// //                         <td className="p-3 border">
// //                           <button
// //                             onClick={() => handleEditClick(item, index)}
// //                             className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
// //                           >
// //                             Edit
// //                           </button>
// //                         </td>
// //                         <td className="p-3 border">{item?.ims_id || 'N/A'} </td>
// //                         <td className="p-3 border">{item.client_name}</td>
// //                         <td className="p-3 border">{item.product}</td>
// //                         <td className="p-3 border">{item.bucket}</td>
// //                         <td className="p-3 border">{item.value_in_cr}</td>
                        
// //                         {/* Target Values */}
// //                         <td className="p-3 border">{item["8th"]}</td>
// //                         <td className="p-3 border">{item["14th"]}</td>
// //                         <td className="p-3 border">{item["21th"]}</td>
// //                         <td className="p-3 border">{item["28th"]}</td>
                        
// //                         {/* Achievement Values */}
// //                         <td className="p-3 border">{item["8th_Achievement"]}</td>
// //                         <td className="p-3 border">{item["14th_Achievement"]}</td>
// //                         <td className="p-3 border">{item["21th_Achievement"]}</td>
// //                         <td className="p-3 border">{item["28th_Achievement"]}</td>
                        
// //                         {/* Percentage Values */}
// //                         <td className="p-3 border">{item["8th_percentage"]}</td>
// //                         <td className="p-3 border">{item["14th_percentage"]}</td>
// //                         <td className="p-3 border">{item["21th_percentage"]}</td>
// //                         <td className="p-3 border">{item["28th_percentage"]}</td>
                        
// //                         {/* SDLM Values */}
// //                         <td className="p-3 border">{item["8th_sdlm"]}</td>
// //                         <td className="p-3 border">{item["14th_sdlm"]}</td>
// //                         <td className="p-3 border">{item["21th_sdlm"]}</td>
// //                         <td className="p-3 border">{item["28th_sdlm"]}</td>
                        
// //                         {/* SDBM Values */}
// //                         <td className="p-3 border">{item["8th_sdbm"]}</td>
// //                         <td className="p-3 border">{item["14th_sdbm"]}</td>
// //                         <td className="p-3 border">{item["21th_sdbm"]}</td>
// //                         <td className="p-3 border">{item["28th_sdbm"]}</td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {isModalOpen && selectedRow && (
// //         <EditMilestoneModal
// //           rowData={selectedRow.data}
// //           onSave={handleSave}
// //           onClose={() => setIsModalOpen(false)}
// //           isLoading={isLoading}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // // Helper function to calculate achievement percentage
// // function calculateAchievementPercentage(achievement, target) {
// //   if (!target || target === 0) return "0%";
// //   const percentage = (parseFloat(achievement || 0) / parseFloat(target)) * 100;
// //   return `${percentage.toFixed(2)}%`;
// // }

// // export default ListMileStone;

















// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import EditMilestoneModal from "./EditMilestoneModal";

// // function ListMileStone() {
// //   const months = [
// //     { name: "January", value: 1 },
// //     { name: "February", value: 2 },
// //     { name: "March", value: 3 },
// //     { name: "April", value: 4 },
// //     { name: "May", value: 5 },
// //     { name: "June", value: 6 },
// //     { name: "July", value: 7 },
// //     { name: "August", value: 8 },
// //     { name: "September", value: 9 },
// //     { name: "October", value: 10 },
// //     { name: "November", value: 11 },
// //     { name: "December", value: 12 }
// //   ];

// //   const generateYears = () => {
// //     const currentYear = new Date().getFullYear();
// //     const years = [];
// //     for (let i = currentYear - 5; i <= currentYear + 5; i++) {
// //       years.push(i.toString());
// //     }
// //     return years;
// //   };

// //   const yearsList = generateYears();
// //   const currentDate = new Date();
// //   const [selectedMonth, setSelectedMonth] = useState(
// //     months.find(month => month.value === currentDate.getMonth() + 1)
// //   );
// //   const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());
// //   const imsId = "IMS6167";
// //   const [milestoneData, setMilestoneData] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedRow, setSelectedRow] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const fetchMonthMileStone = async () => {
// //     setIsLoading(true);
// //     try {
// //       const response = await axios.get(
// //         "https://phdashboard-backend.onrender.com/milestone/get_month/api",
// //         {
// //           params: {
// //             ims_id: imsId,
// //             month: selectedMonth.value,
// //             year: selectedYear
// //           }
// //         }
// //       );

// //       const rawData = response.data.data;
// //       const arrayData = Array.isArray(rawData) ? rawData : [rawData];

// //       const processedData = arrayData.map(item => ({
// //         ...item,
// //         "8th_percentage": calculateAchievementPercentage(item["8th_Achievement"], item["8th"]),
// //         "14th_percentage": calculateAchievementPercentage(item["14th_Achievement"], item["14th"]),
// //         "21th_percentage": calculateAchievementPercentage(item["21th_Achievement"], item["21th"]),
// //         "28th_percentage": calculateAchievementPercentage(item["28th_Achievement"], item["28th"])
// //       }));

// //       setMilestoneData(processedData || []);
// //     } catch (err) {
// //       console.error("Error fetching data:", err.response?.data || err.message);
// //       setMilestoneData([]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMonthMileStone();
// //   }, [selectedMonth, selectedYear]);

// //   const handleEditClick = (rowData, rowIndex) => {
// //     setSelectedRow({ data: rowData, index: rowIndex });
// //     setIsModalOpen(true);
// //   };

// //   const handleSave = async (updatedData) => {
// //     setIsLoading(true);
// //     try {
// //       const response = await axios.post(
// //         "https://phdashboard-backend.onrender.com/milestone/get_month/api",
// //         updatedData
// //       );

// //       if (response.data.success) {
// //         await fetchMonthMileStone();
// //       }
// //       setIsModalOpen(false);
// //     } catch (error) {
// //       console.error("Error saving data:", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-6 space-y-6">
// //       {/* Filters Row */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
// //         <div>
// //           <label className="block text-gray-700 font-medium mb-2">IMS ID</label>
// //           <input
// //             type="text"
// //             value={imsId}
// //             disabled
// //             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-gray-700 font-medium mb-2">Select Month</label>
// //           <select
// //             value={selectedMonth.name}
// //             onChange={(e) => {
// //               const month = months.find(m => m.name === e.target.value);
// //               setSelectedMonth(month);
// //             }}
// //             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           >
// //             {months.map((month, index) => (
// //               <option key={index} value={month.name}>
// //                 {month.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div>
// //           <label className="block text-gray-700 font-medium mb-2">Select Year</label>
// //           <select
// //             value={selectedYear}
// //             onChange={(e) => setSelectedYear(e.target.value)}
// //             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
// //           >
// //             {yearsList.map((year, index) => (
// //               <option key={index} value={year}>
// //                 {year}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //       </div>

// //       {/* Loading State */}
// //       {isLoading && (
// //         <div className="text-center py-4">
// //           <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
// //           <p className="mt-2 text-gray-600">Loading data...</p>
// //         </div>
// //       )}

// //       {/* Data Table */}
// //       {!isLoading && (
// //         <div className="overflow-x-auto">
// //           {milestoneData.length === 0 ? (
// //             <div className="text-center text-gray-500 py-6">
// //               No Data Found
// //             </div>
// //           ) : (
// //             <div className="border border-gray-300 rounded-lg overflow-hidden">
// //               <div className="overflow-x-auto">
// //                 <table className="min-w-full">
// //                   <thead className="bg-gray-100">
// //                     <tr>
// //                       <th className="p-3 border">Actions</th>
// //                       <th className="p-3 border">IMS ID</th>
// //                       <th className="p-3 border">Client</th>
// //                       <th className="p-3 border">Product</th>
// //                       <th className="p-3 border">Bucket</th>
// //                       <th className="p-3 border">Value (Cr)</th>
                      
// //                       {/* Target Headers */}
// //                       <th className="p-3 border">8th</th>
// //                       <th className="p-3 border">14th</th>
// //                       <th className="p-3 border">21th</th>
// //                       <th className="p-3 border">28th</th>
                      
// //                       {/* Achievement Headers */}
// //                       <th className="p-3 border">8th Achv</th>
// //                       <th className="p-3 border">14th Achv</th>
// //                       <th className="p-3 border">21th Achv</th>
// //                       <th className="p-3 border">28th Achv</th>
                      
// //                       {/* Percentage Headers */}
// //                       <th className="p-3 border">8th%</th>
// //                       <th className="p-3 border">14th%</th>
// //                       <th className="p-3 border">21th%</th>
// //                       <th className="p-3 border">28th%</th>
                      
// //                       {/* SDLM Headers */}
// //                       <th className="p-3 border">8th SDLM</th>
// //                       <th className="p-3 border">14th SDLM</th>
// //                       <th className="p-3 border">21th SDLM</th>
// //                       <th className="p-3 border">28th SDLM</th>
                      
// //                       {/* SDBM Headers */}
// //                       <th className="p-3 border">8th SDBM</th>
// //                       <th className="p-3 border">14th SDBM</th>
// //                       <th className="p-3 border">21th SDBM</th>
// //                       <th className="p-3 border">28th SDBM</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {milestoneData.map((item, index) => (
// //                       <tr key={item._id || index} className="hover:bg-gray-50">
// //                         <td className="p-3 border">
// //                           <button
// //                             onClick={() => handleEditClick(item, index)}
// //                             className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
// //                           >
// //                             Edit
// //                           </button>
// //                         </td>
// //                         <td className="p-3 border">{item?.ims_id || 'N/A'}</td>
// //                         <td className="p-3 border">{item.client_name}</td>
// //                         <td className="p-3 border">{item.product}</td>
// //                         <td className="p-3 border">{item.bucket}</td>
// //                         <td className="p-3 border">{item.value_in_cr}</td>
                        
// //                         {/* Target Values */}
// //                         <td className="p-3 border">{item["8th"]}</td>
// //                         <td className="p-3 border">{item["14th"]}</td>
// //                         <td className="p-3 border">{item["21th"]}</td>
// //                         <td className="p-3 border">{item["28th"]}</td>
                        
// //                         {/* Achievement Values */}
// //                         <td className="p-3 border">{item["8th_Achievement"]}</td>
// //                         <td className="p-3 border">{item["14th_Achievement"]}</td>
// //                         <td className="p-3 border">{item["21th_Achievement"]}</td>
// //                         <td className="p-3 border">{item["28th_Achievement"]}</td>
                        
// //                         {/* Percentage Values */}
// //                         <td className="p-3 border">{item["8th_percentage"]}</td>
// //                         <td className="p-3 border">{item["14th_percentage"]}</td>
// //                         <td className="p-3 border">{item["21th_percentage"]}</td>
// //                         <td className="p-3 border">{item["28th_percentage"]}</td>
                        
// //                         {/* SDLM Values */}
// //                         <td className="p-3 border">{item["8th_sdlm"]}</td>
// //                         <td className="p-3 border">{item["14th_sdlm"]}</td>
// //                         <td className="p-3 border">{item["21th_sdlm"]}</td>
// //                         <td className="p-3 border">{item["28th_sdlm"]}</td>
                        
// //                         {/* SDBM Values */}
// //                         <td className="p-3 border">{item["8th_sdbm"]}</td>
// //                         <td className="p-3 border">{item["14th_sdbm"]}</td>
// //                         <td className="p-3 border">{item["21th_sdbm"]}</td>
// //                         <td className="p-3 border">{item["28th_sdbm"]}</td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {isModalOpen && selectedRow && (
// //         <EditMilestoneModal
// //           rowData={selectedRow.data}
// //           onSave={handleSave}
// //           onClose={() => setIsModalOpen(false)}
// //           isLoading={isLoading}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // // Helper function to calculate achievement percentage
// // function calculateAchievementPercentage(achievement, target) {
// //   if (!target || target === 0) return "0%";
// //   const percentage = (parseFloat(achievement || 0) / parseFloat(target)) * 100;
// //   return `${percentage.toFixed(2)}%`;
// // }

// // export default ListMileStone;























// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import EditMilestoneModal from "./EditMilestoneModal";
// import "react-toastify/dist/ReactToastify.css";

// function ListMileStone() {
//   const months = [
//     { name: "January", value: 1 },
//     { name: "February", value: 2 },
//     { name: "March", value: 3 },
//     { name: "April", value: 4 },
//     { name: "May", value: 5 },
//     { name: "June", value: 6 },
//     { name: "July", value: 7 },
//     { name: "August", value: 8 },
//     { name: "September", value: 9 },
//     { name: "October", value: 10 },
//     { name: "November", value: 11 },
//     { name: "December", value: 12 }
//   ];

//   const generateYears = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear - 5; i <= currentYear + 5; i++) {
//       years.push(i.toString());
//     }
//     return years;
//   };

//   const yearsList = generateYears();
//   const currentDate = new Date();
//   const [selectedMonth, setSelectedMonth] = useState(
//     months.find(month => month.value === currentDate.getMonth() + 1)
//   );
//   const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());
//   const imsId = "IMS6167";
//   const [milestoneData, setMilestoneData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchMonthMileStone = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         "https://phdashboard-backend.onrender.com/milestone/get_month/api",
//         {
//           params: {
//             ims_id: imsId,
//             month: selectedMonth.value,
//             year: selectedYear
//           }
//         }
//       );

//       const rawData = response.data.data;
//       const arrayData = Array.isArray(rawData) ? rawData : [rawData];

//       const processedData = arrayData.map(item => ({
//         ...item,
//         "8th_percentage": calculateAchievementPercentage(item["8th_Achievement"], item["8th"]),
//         "14th_percentage": calculateAchievementPercentage(item["14th_Achievement"], item["14th"]),
//         "21th_percentage": calculateAchievementPercentage(item["21th_Achievement"], item["21th"]),
//         "28th_percentage": calculateAchievementPercentage(item["28th_Achievement"], item["28th"])
//       }));

//       setMilestoneData(processedData || []);
//     } catch (err) {
//       console.error("Error fetching data:", err.response?.data || err.message);
//       setMilestoneData([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMonthMileStone();
//   }, [selectedMonth, selectedYear]);

//   const handleEditClick = (rowData, rowIndex) => {
//     setSelectedRow({ data: rowData, index: rowIndex });
//     setIsModalOpen(true);
//   };

//   const handleSave = async (updatedData) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         "https://phdashboard-backend.onrender.com/milestone/get_month/api",
//         updatedData
//       );

//       if (response.data.success) {
//         toast.success("Data updated successfully!");
//         await fetchMonthMileStone();
//       } else {
//         toast.error("Failed to update data");
//       }
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error("Error updating data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Filters Row */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">IMS ID</label>
//           <input
//             type="text"
//             value={imsId}
//             disabled
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Select Month</label>
//           <select
//             value={selectedMonth.name}
//             onChange={(e) => {
//               const month = months.find(m => m.name === e.target.value);
//               setSelectedMonth(month);
//             }}
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             {months.map((month, index) => (
//               <option key={index} value={month.name}>
//                 {month.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Select Year</label>
//           <select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//           >
//             {yearsList.map((year, index) => (
//               <option key={index} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Loading State */}
//       {isLoading && (
//         <div className="text-center py-4">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//           <p className="mt-2 text-gray-600">Loading data...</p>
//         </div>
//       )}

//       {/* Data Table */}
//       {!isLoading && (
//         <div className="overflow-x-auto">
//           {milestoneData.length === 0 ? (
//             <div className="text-center text-gray-500 py-6">
//               No Data Found
//             </div>
//           ) : (
//             <div className="border border-gray-300 rounded-lg overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="p-3 border">Actions</th>
//                       <th className="p-3 border">IMS ID</th>
//                       <th className="p-3 border">Client</th>
//                       <th className="p-3 border">Product</th>
//                       <th className="p-3 border">Bucket</th>
//                       <th className="p-3 border">Value (Cr)</th>
                      
//                       {/* Target Headers */}
//                       <th className="p-3 border">8th</th>
//                       <th className="p-3 border">14th</th>
//                       <th className="p-3 border">21th</th>
//                       <th className="p-3 border">28th</th>
                      
//                       {/* Achievement Headers */}
//                       <th className="p-3 border">8th Achv</th>
//                       <th className="p-3 border">14th Achv</th>
//                       <th className="p-3 border">21th Achv</th>
//                       <th className="p-3 border">28th Achv</th>
                      
//                       {/* Percentage Headers */}
//                       <th className="p-3 border">8th%</th>
//                       <th className="p-3 border">14th%</th>
//                       <th className="p-3 border">21th%</th>
//                       <th className="p-3 border">28th%</th>
                      
//                       {/* SDLM Headers */}
//                       <th className="p-3 border">8th SDLM</th>
//                       <th className="p-3 border">14th SDLM</th>
//                       <th className="p-3 border">21th SDLM</th>
//                       <th className="p-3 border">28th SDLM</th>
                      
//                       {/* SDBM Headers */}
//                       <th className="p-3 border">8th SDBM</th>
//                       <th className="p-3 border">14th SDBM</th>
//                       <th className="p-3 border">21th SDBM</th>
//                       <th className="p-3 border">28th SDBM</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {milestoneData.map((item, index) => (
//                       <tr key={item._id || index} className="hover:bg-gray-50">
//                         <td className="p-3 border">
//                           <button
//                             onClick={() => handleEditClick(item, index)}
//                             className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                           >
//                             Edit
//                           </button>
//                         </td>
//                         <td className="p-3 border">{item?.ims_id || 'N/A'}</td>
//                         <td className="p-3 border">{item.client_name}</td>
//                         <td className="p-3 border">{item.product}</td>
//                         <td className="p-3 border">{item.bucket}</td>
//                         <td className="p-3 border">{item.value_in_cr}</td>
                        
//                         {/* Target Values */}
//                         <td className="p-3 border">{item["8th"]}</td>
//                         <td className="p-3 border">{item["14th"]}</td>
//                         <td className="p-3 border">{item["21th"]}</td>
//                         <td className="p-3 border">{item["28th"]}</td>
                        
//                         {/* Achievement Values */}
//                         <td className="p-3 border">{item["8th_Achievement"]}</td>
//                         <td className="p-3 border">{item["14th_Achievement"]}</td>
//                         <td className="p-3 border">{item["21th_Achievement"]}</td>
//                         <td className="p-3 border">{item["28th_Achievement"]}</td>
                        
//                         {/* Percentage Values */}
//                         <td className="p-3 border">{item["8th_percentage"]}</td>
//                         <td className="p-3 border">{item["14th_percentage"]}</td>
//                         <td className="p-3 border">{item["21th_percentage"]}</td>
//                         <td className="p-3 border">{item["28th_percentage"]}</td>
                        
//                         {/* SDLM Values */}
//                         <td className="p-3 border">{item["8th_sdlm"]}</td>
//                         <td className="p-3 border">{item["14th_sdlm"]}</td>
//                         <td className="p-3 border">{item["21th_sdlm"]}</td>
//                         <td className="p-3 border">{item["28th_sdlm"]}</td>
                        
//                         {/* SDBM Values */}
//                         <td className="p-3 border">{item["8th_sdbm"]}</td>
//                         <td className="p-3 border">{item["14th_sdbm"]}</td>
//                         <td className="p-3 border">{item["21th_sdbm"]}</td>
//                         <td className="p-3 border">{item["28th_sdbm"]}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {isModalOpen && selectedRow && (
//         <EditMilestoneModal
//           rowData={selectedRow.data}
//           onSave={handleSave}
//           onClose={() => setIsModalOpen(false)}
//           isLoading={isLoading}
//         />
//       )}
//     </div>
//   );
// }

// // Helper function to calculate achievement percentage
// function calculateAchievementPercentage(achievement, target) {
//   if (!target || target === 0) return "0%";
//   const percentage = (parseFloat(achievement || 0) / parseFloat(target)) * 100;
//   return `${percentage.toFixed(2)}%`;
// }

// export default ListMileStone;













import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditMilestoneModal from "./EditMilestoneModal";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../ContextApi/Contextapi";

function ListMileStone() {
  const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 }
  ];
 

  const {user} = useContext(authContext);


  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i.toString());
    }
    return years;
  };

  const yearsList = generateYears();
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    months.find(month => month.value === currentDate.getMonth() + 1)
  );
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());
  const imsId = "IMS6167";
  const [milestoneData, setMilestoneData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMonthMileStone = async () => {
    setIsLoading(true);



    try {
      const response = await axios.get(
        "https://phdashboard-backend.onrender.com/milestone/get_month/api",
        {
          params: {
            ims_id: user?.ims_id || 0,
            month: selectedMonth.value,
            year: selectedYear
          }
        }
      );

      const rawData = response.data.data;
      const arrayData = Array.isArray(rawData) ? rawData : [rawData];

      const processedData = arrayData.map(item => ({
        ...item,
        "8th_percentage": calculateAchievementPercentage(item["8th_Achievement"], item["8th"]),
        "14th_percentage": calculateAchievementPercentage(item["14th_Achievement"], item["14th"]),
        "21th_percentage": calculateAchievementPercentage(item["21th_Achievement"], item["21th"]),
        "28th_percentage": calculateAchievementPercentage(item["28th_Achievement"], item["28th"])
      }));

      setMilestoneData(processedData || []);
    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err.message);
      setMilestoneData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthMileStone();
  }, [selectedMonth, selectedYear]);

  const handleEditClick = (rowData, rowIndex) => {
    setSelectedRow({ data: rowData, index: rowIndex });
    setIsModalOpen(true);
  };

  const handleSave = async (updatedData) => {
    setIsLoading(true);
    try {
      // Prepare payload with proper null handling
      const payload = {
        ...updatedData,
        "8th_Achievement": updatedData["8th_Achievement"] === "" || updatedData["8th_Achievement"] === "0.00" ? null : updatedData["8th_Achievement"],
        "14th_Achievement": updatedData["14th_Achievement"] === "" || updatedData["14th_Achievement"] === "0.00" ? null : updatedData["14th_Achievement"],
        "21th_Achievement": updatedData["21th_Achievement"] === "" || updatedData["21th_Achievement"] === "0.00" ? null : updatedData["21th_Achievement"],
        "28th_Achievement": updatedData["28th_Achievement"] === "" || updatedData["28th_Achievement"] === "0.00" ? null : updatedData["28th_Achievement"],
        // Convert empty strings to null for SDLM fields as well
        "8th_sdlm": updatedData["8th_sdlm"] === "" ? null : updatedData["8th_sdlm"],
        "14th_sdlm": updatedData["14th_sdlm"] === "" ? null : updatedData["14th_sdlm"],
        "21th_sdlm": updatedData["21th_sdlm"] === "" ? null : updatedData["21th_sdlm"],
        "28th_sdlm": updatedData["28th_sdlm"] === "" ? null : updatedData["28th_sdlm"]
      };

      const response = await axios.post(
        "https://phdashboard-backend.onrender.com/milestone/get_month/api",
        payload
      );

      if (response.data.success) {
        toast.success("Data updated successfully!");
        await fetchMonthMileStone();
      } else {
        toast.error("Failed to update data");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error updating data");
    } finally {
      setIsLoading(false);
    }
  };

  // Format display value for table cells
  const formatDisplayValue = (value) => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "string" && value.trim() === "") return "-";
    return value;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <label className="block text-gray-700 font-medium mb-2">IMS ID</label>
          <input
            type="text"
            value={user?.ims_id || 0}
            disabled
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Month</label>
          <select
            value={selectedMonth.name}
            onChange={(e) => {
              const month = months.find(m => m.name === e.target.value);
              setSelectedMonth(month);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {months.map((month, index) => (
              <option key={index} value={month.name}>
                {month.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {yearsList.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading data...</p>
        </div>
      )}

      {/* Data Table */}
      {!isLoading && (
        <div className="overflow-x-auto">
          {milestoneData.length === 0 ? (
            <div className="text-center text-gray-500 py-6">
              No Data Found
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 border">Actions</th>
                      <th className="p-3 border">IMS ID</th>
                      <th className="p-3 border">Client</th>
                       <th className="p-3 border">Product</th>

                      <th className="p-3 border">Bucket</th>
                       <th className="p-3 border">Ph</th>
                      <th className="p-3 border">Aph</th>
                     
                      <th className="p-3 border">Value (Cr)</th>
                      
                      {/* Target Headers */}
                      <th className="p-3 border">8th</th>
                      <th className="p-3 border">14th</th>
                      <th className="p-3 border">21th</th>
                      <th className="p-3 border">28th</th>
                      
                      {/* Achievement Headers */}
                      <th className="p-3 border">8th Achv</th>
                      <th className="p-3 border">14th Achv</th>
                      <th className="p-3 border">21th Achv</th>
                      <th className="p-3 border">28th Achv</th>
                      
                      {/* Percentage Headers */}
                      <th className="p-3 border">8th%</th>
                      <th className="p-3 border">14th%</th>
                      <th className="p-3 border">21th%</th>
                      <th className="p-3 border">28th%</th>
                      
                      {/* SDLM Headers */}
                      <th className="p-3 border">8th SDLM</th>
                      <th className="p-3 border">14th SDLM</th>
                      <th className="p-3 border">21th SDLM</th>
                      <th className="p-3 border">28th SDLM</th>
                      
                      {/* SDBM Headers */}
                      <th className="p-3 border">8th SDBM</th>
                      <th className="p-3 border">14th SDBM</th>
                      <th className="p-3 border">21th SDBM</th>
                      <th className="p-3 border">28th SDBM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {milestoneData.map((item, index) => (
                      <tr key={item._id || index} className="hover:bg-gray-50">
                        <td className="p-3 border">
                          <button
                            onClick={() => handleEditClick(item, index)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                        </td>
                        <td className="p-3 border">{item?.ims_id || 'N/A'}</td>
                        <td className="p-3 border">{item.client_name}</td>
                        <td className="p-3 border">{item.product}</td>
                        <td className="p-3 border">{item.bucket}</td>
                         <td className="p-3 border">{item.ph}</td>
                          <td className="p-3 border">{item.aph}</td>

                        
                        <td className="p-3 border">{item.value_in_cr}</td>
                        
                        {/* Target Values */}
                        <td className="p-3 border">{formatDisplayValue(item["8th"])}</td>
                        <td className="p-3 border">{formatDisplayValue(item["14th"])}</td>
                        <td className="p-3 border">{formatDisplayValue(item["21th"])}</td>
                        <td className="p-3 border">{formatDisplayValue(item["28th"])}</td>
                        
                        {/* Achievement Values */}
                        <td className="p-3 border">{formatDisplayValue(item["8th_Achievement"])}</td>
                        <td className="p-3 border">{formatDisplayValue(item["14th_Achievement"])}</td>
                        <td className="p-3 border">{formatDisplayValue(item["21th_Achievement"])}</td>
                        <td className="p-3 border">{formatDisplayValue(item["28th_Achievement"])}</td>
                        
                        {/* Percentage Values */}
                        <td className="p-3 border">{item["8th_percentage"]}</td>
                        <td className="p-3 border">{item["14th_percentage"]}</td>
                        <td className="p-3 border">{item["21th_percentage"]}</td>
                        <td className="p-3 border">{item["28th_percentage"]}</td>
                        
                        {/* SDLM Values */}
                        <td className="p-3 border">{formatDisplayValue(item["8th_sdlm"])}</td>
                        <td className="p-3 border">{formatDisplayValue(item["14th_sdlm"])}</td>
                        <td className="p-3 border">{formatDisplayValue(item["21th_sdlm"])}</td>
                        <td className="p-3 border">{formatDisplayValue(item["28th_sdlm"])}</td>
                        
                        {/* SDBM Values */}
                        <td className="p-3 border">{formatDisplayValue(item["8th_sdbm"])}</td>
                        <td className="p-3 border">{formatDisplayValue(item["14th_sdbm"])}</td>
                        <td className="p-3 border">{formatDisplayValue(item["21th_sdbm"])}</td>
                        <td className="p-3 border">{formatDisplayValue(item["28th_sdbm"])}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {isModalOpen && selectedRow && (
        <EditMilestoneModal
          rowData={selectedRow.data}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

// Helper function to calculate achievement percentage
function calculateAchievementPercentage(achievement, target) {
  if (achievement === null || achievement === undefined || achievement === "") return "-";
  if (!target || target === 0 || target === "0") return "0%";
  
  const achievementNum = parseFloat(achievement);
  const targetNum = parseFloat(target);
  
  if (isNaN(achievementNum)) return "-";
  
  const percentage = (achievementNum / targetNum) * 100;
  return `${percentage.toFixed(2)}%`;
}

export default ListMileStone;