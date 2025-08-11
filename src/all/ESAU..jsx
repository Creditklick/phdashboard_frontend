
import React, { useState } from 'react';

const ESAU = () => {
  const rawData = [
    { process: 'Proc A', am: 'AM1', tl: 'TL1', agent: 'Ravi', allocated: 10000, recovered: 6000 },
    { process: 'Proc A', am: 'AM1', tl: 'TL1', agent: 'Ravi', allocated: 8000, recovered: 4000 },
    { process: 'Proc B', am: 'AM2', tl: 'TL2', agent: 'Neha', allocated: 12000, recovered: 11000 },
    { process: 'Proc A', am: 'AM1', tl: 'TL1', agent: 'Sita', allocated: 15000, recovered: 8000 },
    { process: 'Proc B', am: 'AM2', tl: 'TL2', agent: 'Neha', allocated: 2000, recovered: 1500 },
  ];

  const [filters, setFilters] = useState({ process: '', am: '', tl: '', esau: '' });

  const getESAUCategory = (percent) => {
    if (percent < 50) return 'Under Performer';
    if (percent < 80) return 'Average Performer';
    if (percent <= 95) return 'Excellent Performer';
    return 'Over Achiever';
  };

  // Group agent data
  const grouped = {};
  rawData.forEach((item) => {
    const key = `${item.agent}-${item.process}-${item.am}-${item.tl}`;
    if (!grouped[key]) {
      grouped[key] = { ...item };
    } else {
      grouped[key].allocated += item.allocated;
      grouped[key].recovered += item.recovered;
    }
  });

  const groupedData = Object.values(grouped)
    .map((item) => {
      const percent = ((item.recovered / item.allocated) * 100).toFixed(2);
      return {
        ...item,
        percent,
        esauRating: getESAUCategory(percent),
      };
    })
    .filter(item =>
      (!filters.process || item.process === filters.process) &&
      (!filters.am || item.am === filters.am) &&
      (!filters.tl || item.tl === filters.tl) &&
      (!filters.esau || item.esauRating === filters.esau)
    );

  const uniqueValues = (key) => [...new Set(rawData.map((item) => item[key]))];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">🧠 ESAU Performance Summary</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {['process', 'am', 'tl'].map((key) => (
          <select
            key={key}
            value={filters[key]}
            onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">{`Select ${key.toUpperCase()}`}</option>
            {uniqueValues(key).map((val, idx) => (
              <option key={idx} value={val}>{val}</option>
            ))}
          </select>
        ))}

        {/* ESAU Filter */}
        <select
          value={filters.esau}
          onChange={(e) => setFilters({ ...filters, esau: e.target.value })}
          className="border rounded-lg p-2 w-full"
        >
          <option value="">Filter by ESAU</option>
          <option value="Under Performer">Under Performer</option>
          <option value="Average Performer">Average Performer</option>
          <option value="Excellent Performer">Excellent Performer</option>
          <option value="Over Achiever">Over Achiever</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
        <table className="min-w-full">
          <thead>
            <tr className="bg-indigo-100 text-indigo-700 text-left">
              <th className="py-2 px-4">Process</th>
              <th className="py-2 px-4">AM</th>
              <th className="py-2 px-4">TL</th>
              <th className="py-2 px-4">Agent</th>
              <th className="py-2 px-4">Allocated</th>
              <th className="py-2 px-4">Recovered</th>
              <th className="py-2 px-4">Recovery %</th>
              <th className="py-2 px-4">ESAU</th>
            </tr>
          </thead>
          <tbody>
            {groupedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="py-2 px-4">{row.process}</td>
                <td className="py-2 px-4">{row.am}</td>
                <td className="py-2 px-4">{row.tl}</td>
                <td className="py-2 px-4">{row.agent}</td>
                <td className="py-2 px-4">₹{row.allocated.toLocaleString()}</td>
                <td className="py-2 px-4">₹{row.recovered.toLocaleString()}</td>
                <td className="py-2 px-4">{row.percent}%</td>
                <td className={`py-2 px-4 font-semibold ${
                  row.esauRating === 'Over Achiever' ? 'text-green-600' :
                  row.esauRating === 'Excellent Performer' ? 'text-emerald-600' :
                  row.esauRating === 'Average Performer' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {row.esauRating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {groupedData.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No data matches the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default ESAU;
