
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

// --- Placeholder for a real MultiSelect component ---
const MultiSelectDropdown = ({ label, options, selected, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <select
      className="border rounded p-2 mt-1 bg-white dark:bg-gray-700 text-sm"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

// --- Helper function for table headers ---
const getOrdinalSuffix = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};


// --- Main React Component ---
function RealMileStone() {
  const [timeData, setTimeData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [data, setData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [filters, setFilters] = useState({ clientName: '', product: '', bucket: '', ph: '', aph: '' });

  const dropdownOptions = {
    clientNames: ['Axis Bank', 'Axis Bank(Citi)', 'Encore ARC', 'Kotak Mahindra Bank', 'MoneyView', 'Poonawalla Fincorp', 'SBI Cards', 'SBI'],
    products: ['Credit Card', 'Personal Loan', 'MFI Loan', 'Agri Loan', 'Unsecured'],
    buckets: ['Woff', 'NPA', 'CD6', 'CD 2', 'Bucket X', 'Bucket 1', 'Bucket 2', 'CD 3-7', 'Recovery'],
    phs: ['Paras Jethwa', 'Deepak Sharma', 'Bharat Choudhary'],
    aphs: ['Arun Arora', 'Kannan Naidu', 'Keshav Kashyap', 'Krishana Rao', 'Suchita Dwivedi', 'Ravindra Singh', 'Naveen Kumar']
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const selectedMonth = months[timeData.month - 1] || "Month";

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i.toString());
    }
    return years;
  };
  const yearsList = generateYears();

  useEffect(() => {
    if (!timeData.month || !timeData.year) return;

    const fetchMonthWiseData = async () => {
      setIsLoadingData(true);
      setFetchError("");
      try {
        const response = await axios.get("https://phdashboard-backend.onrender.com/milestone/senior/milestone", {
          params: { month: timeData.month, year: timeData.year },
        });

        if (response.data.success) {
          const isEmpty = (val) => val === null || val === undefined || val === '' || val === '-';

          const formattedData = response.data.data.map(item => {
            const milestones = {
              '8': { num: parseFloat(item['8th']) || 0, display: isEmpty(item['8th']) ? '-' : item['8th'] },
              '14': { num: parseFloat(item['14th']) || 0, display: isEmpty(item['14th']) ? '-' : item['14th'] },
              '21': { num: parseFloat(item['21th']) || 0, display: isEmpty(item['21th']) ? '-' : item['21th'] },
              '28': { num: parseFloat(item['28th']) || 0, display: isEmpty(item['28th']) ? '-' : item['28th'] },
            };
            const achievements = {
              '8': { num: parseFloat(item['8th_Achievement']) || 0, display: isEmpty(item['8th_Achievement']) ? '-' : item['8th_Achievement'] },
              '14': { num: parseFloat(item['14th_Achievement']) || 0, display: isEmpty(item['14th_Achievement']) ? '-' : item['14th_Achievement'] },
              '21': { num: parseFloat(item['21th_Achievement']) || 0, display: isEmpty(item['21th_Achievement']) ? '-' : item['21th_Achievement'] },
              '28': { num: parseFloat(item['28th_Achievement']) || 0, display: isEmpty(item['28th_Achievement']) ? '-' : item['28th_Achievement'] },
            };

            const calculatePercent = (ach, mil) => {
              if (ach.display === '-' || mil.display === '-') return '-';
              if (mil.num === 0) return '0.00';
              return ((ach.num / mil.num) * 100).toFixed(2);
            };

            return {
              ims_id: item.ims_id, // Added ims_id field
              clientName: item.client_name,
              product: item.product,
              bucket: item.bucket,
              ph: item.ph,
              aph: item.aph,
              allocationCount: isEmpty(item.count_value) ? '-' : item.count_value,
              allocationValueinCr: isEmpty(item.value_in_cr) ? '-' : item.value_in_cr,

              milestones_8th: milestones['8'].display,
              milestones_14th: milestones['14'].display,
              milestones_21st: milestones['21'].display,
              milestones_28th: milestones['28'].display,

              achievement_8th: achievements['8'].display,
              achievement_14th: achievements['14'].display,
              achievement_21st: achievements['21'].display,
              achievement_28th: achievements['28'].display,

              achievement_percent_8th: calculatePercent(achievements['8'], milestones['8']),
              achievement_percent_14th: calculatePercent(achievements['14'], milestones['14']),
              achievement_percent_21st: calculatePercent(achievements['21'], milestones['21']),
              achievement_percent_28th: calculatePercent(achievements['28'], milestones['28']),

              sdlm_8th: isEmpty(item['8th_sdlm']) ? '-' : item['8th_sdlm'],
              sdlm_14th: isEmpty(item['14th_sdlm']) ? '-' : item['14th_sdlm'],
              sdlm_21st: isEmpty(item['21th_sdlm']) ? '-' : item['21th_sdlm'],
              sdlm_28th: isEmpty(item['28th_sdlm']) ? '-' : item['28th_sdlm'],
              
              sdbm_8th: isEmpty(item['8th_sdbm']) ? '-' : item['8th_sdbm'],
              sdbm_14th: isEmpty(item['14th_sdbm']) ? '-' : item['14th_sdbm'],
              sdbm_21st: isEmpty(item['21th_sdbm']) ? '-' : item['21th_sdbm'],
              sdbm_28th: isEmpty(item['28th_sdbm']) ? '-' : item['28th_sdbm'],
            };
          });
          setData(formattedData);
        } else {
          setData([]);
          setFetchError(response.data.message || "Failed to fetch data.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setFetchError("An error occurred while fetching data.");
        setData([]);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchMonthWiseData();
  }, [timeData]);
  
  const filteredTableData = useMemo(() => {
    return data.filter(item => (
      (filters.clientName ? item.clientName === filters.clientName : true) &&
      (filters.product ? item.product === filters.product : true) &&
      (filters.bucket ? item.bucket === filters.bucket : true) &&
      (filters.ph ? item.ph === filters.ph : true) &&
      (filters.aph ? item.aph === filters.aph : true)
    ));
  }, [data, filters]);

  return (
    <div className="px-2 py-1">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-xl">MileStone Listing</h1>
        <div className="flex space-x-4">
          <select className="border rounded p-2" value={timeData.month} onChange={(e) => setTimeData(prev => ({ ...prev, month: e.target.value }))}>
            <option value="">Select Month</option>
            {months.map((value, index) => <option key={index} value={index + 1}>{value}</option>)}
          </select>
          <select className="border rounded p-2" value={timeData.year} onChange={(e) => setTimeData(prev => ({ ...prev, year: e.target.value }))}>
            <option value="">Select Year</option>
            {yearsList.map((value, index) => <option key={index} value={value}>{value}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <MultiSelectDropdown label="Client Name" options={dropdownOptions.clientNames} selected={filters.clientName} onChange={(val) => setFilters({ ...filters, clientName: val })} />
        <MultiSelectDropdown label="Product" options={dropdownOptions.products} selected={filters.product} onChange={(val) => setFilters({ ...filters, product: val })} />
        <MultiSelectDropdown label="Bucket" options={dropdownOptions.buckets} selected={filters.bucket} onChange={(val) => setFilters({ ...filters, bucket: val })} />
        <MultiSelectDropdown label="PH" options={dropdownOptions.phs} selected={filters.ph} onChange={(val) => setFilters({ ...filters, ph: val })} />
        <MultiSelectDropdown label="APH" options={dropdownOptions.aphs} selected={filters.aph} onChange={(val) => setFilters({ ...filters, aph: val })} />
        <div className="flex items-end">
             <button onClick={() => setFilters({ clientName: '', product: '', bucket: '', ph: '', aph: '' })} className="bg-gray-200 px-4 py-2 rounded-md text-sm w-full text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" aria-label="Clear all filters">
               Clear
             </button>
        </div>
      </div>

      <div className="rounded-md max-w-sm md:max-w-2xl lg:max-w-5xl xl:max-w-7xl border overflow-x-auto bg-white dark:bg-gray-800 shadow-md">
        <table className="min-w-full w-full border-collapse text-sm text-center">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white sticky top-0">
            <tr>
              <th rowSpan="2" className="border px-2 py-2">IMSID</th> {/* Added new header */}
              <th rowSpan="2" className="border px-2 py-2">Client Name</th>
              <th rowSpan="2" className="border px-2 py-1">Product</th>
              <th rowSpan="2" className="border px-2 py-1">Bucket</th>
              <th rowSpan="2" className="border px-2 py-1">PH</th>
              <th rowSpan="2" className="border px-2 py-1">APH</th>
              <th colSpan="2" className="border px-2 py-1">Allocation</th>
              <th colSpan="4" className="border px-2 py-1">{selectedMonth} Milestones</th>
              <th colSpan="4" className="border px-2 py-1">Achievement</th>
              <th colSpan="4" className="border px-2 py-1">Achievement %</th>
              <th colSpan="4" className="border px-2 py-1">SDLM</th>
              <th colSpan="4" className="border px-2 py-1">SDBM</th>
            </tr>
            <tr className="bg-gray-100 dark:bg-gray-600">
              <th className="border px-2 py-1 font-medium">Count</th>
              <th className="border px-2 py-1 font-medium">Value in Cr</th>
              {[8, 14, 21, 28].map(d => <th key={`m${d}`} className="border px-2 py-1 font-medium">{d}{getOrdinalSuffix(d)}</th>)}
              {[8, 14, 21, 28].map(d => <th key={`a${d}`} className="border px-2 py-1 font-medium">{d}{getOrdinalSuffix(d)}</th>)}
              {[8, 14, 21, 28].map(d => <th key={`ap${d}`} className="border px-2 py-1 font-medium">{d}{getOrdinalSuffix(d)}</th>)}
              {[8, 14, 21, 28].map(d => <th key={`sd${d}`} className="border px-2 py-1 font-medium">{d}{getOrdinalSuffix(d)}</th>)}
              {[8, 14, 21, 28].map(d => <th key={`sb${d}`} className="border px-2 py-1 font-medium">{d}{getOrdinalSuffix(d)}</th>)}
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {isLoadingData ? (
              <tr><td colSpan="28" className="text-center py-4">Loading...</td></tr>
            ) : filteredTableData.length > 0 ? (
              filteredTableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="border px-2 py-1">{row?.ims_id   || "N/A"}</td> {/* Added new data cell */}
                  <td className="border px-2 py-1 text-left">{row?.clientName  || "N/A"}</td>
                  <td className="border px-2 py-1 text-left">{row?.product  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.bucket  || "N/A" }</td>
                  <td className="border px-2 py-1 text-left">{row?.ph  || "N/A"}</td>
                  <td className="border px-2 py-1 text-left">{row?.aph  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.allocationCount  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.allocationValueinCr  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.milestones_8th  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.milestones_14th  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.milestones_21st  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.milestones_28th  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.achievement_8th  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.achievement_14th  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.achievement_21st  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.achievement_28th  || "N/A"}</td>
                  
                  {/* Conditionally add the % sign */}
                  <td className="border px-2 py-1">{row?.achievement_percent_8th  || "N/A" }{row?.achievement_percent_8th !== '-' ? '%' : ''}</td>
                  <td className="border px-2 py-1">{row?.achievement_percent_14th  || "N/A"}{row?.achievement_percent_14th !== '-' ? '%' : ''}</td>
                  <td className="border px-2 py-1">{row?.achievement_percent_21st  || "N/A"}{row?.achievement_percent_21st !== '-' ? '%' : ''}</td>
                  <td className="border px-2 py-1">{row?.achievement_percent_28th  || "N/A"}{row?.achievement_percent_28th !== '-' ? '%' : ''}</td>
                  
                  <td className="border px-2 py-1">{row?.sdlm_8th  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.sdlm_14th  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.sdlm_21st  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.sdlm_28th  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.sdbm_8th  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.sdbm_14th  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.sdbm_21st  || "N/A"}</td>
                  <td className="border px-2 py-1">{row?.sdbm_28th || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="28" className="text-center py-4">{fetchError || "No data available for the selected criteria."}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RealMileStone;



