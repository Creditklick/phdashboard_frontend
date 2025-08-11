
















import React, { useState, useRef, useEffect , useContext } from 'react';
import { FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { authContext } from '../ContextApi/Contextapi'; // ✅ Import context
 
const Login = () => {

  

  const [openState, setOpenState] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    selectedRole: ''
  });
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [otpInputs, setOtpInputs] = useState(Array(6).fill(''));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const { setUser, setIsAuthenticated , setIsAuthenticatedAgent } = useContext(authContext);



  const handlePassword = () => {
    setOpenState(!openState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (step === 1) {
        const response = await axios.post('https://phdashboard-backend.onrender.com/ph/api/login', formData);
        if(response.data.success){
          setStep(2);
        }
      } else {
        await verifyOtp(formData.email, otp);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const response = await axios.post('https://phdashboard-backend.onrender.com/ph/api/verify', {
        email,
        otp
      },{withCredentials : true});

       console.log("response after verify",response.data.user.role);

      if(response.data.success && response.data.user.role==='Senior'){
          toast.success("Login Successfully");
           setUser(response.data.user);
      setIsAuthenticated(true);
          setTimeout(()=>{
               navigate('/home');     
          },200);
      }

      if(response.data.success && response.data.user.role==='Agent'){
            
        
             toast.success("Login Successfully");
           setUser(response.data.user);
           setIsAuthenticatedAgent(true);
          setTimeout(()=>{
               navigate('/file/system');     
          },200);


      }
      setOtp('');
      console.log("Respone After Verify",response.data);
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post('https://phdashboard-backend.onrender.com/ph/api/resendOtp', {
        email: formData.email
      });
      
      if (response.data.success) {
        toast.success('New OTP sent to your email');
        setOtp('');
        setOtpInputs(Array(6).fill(''));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (value && !/^[0-9]$/.test(value)) return;
    
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);
    
    // Update the combined OTP string
    setOtp(newOtpInputs.join(''));
    
    // Auto focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    
    // Auto focus to previous input on backspace
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };



  const handleBack = ()=>{
      setStep(1);
      setOtp('');
       setOtpInputs(Array(6).fill(''));
  }


  useEffect(()=>{

  })

  useEffect(()=>{
      console.log("setOtp is ",otp);
  },[setStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white overflow-hidden relative">
      <div className="flex h-screen">
        {/* Left side - Static Content */}
        <div className="hidden lg:flex flex-col justify-center items-center w-1/2 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/30 backdrop-blur-sm z-0"></div>
          
          {/* Static Cube */}
          <div className="relative w-64 h-64 mb-12">
            <div className="relative w-full h-full">
              {/* Front face */}
              <div className="absolute w-full h-full bg-gradient-to-br from-blue-600/80 to-indigo-800/80 border border-blue-500/50 shadow-2xl flex items-center justify-center">
                <span className="text-2xl font-bold"></span>
              </div>
            </div>
          </div>
          
          {/* Static orbs */}
          <div className="absolute top-[20%] left-[15%] w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-lg"></div>
          <div className="absolute bottom-[25%] right-[20%] w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-lg"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center max-w-lg">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
               DASHBOARD
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Transform your product management with our cutting-edge dashboard solution
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item}
                  className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 shadow-lg"
                >
                  <div className="text-2xl font-bold text-cyan-300 mb-1">{item * 20}%</div>
                  <div className="text-sm text-gray-300">Growth</div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span>Real-time Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Secure Access</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative">
          <div className="w-full max-w-md">
            {step === 1 ? (
              <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-8 right-8 w-6 h-6 rounded-full bg-cyan-400/20"></div>
                <div className="absolute bottom-12 left-10 w-4 h-4 rounded-full bg-purple-400/20"></div>
                
                <div className="mb-8 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl shadow-2xl flex items-center justify-center">
                        <span className="text-xl font-bold"></span>
                      </div>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                   DASHBOARD
                  </h1>
                  <p className="mt-2 text-gray-300">Fast & Easy Product Management</p>
                </div>
                
                <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back!</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      required
                      value={formData.email}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                        Password
                      </label>
                      <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        type={openState ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 pr-12"
                        required
                        value={formData.password}
                      />
                      <button
                        type="button"
                        onClick={handlePassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {openState ? 
                          <IoEyeSharp className="w-5 h-5" /> : 
                          <FaEyeSlash className="w-5 h-5" />
                        }
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Select Role
                    </label>
                    <div className="flex gap-6 justify-center">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="radio"
                            name="role"
                            value="Agent"
                            checked={formData.selectedRole === 'Agent'}
                            onChange={(e) => setFormData({ ...formData, selectedRole: e.target.value })}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 ${
                            formData.selectedRole === 'Agent' 
                              ? 'border-cyan-500 bg-cyan-500/20' 
                              : 'border-gray-500'
                          }`}>
                            {formData.selectedRole === 'Agent' && (
                              <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Agent</span>
                      </label>
                      
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="radio"
                            name="role"
                            value="Senior"
                            checked={formData.selectedRole === 'Senior'}
                            onChange={(e) => setFormData({ ...formData, selectedRole: e.target.value })}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 ${
                            formData.selectedRole === 'Senior' 
                              ? 'border-cyan-500 bg-cyan-500/20' 
                              : 'border-gray-500'
                          }`}>
                            {formData.selectedRole === 'Senior' && (
                              <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Senior</span>
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Processing...' : 'Login'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
                
                <div className="mt-8 text-center text-sm text-gray-400">
                  <p>
                    Don't have an account?{' '}
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                      Sign up
                    </a>
                  </p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <a href="#" className="hover:text-cyan-300 transition-colors duration-300">
                      Terms of use
                    </a>
                    <span>|</span>
                    <a href="#" className="hover:text-cyan-300 transition-colors duration-300">
                      Privacy policy
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-8 right-8 w-6 h-6 rounded-full bg-cyan-400/20"></div>
                <div className="absolute bottom-12 left-10 w-4 h-4 rounded-full bg-purple-400/20"></div>
                
                <div className="mb-8 text-center">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    VERIFY OTP
                  </h1>
                  <p className="mt-2 text-gray-300">We've sent a code to {formData.email}</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center">
                    <p className="text-gray-300 mb-4">Enter the 6-digit verification code</p>
                    
                    <div className="flex justify-center gap-3 mb-6">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          ref={el => inputRefs.current[index] = el}
                          type="text"
                          maxLength="1"
                          value={otpInputs[index] || ''}
                          onChange={(e) => handleOtpChange(e, index)}
                          className="w-12 h-16 text-2xl text-center bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                          pattern="[0-9]*"
                          inputMode="numeric"
                        />
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <span>Didn't receive code?</span>
                      <button 
                        type="button"
                        onClick={resendOtp}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                      >
                        Resend
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={otp.length !== 6 || isSubmitting}
                    className={`w-full px-6 py-3.5 rounded-xl font-bold shadow-lg transition-all duration-300 relative overflow-hidden group ${
                      otp.length === 6 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-cyan-500/30'
                        : 'bg-gray-600 cursor-not-allowed'
                    } disabled:opacity-70`}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <button 
                    type="button"
                    onClick={handleBack}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center gap-1 mx-auto"
                  >
                    <FaArrowLeft className="w-4 h-4" />
                    Back to login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={300}
      />
    </div>
  );
};

export default Login;