import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 w-full p-6 bg-gray-100 min-h-screen">
          <Outlet/>
      </main>
    </div>
  );
};

export default MainLayout;
