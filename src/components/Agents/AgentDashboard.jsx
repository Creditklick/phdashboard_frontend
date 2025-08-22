import { useState, useEffect, useContext } from 'react';
import { FiUpload, FiSettings, FiLogOut, FiSun, FiMoon, FiUser, FiChevronRight, FiHome, FiBarChart2, FiMail, FiHelpCircle } from 'react-icons/fi';
import UploadFile from './UploadFile';
import Settings from './Settings';
import Paid from './Paid';
import axios from 'axios';
import { ToastContainer , toast } from 'react-toastify';
import { FaTrophy } from "react-icons/fa";
import { FaBullseye } from "react-icons/fa";

import  { authContext } from '../ContextApi/Contextapi';

import AddMilestoneForm from './AddMilestoneForm';
import ListMileStone from './ListMileStone';
import { useNavigate } from 'react-router-dom';
const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);



   const {user } = useContext(authContext);


   const navigate = useNavigate();

   


   useEffect(()=>{
     console.log("Active state is",activeTab);
   },[activeTab])
 

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderComponent = () => {
    switch (activeTab) {
      case 'upload':
        return <UploadFile darkMode={darkMode} />;
      case 'settings':
        return <Settings darkMode={darkMode} />;
      case 'paid':
        return <Paid darkMode = {darkMode}/>;
      case  'milestone':
        return <AddMilestoneForm darkMode = {darkMode}/>
      case 'listmilestone':
         return <ListMileStone darkMode = {darkMode}/>
     
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };





  

  
   const handleLogout = async () => {
    console.log("Call Handle Logout");
    try {
      const response = await axios.post(
        'https://phdashboard-backend.onrender.com/ph/api/logout',
        {},
        { withCredentials: true }
      );

      console.log("Logout successfully", response.data);
      if (response.data.success) {
        toast.success("Logout Successfully");
        setTimeout(() => navigate('/', { replace: true }), 2000);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };




  const navItems = [
    { id: 'home', label: 'Dashboard', icon: <FiHome className="w-5 h-5" /> },
    { id: 'upload', label: 'Upload Files', icon: <FiUpload className="w-5 h-5" /> },
    { id: 'paid', label: 'Paid', icon: <FiBarChart2 className="w-5 h-5" /> },
     { id: 'milestone', label: 'MileStone', icon: <FaTrophy className='w-5 h-5'/>},
     { id: 'listmilestone', label: 'ListMileStone', icon: <FaBullseye className="w-5 h-5" /> },
    { id: 'messages', label: 'Messages', icon: <FiMail className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings className="w-5 h-5" /> },
    { id: 'help', label: 'Help Center', icon: <FiHelpCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static z-30 w-64 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Sidebar header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold flex items-center">
              <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                <FiUser className="w-5 h-5" />
              </span>
              Manager
            </h1>

            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:inline-flex hidden p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <FiChevronRight className={`w-5 h-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-all
                      ${activeTab === item.id 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                      `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom section */}
          <div className="mt-auto space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex items-center">
                {darkMode ? (
                  <FiSun className="w-5 h-5 mr-3 text-yellow-400" />
                ) : (
                  <FiMoon className="w-5 h-5 mr-3 text-gray-600" />
                )}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
              <span className={`inline-block w-10 h-6 rounded-full relative transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <span className={`absolute top-1 left-0 w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-1'}`}></span>
              </span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <FiLogOut className="w-5 h-5 mr-3" />
              Logout
            </button>

            {/* User profile */}
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
                <FiUser className="w-5 h-5" />
              </div>
              <div className="flex-1">
                {user?.email ? user.email.substring(0, 16) + "...." : "User Not Found"}
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.ims_id || "Agent"}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button 
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="lg:hidden p-2 mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              <h2 className="text-xl font-semibold">
                {navItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                  <FiMail className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
                <FiUser className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-auto px-1 mx-auto">
            {renderComponent()}
          </div>
        </main>
        
         <ToastContainer position='top-right' autoClose={300}/>

      </div>
    </div>
  );
};

export default AgentDashboard;