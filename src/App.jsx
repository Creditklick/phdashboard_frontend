import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React, { useContext } from 'react';

import Login from './components/Pages/Login';
import DashboardSection from './components/Pages/DashbaordSection';
import { authContext } from './components/ContextApi/Contextapi';


// import UploadFilesPage from './components/Pages/UplaodFiles'; 
import AgentDashboard from './components/Agents/AgentDashboard';
import Nothing from './Nothing';





const LayoutWrapper = () => {
 

   const {user , loading , isAuthenticated , isAuthenticatedAgent } = useContext(authContext);


   const ProtectRoute = ({children})=>{

         
      if(loading){
          return <div>Not user Found</div>
      }

      return isAuthenticated ? children : <Navigate to='/'/> 
   }

   const ProtectRouteAgent = ({children})=>{
          if(loading){
               return <div>Agent Not Found</div>
          }

          return isAuthenticatedAgent ? children : <Navigate to='/'/>
   }


  //  if(loading){
  //    console.log("loading statye",loading);
  //    return <div>Loading..</div>
  //  }



    console.log("user found in layout",user);
  

  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route
        path="/home"
        element={
             <ProtectRoute>
               <DashboardSection user={user}/>

             </ProtectRoute>
            
        
        }
      />
      <Route path="/" element={<Login />} />
      <Route
        path="/file/system"
        element={ 
          <ProtectRouteAgent>

          <AgentDashboard/>

          </ProtectRouteAgent>

        }
      />

      <Route path="*" element={<Nothing/>}/>
    </Routes>
  );
};

// 🚀 App Root
function App() {
  return (
    <BrowserRouter basename="/">
      <LayoutWrapper />
    </BrowserRouter>
  );
}

export default App;
