import React, { useEffect } from 'react';
import axios from 'axios';
const Attendance = () => {
  // Generate days for the current month
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);


   

  



  // Dummy attendance data
  const attendanceData = [
    {
      name: 'Agent 1',
      records: ['P', 'A', 'P', 'A', 'A', 'P', 'P', 'A', 'A', 'P', 'P', 'A'] // length should match or be padded
    },
    {
      name: 'Agent 2',
      records: ['A', 'P', 'P', 'P', 'A', 'A', 'A', 'P', 'P', 'P', 'A', 'A']
    }
  ];

  // Helper to count
  const countStatus = (records, status) => records.filter(r => r === status).length;

  return (
    <div className="bg-white p-4 rounded shadow overflow-auto">
      <h2 className="text-xl font-bold mb-4">🕒 Monthly Attendance</h2>
      <table className="min-w-max border border-collapse text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1">Agent</th>
            {days.map(day => (
              <th key={day} className="border px-2 py-1">{day}</th>
            ))}
            <th className="border px-2 py-1 text-green-600">Total P</th>
            <th className="border px-2 py-1 text-red-600">Total A</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((agent, index) => {
            const totalP = countStatus(agent.records, 'P');
            const totalA = countStatus(agent.records, 'A');
            return (
              <tr key={index}>
                <td className="border px-2 py-1 font-medium">{agent.name}</td>
                {days.map((day, i) => (
                  <td key={i} className="border px-2 py-1 text-center">
                    {agent.records[i] || '-'}
                  </td>
                ))}
                <td className="border px-2 py-1 text-center text-green-700 font-bold">{totalP}</td>
                <td className="border px-2 py-1 text-center text-red-700 font-bold">{totalA}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
