import React, { createContext, useEffect, useState } from 'react';
import axios from  'axios';
export const authContext = createContext();

const Contextapi = ({ children }) => {
  

   const [user, setUser] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticatedAgent , setIsAuthenticatedAgent] = useState(false);




     useEffect(() => {
    
            axios.get('https://phdashboard-backend.onrender.com/ph/api/getUser', {
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.user)
          setUser(res.data.user);
          if(res.data.user.role==='Agent'){
               setIsAuthenticatedAgent(true)
          }else{
             setIsAuthenticated(true);
          }
        }
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));

  }, []);



  return (
    <authContext.Provider value={{user,isAuthenticated,setIsAuthenticated,loading , setUser , setIsAuthenticatedAgent , isAuthenticatedAgent}}>
      {children}
    </authContext.Provider>
  );
};

export default Contextapi;
