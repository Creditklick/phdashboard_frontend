import React, { useState, useEffect, useRef } from "react";

const Overall = ({ darkMode }) => {
  const canvasRef = useRef(null);

  // Dark mode classes
  const bgColor = darkMode ? "bg-gray-900" : "bg-white";
  const textColor = darkMode ? "text-gray-100" : "text-gray-800";
  const cardBgColor = darkMode ? "bg-gray-800" : "bg-gray-50";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const statCardBg = darkMode ? "bg-gray-700/50" : "bg-white";
  const statCardBorder = darkMode ? "border-gray-600" : "border-gray-200";
  const statValueColor = darkMode ? "text-blue-400" : "text-blue-600";
  const statLabelColor = darkMode ? "text-gray-300" : "text-gray-600";

  // Initialize particle animation
  useEffect(() => {
    if (!darkMode) return; // Only show particles in dark mode

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = darkMode
          ? `hsla(${Math.random() * 360}, 70%, 60%, 0.3)`
          : `hsla(${Math.random() * 360}, 70%, 60%, 0.1)`;
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
      canvas.width = canvas.parentElement.clientWidth;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [darkMode]);

  return (
    <div className={`p-6 ${bgColor} ${textColor} min-h-screen`}>
      <h2 className="text-2xl font-bold mb-6">Overall Analytics</h2>

      {/* Particle background (only in dark mode) */}
      {darkMode && (
        <div className="relative h-[300px] w-full mb-8 overflow-hidden rounded-xl">
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full opacity-20"
          />
          <div
            className={`absolute inset-0 flex items-center justify-center ${cardBgColor} bg-opacity-70 rounded-xl`}
          >
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">
                Interactive Analytics Dashboard
              </h3>
              <p className="text-sm opacity-80">
                {darkMode
                  ? "Visualizing your data with dynamic particles"
                  : "Explore comprehensive analytics insights"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            value: "1,248",
            label: "Total Processes",
            change: "+12%",
            trend: "up",
          },
          {
            value: "₹2.4M",
            label: "Total Allocated",
            change: "+8.5%",
            trend: "up",
          },
          {
            value: "₹1.8M",
            label: "Total Recovered",
            change: "+5.2%",
            trend: "up",
          },
          {
            value: "76.3%",
            label: "Avg Recovery Rate",
            change: "-1.3%",
            trend: "down",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`${statCardBg} ${statCardBorder} border rounded-xl p-6 shadow-sm transition-all hover:shadow-md`}
          >
            <div className={`text-3xl font-bold ${statValueColor} mb-2`}>
              {stat.value}
            </div>
            <div className={`text-sm ${statLabelColor}`}>{stat.label}</div>
            <div
              className={`mt-2 text-xs flex items-center ${
                stat.trend === "up"
                  ? darkMode
                    ? "text-green-400"
                    : "text-green-600"
                  : darkMode
                  ? "text-red-400"
                  : "text-red-600"
              }`}
            >
              {stat.change} {stat.trend === "up" ? "↑" : "↓"}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Overview */}
        <div
          className={`${cardBgColor} ${borderColor} border rounded-xl p-6 lg:col-span-2`}
        >
          <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
          <div className="h-64 bg-gray-500/10 rounded flex items-center justify-center">
            <p className="text-gray-500">
              Chart visualization would appear here
            </p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {["Under", "Average", "Excellent"].map((type) => (
              <div key={type} className="text-center">
                <div
                  className={`text-lg font-medium ${
                    type === "Under"
                      ? darkMode
                        ? "text-red-400"
                        : "text-red-600"
                      : type === "Average"
                      ? darkMode
                        ? "text-yellow-400"
                        : "text-yellow-600"
                      : darkMode
                      ? "text-green-400"
                      : "text-green-600"
                  }`}
                >
                  {type === "Under"
                    ? "12%"
                    : type === "Average"
                    ? "34%"
                    : "54%"}
                </div>
                <div className="text-sm text-gray-500">{type} Performers</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className={`${cardBgColor} ${borderColor} border rounded-xl p-6`}>
          <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
          <div className="space-y-4">
            {[
              { name: "Ravi Sharma", process: "Proc A", recovery: "92%" },
              { name: "Neha Patel", process: "Proc B", recovery: "89%" },
              { name: "Sita Kumar", process: "Proc A", recovery: "87%" },
              { name: "Amit Singh", process: "Proc C", recovery: "85%" },
            ].map((performer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{performer.name}</div>
                  <div className="text-sm text-gray-500">
                    {performer.process}
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    darkMode
                      ? "bg-blue-900/50 text-blue-300"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {performer.recovery}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className={`${cardBgColor} ${borderColor} border rounded-xl p-6 mt-6`}
      >
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr
                className={`${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } border-b`}
              >
                <th className="py-2 px-4 text-left">Agent</th>
                <th className="py-2 px-4 text-left">Process</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  agent: "Ravi",
                  process: "Proc A",
                  amount: "₹12,500",
                  status: "Completed",
                },
                {
                  agent: "Neha",
                  process: "Proc B",
                  amount: "₹8,200",
                  status: "In Progress",
                },
                {
                  agent: "Sita",
                  process: "Proc A",
                  amount: "₹15,000",
                  status: "Completed",
                },
                {
                  agent: "Amit",
                  process: "Proc C",
                  amount: "₹5,750",
                  status: "Pending",
                },
              ].map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700/50"
                      : "border-gray-200 hover:bg-gray-50"
                  } border-b`}
                >
                  <td className="py-3 px-4">{item.agent}</td>
                  <td className="py-3 px-4">{item.process}</td>
                  <td className="py-3 px-4">{item.amount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "Completed"
                          ? darkMode
                            ? "bg-green-900/50 text-green-300"
                            : "bg-green-100 text-green-800"
                          : item.status === "In Progress"
                          ? darkMode
                            ? "bg-yellow-900/50 text-yellow-300"
                            : "bg-yellow-100 text-yellow-800"
                          : darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overall;
