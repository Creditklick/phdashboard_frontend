// // src/components/Overall.js
// import React, { useState } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';

// const Overall = () => {
//   const rawData = [
//     { process: 'Proc A', am: 'AM1', tl: 'TL1', agent: 'Ravi', allocated: 10000, recovered: 6000 },
//     { process: 'Proc A', am: 'AM1', tl: 'TL1', agent: 'Ravi', allocated: 5000, recovered: 3000 },
//     { process: 'Proc B', am: 'AM2', tl: 'TL2', agent: 'Neha', allocated: 12000, recovered: 11000 },
//     { process: 'Proc A', am: 'AM1', tl: 'TL1', agent: 'Sita', allocated: 15000, recovered: 8000 },
//     { process: 'Proc C', am: 'AM3', tl: 'TL3', agent: 'Amit', allocated: 20000, recovered: 19500 },
//     { process: 'Proc A', am: 'AM1', tl: 'TL1', agent: 'Ravi5', allocated: 10000, recovered: 6000 },
//     { process: 'Proc A', am: 'AM1', tl: 'TL1', agent: 'Ravi', allocated: 5000, recovered: 3000 },
//     { process: 'Proc B', am: 'AM2', tl: 'TL2', agent: 'Neha0', allocated: 12000, recovered: 11000 },
//     { process: 'Proc A', am: 'AM1', tl: 'TL4', agent: 'Sita9', allocated: 15000, recovered: 8000 },
//     { process: 'Proc C', am: 'AM3', tl: 'TL3', agent: 'Amit4', allocated: 20000, recovered: 19500 },
//     { process: 'Proc A', am: 'AM4', tl: 'TL1', agent: 'Ravi6', allocated: 10000, recovered: 6000 },
//     { process: 'Proc A', am: 'AM1', tl: 'TL1', agent: 'Ravi', allocated: 5000, recovered: 3000 },
//     { process: 'Proc B', am: 'AM2', tl: 'TL2', agent: 'Neha4', allocated: 12000, recovered: 11000 },
//     { process: 'Proc A', am: 'AM1', tl: 'TL1', agent: 'Sita2', allocated: 15000, recovered: 8000 },
//     { process: 'Proc C', am: 'AM3', tl: 'TL3', agent: 'Amit1', allocated: 20000, recovered: 19500 },
//   ];

//   // Group data by Agent (for table)
//   const aggregatedData = Object.values(
//     rawData.reduce((acc, row) => {
//       const key = row.agent;
//       if (!acc[key]) {
//         acc[key] = { ...row };
//       } else {
//         acc[key].allocated += row.allocated;
//         acc[key].recovered += row.recovered;
//       }
//       return acc;
//     }, {})
//   ).map((row) => ({
//     ...row,
//     recoveryPercent: ((row.recovered / row.allocated) * 100).toFixed(2),
//     esau:
//       row.recovered / row.allocated < 0.5
//         ? 'Under Performer'
//         : row.recovered / row.allocated < 0.8
//         ? 'Average Performer'
//         : row.recovered / row.allocated <= 0.95
//         ? 'Excellent Performer'
//         : 'Over Achiever',
//   }));

//   // Group data by AM (for chart)
//   const amData = Object.values(
//     rawData.reduce((acc, row) => {
//       const key = row.am;
//       if (!acc[key]) {
//         acc[key] = { am: row.am, allocated: 0, recovered: 0 };
//       }
//       acc[key].allocated += row.allocated;
//       acc[key].recovered += row.recovered;
//       return acc;
//     }, {})
//   );

//   const [filterProcess, setFilterProcess] = useState('');
//   const processes = [...new Set(rawData.map((d) => d.process))];

//   const filteredTableData = aggregatedData.filter((row) =>
//     filterProcess ? row.process === filterProcess : true
//   );

//   const filteredChartData = amData.filter((row) => {
//     if (!filterProcess) return true;
//     return rawData.some(d => d.am === row.am && d.process === filterProcess);
//   });

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-indigo-700 mb-6">📈 Overall Comparison</h1>

//       {/* Filter by Process */}
//       <div className="mb-6">
//         <label className="font-medium text-gray-700 mr-2">Filter by Process:</label>
//         <select
//           value={filterProcess}
//           onChange={(e) => setFilterProcess(e.target.value)}
//           className="border p-2 rounded-lg"
//         >
//           <option value="">All Processes</option>
//           {processes.map((proc) => (
//             <option key={proc} value={proc}>{proc}</option>
//           ))}
//         </select>
//       </div>

