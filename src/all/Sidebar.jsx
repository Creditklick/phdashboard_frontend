


















// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 text-white h-screen w-12 p-2 fixed shadow-lg flex flex-col items-center space-y-4">
      <div className="text-2xl mt-4">
        📊
      </div>

      <nav className="flex flex-col space-y-4 mt-10 w-full items-center">
        <NavLink
          to="/home"
          title="Dashboard"
          className={({ isActive }) =>
            `w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
              isActive ? 'bg-indigo-600 shadow' : 'hover:bg-gray-700'
            }`
          }
        >
          📊
        </NavLink>

        <NavLink
          to="/attendance"
          title="Attendance"
          className={({ isActive }) =>
            `w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
              isActive ? 'bg-indigo-600 shadow' : 'hover:bg-gray-700'
            }`
          }
        >
          📅
        </NavLink>

        <NavLink
          to="/revenue"
          title="Revenue"
          className={({ isActive }) =>
            `w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
              isActive ? 'bg-indigo-600 shadow' : 'hover:bg-gray-700'
            }`
          }
        >
          💰
        </NavLink>

        <div className="mt-6 flex flex-col space-y-4 items-center w-full">
          <NavLink
            to="/overall"
            title="Overall Comparison"
            className={({ isActive }) =>
              `w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
                isActive ? 'bg-indigo-600 shadow' : 'hover:bg-gray-700'
              }`
            }
          >
            🧮
          </NavLink>

          <NavLink
            to="/esau"
            title="ESAU"
            className={({ isActive }) =>
              `w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
                isActive ? 'bg-indigo-600 shadow' : 'hover:bg-gray-700'
              }`
            }
          >
            🧠
          </NavLink>

          <NavLink
            to="/upload"
            title="Upload"
            className={({ isActive }) =>
              `w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
                isActive ? 'bg-indigo-600 shadow' : 'hover:bg-gray-700'
              }`
            }
          >
            ⬆️
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
