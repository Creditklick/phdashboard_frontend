import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup({ darkMode }) {
  const [formData, setFormData] = useState({
    ims_id: "",
    email: "",
    password: "",
    role: "Agent",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);

    try {
      const response = await axios.post(
        "https://phdashboard-backend.onrender.com/ph/api/signup",
        formData
      );
      console.log("response is ", response.data);
      toast.success("Agent created successfully");
    } catch (err) {
      if (err.response) {
        console.log("Error ", err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setFormData({
        ims_id: "",
        email: "",
        password: "",
        role: "Agent",
      });
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        } p-8 rounded-xl shadow-md w-full max-w-md`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {/* IMSID Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium">IMSID</label>
          <input
            type="text"
            name="ims_id"
            className={`mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400"
                : "focus:ring-blue-500"
            }`}
            value={formData.ims_id}
            onChange={handleChange}
            placeholder="Enter IMSID..."
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className={`mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400"
                : "focus:ring-blue-500"
            }`}
            value={formData.email}
            onChange={handleChange}
            placeholder="Email..."
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            className={`mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400"
                : "focus:ring-blue-500"
            }`}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Role</label>
          <select
            name="role"
            className={`mt-1 w-full border rounded-lg px-3 py-2 outline-none ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : ""
            }`}
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="Agent">Agent</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Signup;