//       {/* AM-Wise Chart */}
//       <div className="bg-white p-6 rounded-xl shadow-md mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-indigo-600">AM-wise Recovery Chart</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={filteredChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//             <XAxis dataKey="am" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="allocated" fill="#8884d8" name="Allocated" />
//             <Bar dataKey="recovered" fill="#82ca9d" name="Recovered" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
//         <table className="min-w-full">
//           <thead>
//             <tr className="bg-indigo-100 text-indigo-700 text-left">
//               <th className="py-2 px-4">Process</th>
//               <th className="py-2 px-4">AM</th>
//               <th className="py-2 px-4">TL</th>
//               <th className="py-2 px-4">Agent</th>
//               <th className="py-2 px-4">Allocated</th>
//               <th className="py-2 px-4">Recovered</th>
//               <th className="py-2 px-4">Recovery %</th>
//               <th className="py-2 px-4">ESAU</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTableData.map((row, idx) => (
//               <tr key={idx} className="hover:bg-gray-100">
//                 <td className="py-2 px-4">{row.process}</td>
//                 <td className="py-2 px-4">{row.am}</td>
//                 <td className="py-2 px-4">{row.tl}</td>
//                 <td className="py-2 px-4">{row.agent}</td>
//                 <td className="py-2 px-4">₹{row.allocated.toLocaleString()}</td>
//                 <td className="py-2 px-4">₹{row.recovered.toLocaleString()}</td>
//                 <td className="py-2 px-4">{row.recoveryPercent}%</td>
//                 <td className="py-2 px-4">{row.esau}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {filteredTableData.length === 0 && (
//           <p className="text-center text-gray-500 mt-4">No matching data found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Overall;







import React, { useEffect, useRef } from 'react';

const Overall = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Particle animation setup
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 600;
    
    const particles = [];
    const particleCount = 150;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      requestAnimationFrame(animateParticles);
    };
    
    createParticles();
    animateParticles();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="relative min-h-[600px] overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
      {/* Particle background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full opacity-30"
      />
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mix-blend-soft-light opacity-30 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-soft-light opacity-30 blur-3xl animate-float animation-delay-2000"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo with 3D effect */}
          <div className="mb-12 md:mb-0">
            <div className="relative w-32 h-32 cursor-pointer transform transition-all duration-700 hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-x-15 rotate-y-15 transition-transform duration-700 hover:rotate-y-30">
                <span className="text-4xl font-bold">3D</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center transform -rotate-x-15 -rotate-y-15 transition-transform duration-700 hover:-rotate-y-30">
                <span className="text-4xl font-bold">UI</span>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="mb-12 md:mb-0">
            <ul className="flex flex-wrap justify-center gap-6">
              {['Home', 'Features', 'Products', 'Solutions', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="relative py-2 px-4 font-medium hover:text-cyan-300 transition-colors duration-300 group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Hero section with 3D card */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="relative">
            <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700/50 shadow-2xl overflow-hidden transform transition-all duration-700 hover:rotate-y-3 hover:rotate-x-1">
              {/* Floating particles inside card */}
              <div className="absolute top-8 right-8 w-6 h-6 rounded-full bg-cyan-400/20 animate-pulse"></div>
              <div className="absolute bottom-12 left-10 w-4 h-4 rounded-full bg-purple-400/20 animate-pulse animation-delay-1000"></div>
              <div className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-pink-400/20 animate-pulse animation-delay-1500"></div>
              
              <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  <span className="block">Next Generation</span>
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    3D UI Experiences
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 max-w-2xl mb-10">
                  Transform your digital presence with cutting-edge 3D animations and interactive interfaces that captivate your audience and elevate your brand.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1">
                    Get Started
                  </button>
                  <button className="px-8 py-4 bg-transparent border-2 border-cyan-500/50 rounded-xl font-bold hover:bg-cyan-500/10 transition-colors duration-300">
                    View Demo
                  </button>
                </div>
              </div>
            </div>
            
            {/* 3D floating elements around card */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl transform rotate-12 shadow-2xl z-0 animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl transform -rotate-12 shadow-2xl z-0 animate-float animation-delay-1000"></div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="max-w-5xl mx-auto mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '99.9%', label: 'Uptime' },
              { value: '4.8x', label: 'Engagement' },
              { value: '3D', label: 'Animations' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="text-3xl font-bold text-cyan-300 mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overall