




import React, { useState, useEffect } from 'react';
import { FaChartLine, FaShoppingCart, FaUsers, FaCog, FaBox, FaBell, FaSearch, FaUserCircle, FaHome, FaFileAlt, FaCalendarAlt, FaChartBar } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import Reports from './../Pages/Reports';
import Overall from './Overall';
import ESAU from './ESAU';
import Attendance from './Attendence';
import Setting from './Setting';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineUserAdd } from "react-icons/ai";
import Signup from './Signup';
import AddTarget from './AddTarget';
import { FaAddressBook } from "react-icons/fa";
import DashboardContent from './DashboardContent';
import { MilestoneIcon } from 'lucide-react';
// import MileStoneReports from './MileStoneReports/MileStoneReports'
import RealMileStone from './MileStoneReports/RealMileStone'
import { FaCheckCircle } from "react-icons/fa";
const DashboardSection = ({ user }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const [distuser,setDistUser] = useState([]);

  // const [processdata , setProcessData] = useState([]);

  useEffect(() => {
    console.log("Active State", activeSection);
    console.log("user is dashboard", user?.email);
  }, [activeSection]);




  useEffect(()=>{
        const fetchattendance_type = async()=>{
             try{
                   const response = await axios.get('https://phdashboard-backend.onrender.com/ph/api/attendance/getdistint');
                   console.log("data in dashboar render",response.data);
                   setDistUser(response.data);
             }
             catch(err){

                  console.log("Error in Getting getdistinct ",err.response.data.message);
             }
        
            }





          
        
          


        fetchattendance_type();
  },[])



 

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
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };







  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Top Navigation */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 flex justify-between items-center`}>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
            <FaHome className="text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">PH DASHBOARD</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full px-4 py-2 flex items-center`}>
            <FaSearch className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input 
              type="text" 
              placeholder="Search..." 
              className={`ml-2 bg-transparent focus:outline-none ${darkMode ? 'text-white' : 'text-gray-900'} w-40`}
            />
          </div>
          
          <button className={`relative p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
            <FaBell className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mr-3">
              <FaUserCircle className="text-white text-xl" />
            </div>
            <div>
              <div className="font-medium">{user?.email}</div>
              <div className="text-sm text-gray-400">id: {user?.ims_id || "No User Found"}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
          <div className="mb-8">
            <h2 className="text-xs uppercase font-semibold text-gray-500 mb-4">Navigation</h2>
            <nav>
              {[
                { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine /> },
                { id: 'Reports', label: 'Reports', icon: <FaFileAlt /> },
                { id: 'Overall', label: 'Overall', icon: <FaChartBar /> },
                { id: 'ESAU', label: 'ESAU', icon: <FaShoppingCart /> },
                { id: 'Attendence', label: 'Attendence', icon: <FaCalendarAlt /> },

               
                { id : 'adduser' , label : "Add User" , icon : <AiOutlineUserAdd/> },
                 {id : 'addtarget', label : "Add Target", icon : <FaAddressBook/>},
                //  {id : 'milestone' , label : "Add MileStone" , icon : <MilestoneIcon/>},
                 {id : "realmilestone"  , label : "MileStone"  , icon :  <FaCheckCircle/>},
                 { id: 'Settings', label: 'Settings', icon: <FaCog /> },
                {
  id: 'Logout',
  label: 'Logout',
  icon: <FiLogOut style={{ color: 'red' }} />
}
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'Logout') {
                      handleLogout();
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                    item.id !== 'Logout' && activeSection === item.id 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border-l-4 border-cyan-500' 
                      : `${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          
          </div>
          
      
        </div>
          
        {/* Main Content Area */}
        <div className="flex-1 min-h-screen">
          {activeSection === 'dashboard' && <DashboardContent darkMode={darkMode}/>}
          {activeSection === 'Reports' && <Reports  darkMode={darkMode}/>}
          {activeSection === 'Overall' && <Overall darkMode={darkMode} />}
          {activeSection === 'ESAU' && <ESAU darkMode={darkMode}/>}
          {activeSection === 'Attendence' && <Attendance darkmode={darkMode} distuser={distuser}/>}
          {activeSection === 'Settings' && <Setting darkMode={darkMode} />}
          {activeSection==='adduser' && <Signup darkMode={darkMode}/>}
          {activeSection==='addtarget' && <AddTarget darkmode={darkMode}/>}
          {/* {activeSection==='milestone' && <MileStoneReports darkMode={darkMode}/>} */}
          {activeSection==='realmilestone' && <RealMileStone darkMode={darkMode}/>}
          
    
        </div>
      </div>
      
      <ToastContainer position='top-right' autoClose={3000}/>
    </div>
  );
};

export default DashboardSection;