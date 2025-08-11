// import React, { useState, useEffect } from 'react';
// import { FaFileAlt, FaFileExcel } from 'react-icons/fa';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import * as XLSX from 'xlsx';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

// function DashboardContent({ darkMode }) {
//   const [chartData, setChartData] = useState([]);
//   const [efficiencyData, setEfficiencyData] = useState([]);
//   const [viewMode, setViewMode] = useState('charts');
//   const [processdata, setProcessData] = useState([]);
//   const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
//   const [endDate, setEndDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
//   const [loading, setLoading] = useState(false);

//   const formatDate = (date) => {
//     return date.toISOString().split('T')[0];
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('https://phdashboard-backend.onrender.com/ph/api/dashboarddata', {
//         params: {
//           startDate: formatDate(startDate),
//           endDate: formatDate(endDate)
//         }
//       });
//       setProcessData(res.data);
//       prepareChartData(res.data);
//     } catch (err) {
//       console.error('Error fetching dashboard data:', err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   fetchData();
//   // }, []); // Removed the dependency array to only fetch on button click

//   const prepareChartData = (data) => {
//     const chartData = data.map(process => ({
//       name: process.name.replace('_paid', '').toUpperCase(),
//       target: parseInt(process.stats.targets.replace(/,/g, '')),
//       collection: parseInt(process.stats.totalMonthCollection.replace(/,/g, '')),
//       headcount: process.stats.currentHeadcount
//     }));
    
//     setChartData(chartData);
    
//     const efficiency = data.map(process => {
//       const target = parseInt(process.stats.targets.replace(/,/g, ''));
//       const collection = parseInt(process.stats.totalMonthCollection.replace(/,/g, ''));
//       const headcount = process.stats.currentHeadcount;
      
//       return {
//         name: process.name.replace('_paid', '').toUpperCase(),
//         efficiency: headcount > 0 ? (collection / (target / headcount)) * 100 : 0,
//         achievement: target > 0 ? (collection / target) * 100 : 0,
//         perPersonCollection: headcount > 0 ? collection / headcount : 0
//       };
//     });
    
//     setEfficiencyData(efficiency);
//   };

//   const downloadExcelReports = () => {
//     const excelData = chartData.map(item => ({
//       'Process Name': item.name,
//       'Target (₹)': item.target,
//       'Collection (₹)': item.collection,
//       'Headcount': item.headcount,
//       'Achievement (%)': efficiencyData.find(e => e.name === item.name)?.achievement || 0,
//       'Collection per Person (₹)': efficiencyData.find(e => e.name === item.name)?.perPersonCollection || 0,
//       'Date Range': `${formatDate(startDate)} to ${formatDate(endDate)}`
//     }));
    
//     const ws = XLSX.utils.json_to_sheet(excelData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Process Metrics");
//     XLSX.writeFile(wb, "ProcessMetrics.xlsx");
//   };

//   // Dark mode classes
//   const bgColor = darkMode ? 'bg-gray-800' : 'bg-white';
//   const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
//   const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
//   const tableHeaderBg = darkMode ? 'bg-gray-700' : 'bg-gray-50';
//   const tableHeaderText = darkMode ? 'text-gray-300' : 'text-gray-500';
//   const tableRowBg = darkMode ? 'bg-gray-800' : 'bg-white';
//   const tableRowText = darkMode ? 'text-gray-300' : 'text-gray-500';
//   const tableRowBorder = darkMode ? 'divide-gray-700' : 'divide-gray-200';
//   const titleColor = darkMode ? 'text-indigo-300' : 'text-indigo-700';
//   const buttonBg = darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600';
//   const buttonText = darkMode ? 'text-white' : 'text-white';
//   const chartTextColor = darkMode ? 'text-gray-300' : 'text-gray-600';
//   const chartGridColor = darkMode ? '#4B5563' : '#E5E7EB';
//   const inputBg = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900';
//   const inputText = darkMode ? 'text-white' : 'text-gray-900';

//   return (
//     <div className={`${bgColor} min-h-screen p-4`}>
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
//         <div className="flex flex-col sm:flex-row gap-4 items-end">
//           <div>
//             <label className={`block text-sm font-medium mb-1 ${textColor}`}>Start Date</label>
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//               className={`px-3 py-2 border rounded-md text-sm shadow-sm ${inputBg} ${inputText}`}
//             />
//           </div>
//           <div>
//             <label className={`block text-sm font-medium mb-1 ${textColor}`}>End Date</label>
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               minDate={startDate}
//               className={`px-3 py-2 border rounded-md text-sm shadow-sm ${inputBg} ${inputText}`}
//             />
//           </div>
//           <div className="flex items-end">
//             <button 
//               onClick={fetchData}
//               className={`px-6 py-2 ${buttonBg} rounded-lg ${buttonText} h-[42px]`}
//               disabled={loading}
//             >
//               {loading ? 'Loading...' : 'Submit'}
//             </button>
//           </div>
//         </div>
        
//         <div className="flex space-x-4">
//           <button
//             onClick={() => setViewMode('charts')}
//             className={`px-4 py-2 rounded-md ${viewMode === 'charts' ? buttonBg : 'bg-gray-200'} ${viewMode === 'charts' ? buttonText : 'text-gray-700'}`}
//           >
//             View Charts
//           </button>
//           <button
//             onClick={() => setViewMode('table')}
//             className={`px-4 py-2 rounded-md ${viewMode === 'table' ? buttonBg : 'bg-gray-200'} ${viewMode === 'table' ? buttonText : 'text-gray-700'}`}
//           >
//             View Table
//           </button>
//           <button
//             onClick={downloadExcelReports}
//             className={`px-4 py-2 rounded-md ${buttonBg} ${buttonText} flex items-center`}
//             disabled={loading}
//           >
//             <FaFileExcel className="mr-2" /> Export Excel
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className={`flex justify-center items-center h-64 ${textColor}`}>
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//         </div>
//       ) : (
//         <>
//           {viewMode === 'charts' ? (
//             <div className="space-y-8">
//               {/* Target vs Collection Bar Chart */}
//               <div className={`rounded-xl shadow-md p-6 ${bgColor} ${borderColor} border`}>
//                 <h3 className={`text-2xl font-semibold mb-6 ${titleColor} border-b ${borderColor} pb-2`}>
//                   Targets vs Collections Across Processes (₹ in Lakhs)
//                   <span className={`block text-sm font-normal ${chartTextColor}`}>
//                     {formatDate(startDate)} to {formatDate(endDate)}
//                   </span>
//                 </h3>
//                 <div className="h-[500px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart
//                       data={chartData}
//                       margin={{ top: 20, right: 30, left: 50, bottom: 80 }}
//                       barSize={40}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
//                       <XAxis 
//                         dataKey="name" 
//                         angle={-45} 
//                         textAnchor="end" 
//                         height={100}
//                         tick={{ fontSize: 12, fill: chartTextColor }}
//                       />
//                       <YAxis 
//                         domain={[0, 'dataMax + 100000']}
//                         tickFormatter={(value) => `${(value / 100000).toFixed(0)}L`}
//                         width={80}
//                         tickCount={10}
//                         tick={{ fill: chartTextColor }}
//                       />
//                       <Tooltip 
//                         formatter={(value, name) => {
//                           const formattedValue = new Intl.NumberFormat('en-IN', {
//                             style: 'currency',
//                             currency: 'INR',
//                             maximumFractionDigits: 0
//                           }).format(value);
//                           return [formattedValue, name];
//                         }}
//                         contentStyle={{
//                           backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
//                           borderColor: darkMode ? '#4B5563' : '#E5E7EB',
//                           color: darkMode ? '#F3F4F6' : '#111827'
//                         }}
//                       />
//                       <Legend 
//                         verticalAlign="top" 
//                         height={36}
//                         wrapperStyle={{ color: chartTextColor }}
//                       />
//                       <Bar 
//                         dataKey="target" 
//                         fill="#8884d8" 
//                         name="Target (₹)" 
//                         radius={[4, 4, 0, 0]}
//                       />
//                       <Bar 
//                         dataKey="collection" 
//                         fill="#82ca9d" 
//                         name="Collection (₹)" 
//                         radius={[4, 4, 0, 0]}
//                       />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//                 <div className={`mt-4 text-sm ${chartTextColor}`}>
//                   <p>Note: Values displayed in Lakhs (L) where 1L = ₹100,000</p>
//                   <p>Highest Target: ₹{Math.max(...chartData.map(item => item.target)).toLocaleString('en-IN')}</p>
//                   <p>Total Collection: ₹{chartData.reduce((sum, item) => sum + item.collection, 0).toLocaleString('en-IN')}</p>
//                 </div>
//               </div>

//               {/* Efficiency Metrics */}
//               <div className={`rounded-xl shadow-md p-6 ${bgColor} ${borderColor} border`}>
//                 <h3 className={`text-2xl font-semibold mb-6 ${titleColor} border-b ${borderColor} pb-2`}>
//                   Process Performance Metrics
//                   <span className={`block text-sm font-normal ${chartTextColor}`}>
//                     {formatDate(startDate)} to {formatDate(endDate)}
//                   </span>
//                 </h3>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                   {/* Achievement Percentage */}
//                   <div className="h-[400px]">
//                     <h4 className={`text-lg font-medium mb-4 text-center ${textColor}`}>
//                       Target Achievement Percentage
//                       <span className={`block text-sm font-normal ${chartTextColor}`}>(Collection vs Target)</span>
//                     </h4>
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={efficiencyData}
//                           cx="50%"
//                           cy="50%"
//                           labelLine={false}
//                           outerRadius={120}
//                           fill="#8884d8"
//                           dataKey="achievement"
//                           nameKey="name"
//                           label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                         >
//                           {efficiencyData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip 
//                           formatter={(value, name, props) => {
//                             const process = chartData.find(p => p.name === props.payload.name);
//                             return [
//                               `${value.toFixed(2)}%`,
//                               `Target: ₹${process.target.toLocaleString('en-IN')}`,
//                               `Collection: ₹${process.collection.toLocaleString('en-IN')}`
//                             ];
//                           }}
//                           contentStyle={{
//                             backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
//                             borderColor: darkMode ? '#4B5563' : '#E5E7EB',
//                             color: darkMode ? '#F3F4F6' : '#111827'
//                           }}
//                         />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>

//                   {/* Per Person Collection */}
//                   <div className="h-[400px]">
//                     <h4 className={`text-lg font-medium mb-4 text-center ${textColor}`}>
//                       Collection per Employee
//                       <span className={`block text-sm font-normal ${chartTextColor}`}>(Total Collection ÷ Headcount)</span>
//                     </h4>
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart
//                         data={efficiencyData}
//                         layout="vertical"
//                         margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={chartGridColor} />
//                         <XAxis 
//                           type="number" 
//                           tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
//                           tick={{ fill: chartTextColor }}
//                         />
//                         <YAxis 
//                           dataKey="name" 
//                           type="category" 
//                           width={120}
//                           tick={{ fontSize: 12, fill: chartTextColor }}
//                         />
//                         <Tooltip 
//                           formatter={(value, name, props) => {
//                             const process = chartData.find(p => p.name === props.payload.name);
//                             return [
//                               `₹${value.toLocaleString('en-IN')}`,
//                               `Headcount: ${process.headcount}`,
//                               `Total: ₹${process.collection.toLocaleString('en-IN')}`
//                             ];
//                           }}
//                           contentStyle={{
//                             backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
//                             borderColor: darkMode ? '#4B5563' : '#E5E7EB',
//                             color: darkMode ? '#F3F4F6' : '#111827'
//                           }}
//                         />
//                         <Legend wrapperStyle={{ color: chartTextColor }} />
//                         <Bar 
//                           dataKey="perPersonCollection" 
//                           name="₹ per Employee" 
//                           radius={[0, 4, 4, 0]}
//                         >
//                           {efficiencyData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Bar>
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className={`rounded-xl shadow-md p-6 ${bgColor} ${borderColor} border`}>
//               <h3 className={`text-2xl font-semibold mb-6 ${titleColor} border-b ${borderColor} pb-2`}>
//                 Performance Summary
//                 <span className={`block text-sm font-normal ${chartTextColor}`}>
//                   {formatDate(startDate)} to {formatDate(endDate)}
//                 </span>
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className={tableHeaderBg}>
//                     <tr>
//                       <th className={`px-4 py-3 text-left text-xs font-medium ${tableHeaderText} uppercase tracking-wider`}>Process</th>
//                       <th className={`px-4 py-3 text-left text-xs font-medium ${tableHeaderText} uppercase tracking-wider`}>Target (₹)</th>
//                       <th className={`px-4 py-3 text-left text-xs font-medium ${tableHeaderText} uppercase tracking-wider`}>Collection (₹)</th>
//                       <th className={`px-4 py-3 text-left text-xs font-medium ${tableHeaderText} uppercase tracking-wider`}>Achievement</th>
//                       <th className={`px-4 py-3 text-left text-xs font-medium ${tableHeaderText} uppercase tracking-wider`}>Per Employee (₹)</th>
//                       <th className={`px-4 py-3 text-left text-xs font-medium ${tableHeaderText} uppercase tracking-wider`}>Headcount</th>
//                     </tr>
//                   </thead>
//                   <tbody className={`${tableRowBg} divide-y ${tableRowBorder}`}>
//                     {chartData.map((item, index) => {
//                       const efficiency = efficiencyData.find(e => e.name === item.name);
//                       const achievementPercentage = efficiency?.achievement || 0;
                      
//                       let achievementClass = "text-red-500";
//                       if (achievementPercentage >= 75) achievementClass = "text-green-500";
//                       else if (achievementPercentage >= 50) achievementClass = "text-yellow-500";

//                       return (
//                         <tr key={index} className={index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-gray-50') : tableRowBg}>
//                           <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${tableRowText}`}>{item.name}</td>
//                           <td className={`px-4 py-4 whitespace-nowrap text-sm ${tableRowText}`}>
//                             ₹{item.target.toLocaleString('en-IN')}
//                           </td>
//                           <td className={`px-4 py-4 whitespace-nowrap text-sm ${tableRowText}`}>
//                             ₹{item.collection.toLocaleString('en-IN')}
//                           </td>
//                           <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${achievementClass}`}>
//                             {achievementPercentage.toFixed(2)}%
//                           </td>
//                           <td className={`px-4 py-4 whitespace-nowrap text-sm ${tableRowText}`}>
//                             ₹{Math.round(efficiency?.perPersonCollection || 0).toLocaleString('en-IN')}
//                           </td>
//                           <td className={`px-4 py-4 whitespace-nowrap text-sm ${tableRowText}`}>
//                             {item.headcount}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default DashboardContent;













import React, { useState } from 'react';
import { FaFileAlt, FaFileExcel } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import * as XLSX from 'xlsx';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

function DashboardContent({ darkMode }) {
  const [chartData, setChartData] = useState([]);
  const [efficiencyData, setEfficiencyData] = useState([]);
  const [viewMode, setViewMode] = useState('charts');
  const [processdata, setProcessData] = useState([]);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [endDate, setEndDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false); // Track if we have data

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://phdashboard-backend.onrender.com/ph/api/dashboarddata', {
        params: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate)
        }
      });
      setProcessData(res.data);
      prepareChartData(res.data);
      setHasData(true); // Mark that we have data now
    } catch (err) {
      console.error('Error fetching dashboard data:', err.message);
      setHasData(false);
    } finally {
      setLoading(false);
    }
  };

  const prepareChartData = (data) => {
    const chartData = data.map(process => ({
      name: process.name.replace('_paid', '').toUpperCase(),
      target: parseInt(process.stats.targets.replace(/,/g, '')),
      collection: parseInt(process.stats.totalMonthCollection.replace(/,/g, '')),
      headcount: process.stats.currentHeadcount
    }));
    
    setChartData(chartData);
    
    const efficiency = data.map(process => {
      const target = parseInt(process.stats.targets.replace(/,/g, ''));
      const collection = parseInt(process.stats.totalMonthCollection.replace(/,/g, ''));
      const headcount = process.stats.currentHeadcount;
      
      return {
        name: process.name.replace('_paid', '').toUpperCase(),
        efficiency: headcount > 0 ? (collection / (target / headcount)) * 100 : 0,
        achievement: target > 0 ? (collection / target) * 100 : 0,
        perPersonCollection: headcount > 0 ? collection / headcount : 0
      };
    });
    
    setEfficiencyData(efficiency);
  };

  const downloadExcelReports = () => {
    if (!hasData) return; // Don't download if no data
    
    const excelData = chartData.map(item => ({
      'Process Name': item.name,
      'Target (₹)': item.target,
      'Collection (₹)': item.collection,
      'Headcount': item.headcount,
      'Achievement (%)': efficiencyData.find(e => e.name === item.name)?.achievement || 0,
      'Collection per Person (₹)': efficiencyData.find(e => e.name === item.name)?.perPersonCollection || 0,
      'Date Range': `${formatDate(startDate)} to ${formatDate(endDate)}`
    }));
    
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Process Metrics");
    XLSX.writeFile(wb, "ProcessMetrics.xlsx");
  };

  // Dark mode classes
  const bgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const tableHeaderBg = darkMode ? 'bg-gray-700' : 'bg-gray-50';
  const tableHeaderText = darkMode ? 'text-gray-300' : 'text-gray-500';
  const tableRowBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const tableRowText = darkMode ? 'text-gray-300' : 'text-gray-500';
  const tableRowBorder = darkMode ? 'divide-gray-700' : 'divide-gray-200';
  const titleColor = darkMode ? 'text-indigo-300' : 'text-indigo-700';
  const buttonBg = darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600';
  const buttonText = darkMode ? 'text-white' : 'text-white';
  const chartTextColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  const chartGridColor = darkMode ? '#4B5563' : '#E5E7EB';
  const inputBg = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900';
  const inputText = darkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className={`${bgColor} min-h-screen p-4`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div>
            <label className={`block text-sm font-medium mb-1 ${textColor}`}>Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className={`px-3 py-2 border rounded-md text-sm shadow-sm ${inputBg} ${inputText}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${textColor}`}>End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className={`px-3 py-2 border rounded-md text-sm shadow-sm ${inputBg} ${inputText}`}
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={fetchData}
              className={`px-6 py-2 ${buttonBg} rounded-lg ${buttonText} h-[42px]`}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode('charts')}
            className={`px-4 py-2 rounded-md ${viewMode === 'charts' ? buttonBg : 'bg-gray-200'} ${viewMode === 'charts' ? buttonText : 'text-gray-700'}`}
            disabled={!hasData}
          >
            View Charts
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-md ${viewMode === 'table' ? buttonBg : 'bg-gray-200'} ${viewMode === 'table' ? buttonText : 'text-gray-700'}`}
            disabled={!hasData}
          >
            View Table
          </button>
          <button
            onClick={downloadExcelReports}
            className={`px-4 py-2 rounded-md ${buttonBg} ${buttonText} flex items-center`}
            disabled={loading || !hasData}
          >
            <FaFileExcel className="mr-2" /> Export Excel
          </button>
        </div>
      </div>

      {loading ? (
        <div className={`flex justify-center items-center h-64 ${textColor}`}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : !hasData ? (
        <div className={`flex justify-center items-center h-64 ${textColor}`}>
          <div className="text-center">
            <FaFileAlt className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-lg">Select date range and click Submit to load data</p>
          </div>
        </div>
      ) : (
        <>
          {viewMode === 'charts' ? (
            <div className="space-y-8">
              {/* Target vs Collection Bar Chart */}
              <div className={`rounded-xl shadow-md p-6 ${bgColor} ${borderColor} border`}>
                <h3 className={`text-2xl font-semibold mb-6 ${titleColor} border-b ${borderColor} pb-2`}>
                  Targets vs Collections Across Processes (₹ in Lakhs)
                  <span className={`block text-sm font-normal ${chartTextColor}`}>
                    {formatDate(startDate)} to {formatDate(endDate)}
                  </span>
                </h3>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 50, bottom: 80 }}
                      barSize={40}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={100}
                        tick={{ fontSize: 12, fill: chartTextColor }}
                      />
                      <YAxis 
                        domain={[0, 'dataMax + 100000']}
                        tickFormatter={(value) => `${(value / 100000).toFixed(0)}L`}
                        width={80}
                        tickCount={10}
                        tick={{ fill: chartTextColor }}
                      />
                      <Tooltip 
                        formatter={(value, name) => {
                          const formattedValue = new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0
                          }).format(value);
                          return [formattedValue, name];
                        }}
                        contentStyle={{
                          backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                          borderColor: darkMode ? '#4B5563' : '#E5E7EB',
                          color: darkMode ? '#F3F4F6' : '#111827'
                        }}
                      />
                      <Legend 
                        verticalAlign="top" 
                        height={36}
                        wrapperStyle={{ color: chartTextColor }}
                      />
                      <Bar 
                        dataKey="target" 
                        fill="#8884d8" 
                        name="Target (₹)" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="collection" 
                        fill="#82ca9d" 
                        name="Collection (₹)" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className={`mt-4 text-sm ${chartTextColor}`}>
                  <p>Note: Values displayed in Lakhs (L) where 1L = ₹100,000</p>
                  <p>Highest Target: ₹{Math.max(...chartData.map(item => item.target)).toLocaleString('en-IN')}</p>
                  <p>Total Collection: ₹{chartData.reduce((sum, item) => sum + item.collection, 0).toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Efficiency Metrics */}
              <div className={`rounded-xl shadow-md p-6 ${bgColor} ${borderColor} border`}>
                <h3 className={`text-2xl font-semibold mb-6 ${titleColor} border-b ${borderColor} pb-2`}>
                  Process Performance Metrics
                  <span className={`block text-sm font-normal ${chartTextColor}`}>
                    {formatDate(startDate)} to {formatDate(endDate)}
                  </span>
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Achievement Percentage */}
                  <div className="h-[400px]">
                    <h4 className={`text-lg font-medium mb-4 text-center ${textColor}`}>
                      Target Achievement Percentage
                      <span className={`block text-sm font-normal ${chartTextColor}`}>(Collection vs Target)</span>
                    </h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={efficiencyData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="achievement"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {efficiencyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => {
                            const process = chartData.find(p => p.name === props.payload.name);
                            return [
                              `${value.toFixed(2)}%`,
                              `Target: ₹${process.target.toLocaleString('en-IN')}`,
                              `Collection: ₹${process.collection.toLocaleString('en-IN')}`
                            ];
                          }}
                          contentStyle={{
                            backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                            borderColor: darkMode ? '#4B5563' : '#E5E7EB',
                            color: darkMode ? '#F3F4F6' : '#111827'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Per Person Collection */}
                  <div className="h-[400px]">
                    <h4 className={`text-lg font-medium mb-4 text-center ${textColor}`}>
                      Collection per Employee
                      <span className={`block text-sm font-normal ${chartTextColor}`}>(Total Collection ÷ Headcount)</span>
                    </h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={efficiencyData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={chartGridColor} />
                        <XAxis 
                          type="number" 
                          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                          tick={{ fill: chartTextColor }}
                        />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={120}
                          tick={{ fontSize: 12, fill: chartTextColor }}
                        />
                        <Tooltip 
                          formatter={(value, name, props) => {
                            const process = chartData.find(p => p.name === props.payload.name);
                            return [
                              `₹${value.toLocaleString('en-IN')}`,
                              `Headcount: ${process.headcount}`,
                              `Total: ₹${process.collection.toLocaleString('en-IN')}`
                            ];
                          }}
                          contentStyle={{
                            backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                            borderColor: darkMode ? '#4B5563' : '#E5E7EB',
                            color: darkMode ? '#F3F4F6' : '#111827'
                          }}
                        />
                        <Legend wrapperStyle={{ color: chartTextColor }} />
                        <Bar 
                          dataKey="perPersonCollection" 
                          name="₹ per Employee" 
                          radius={[0, 4, 4, 0]}
                        >
                          {efficiencyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`rounded-xl shadow-md p-6 ${bgColor} ${borderColor} border`}>
              <h3 className={`text-2xl font-semibold mb-6 ${titleColor} border-b ${borderColor} pb-2`}>
                Performance Summary
                <span className={`block text-sm font-normal ${chartTextColor}`}>
                  {formatDate(startDate)} to {formatDate(endDate)}
                </span>
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={tableHeaderBg}>
                    <tr>
                      <th className={`px-4 py-3 text-left text-xs font-medium ${tableHeaderText} uppercase tracking-wider`}>Process</th>
                      <th className={`px-4 py-3 text-left text-xs font-medium ${tableHeaderText} uppercase tracking-wider`}>Target (₹)</th>
                      <th className={`px-4 py-3 text-left text-xs font-medium ${tableHeaderText} uppercase tracking-wider`}>Collection (₹)</th>
                      <th className={`px-4 py-3 text-left text-xs font-medium ${tableHeaderText} uppercase tracking-wider`}>Achievement</th>
                      <th className={`px-4 py-3 text-left text-xs font-medium ${tableHeaderText} uppercase tracking-wider`}>Per Employee (₹)</th>
                      <th className={`px-4 py-3 text-left text-xs font-medium ${tableHeaderText} uppercase tracking-wider`}>Headcount</th>
                    </tr>
                  </thead>
                  <tbody className={`${tableRowBg} divide-y ${tableRowBorder}`}>
                    {chartData.map((item, index) => {
                      const efficiency = efficiencyData.find(e => e.name === item.name);
                      const achievementPercentage = efficiency?.achievement || 0;
                      
                      let achievementClass = "text-red-500";
                      if (achievementPercentage >= 75) achievementClass = "text-green-500";
                      else if (achievementPercentage >= 50) achievementClass = "text-yellow-500";

                      return (
                        <tr key={index} className={index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-gray-50') : tableRowBg}>
                          <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${tableRowText}`}>{item.name}</td>
                          <td className={`px-4 py-4 whitespace-nowrap text-sm ${tableRowText}`}>
                            ₹{item.target.toLocaleString('en-IN')}
                          </td>
                          <td className={`px-4 py-4 whitespace-nowrap text-sm ${tableRowText}`}>
                            ₹{item.collection.toLocaleString('en-IN')}
                          </td>
                          <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${achievementClass}`}>
                            {achievementPercentage.toFixed(2)}%
                          </td>
                          <td className={`px-4 py-4 whitespace-nowrap text-sm ${tableRowText}`}>
                            ₹{Math.round(efficiency?.perPersonCollection || 0).toLocaleString('en-IN')}
                          </td>
                          <td className={`px-4 py-4 whitespace-nowrap text-sm ${tableRowText}`}>
                            {item.headcount}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DashboardContent;













