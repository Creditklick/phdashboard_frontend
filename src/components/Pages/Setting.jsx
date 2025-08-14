import React, { useState } from "react";
import {
  FiUser,
  FiLock,
  FiMoon,
  FiShield,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

function Setting({ darkMode }) {
  const [activeTab, setActiveTab] = useState("profile");

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newsletter: false,
  });
  const [twoFactor, setTwoFactor] = useState(false);

  const handleNotificationChange = (type) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type],
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800";

  return (
    <div className={`min-h-screen ${theme}`}>
      <div className="w-full mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-64">
            <div className={`rounded-xl p-6 shadow-lg ${theme}`}>
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <FiUser className="mr-2" /> Account Settings
              </h2>

              <nav>
                <ul className="space-y-2">
                  {[
                    { id: "profile", icon: FiUser, label: "Profile" },
                    { id: "security", icon: FiLock, label: "Security" },
                    { id: "preferences", icon: FiMoon, label: "Preferences" },
                    { id: "privacy", icon: FiShield, label: "Privacy" },
                    { id: "help", icon: FiHelpCircle, label: "Help & Support" },
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                          activeTab === item.id
                            ? "bg-blue-500 text-white"
                            : `${
                                darkMode
                                  ? "hover:bg-gray-700"
                                  : "hover:bg-gray-100"
                              }`
                        }`}
                      >
                        <item.icon className="mr-3" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <FiLogOut className="mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Profile Section */}
            {activeTab === "profile" && (
              <div className={`rounded-xl p-6 shadow-lg ${theme}`}>
                <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div
                          className={`w-32 h-32 rounded-full ${
                            darkMode ? "bg-gray-700" : "bg-gray-200"
                          } flex items-center justify-center overflow-hidden`}
                        >
                          <FiUser className="w-16 h-16 text-gray-400" />
                        </div>
                        <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </button>
                      </div>
                      <button className="mt-4 text-blue-500 hover:text-blue-700 transition-colors">
                        Change Profile Picture
                      </button>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          className={`w-full p-3 rounded-lg border ${
                            darkMode
                              ? "border-gray-600 bg-gray-700"
                              : "border-gray-300"
                          } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className={`w-full p-3 rounded-lg border ${
                            darkMode
                              ? "border-gray-600 bg-gray-700"
                              : "border-gray-300"
                          } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          placeholder="Doe"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className={`w-full p-3 rounded-lg border ${
                            darkMode
                              ? "border-gray-600 bg-gray-700"
                              : "border-gray-300"
                          } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                          Bio
                        </label>
                        <textarea
                          className={`w-full p-3 rounded-lg border ${
                            darkMode
                              ? "border-gray-600 bg-gray-700"
                              : "border-gray-300"
                          } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          rows="4"
                          placeholder="Tell us about yourself..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    className={`px-5 py-2 rounded-lg border ${
                      darkMode
                        ? "border-gray-600 hover:bg-gray-700"
                        : "border-gray-300 hover:bg-gray-100"
                    } transition-colors`}
                  >
                    Cancel
                  </button>
                  <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeTab === "security" && (
              <div className={`rounded-xl p-6 shadow-lg ${theme}`}>
                <h1 className="text-2xl font-bold mb-6">Security Settings</h1>

                <div className="space-y-6">
                  <div
                    className={`p-5 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Password</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Last changed: 3 months ago
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                        Change Password
                      </button>
                    </div>
                  </div>

                  <div
                    className={`p-5 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {twoFactor
                            ? "Enabled - Provides an extra layer of security"
                            : "Disabled - Add an extra layer of security to your account"}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`mr-3 text-sm ${
                            twoFactor ? "text-green-500" : "text-gray-500"
                          }`}
                        >
                          {twoFactor ? "Enabled" : "Disabled"}
                        </span>
                        <button
                          onClick={() => setTwoFactor(!twoFactor)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            twoFactor ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              twoFactor ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeTab === "preferences" && (
              <div className={`rounded-xl p-6 shadow-lg ${theme}`}>
                <h1 className="text-2xl font-bold mb-6">Preferences</h1>

                <div className="space-y-6">
                  <div
                    className={`p-5 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Theme</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Customize your application theme
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`mr-3 text-sm ${
                            !darkMode ? "text-blue-500" : "text-gray-500"
                          }`}
                        >
                          Light
                        </span>
                        <button
                          onClick={toggleDarkMode}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            darkMode ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              darkMode ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                        <span
                          className={`ml-3 text-sm ${
                            darkMode ? "text-blue-500" : "text-gray-500"
                          }`}
                        >
                          Dark
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Section */}
            {activeTab === "privacy" && (
              <div
                className={`border ${
                  darkMode ? "border-gray-600" : "border-gray-200"
                } rounded-xl p-6 shadow-md text-left mx-auto ${theme}`}
              >
                <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>

                <p
                  className={`text-sm mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  At <strong>IMS Pvt. Ltd.</strong>, we are committed to
                  protecting your personal and professional data. This privacy
                  policy outlines how we collect, use, and safeguard the
                  information you provide on our platform.
                </p>

                <p
                  className={`text-sm mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <strong>1. Data Collection:</strong> We collect information
                  such as your name, email, IP address, and usage behavior when
                  you access our services. This data is used to improve
                  functionality, provide support, and ensure compliance.
                </p>

                <p
                  className={`text-sm mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <strong>2. Data Usage:</strong> Your data is used internally
                  for authentication, access control, and service enhancement.
                  We do not sell or share your information with third parties
                  without your explicit consent.
                </p>

                <p
                  className={`text-sm mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <strong>3. Cookies & Session:</strong> We use cookies and
                  secure session tokens to manage login status and session
                  security. These are never exposed to third-party scripts or
                  services.
                </p>

                <p
                  className={`text-sm mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <strong>4. Confidentiality:</strong> All data stored and
                  processed is treated as confidential and is protected using
                  industry-standard encryption and access controls.
                </p>

                <p
                  className={`text-sm mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <strong>5. Your Rights:</strong> You may request to view,
                  update, or delete your personal data by contacting our support
                  team.
                </p>

                <p
                  className={`text-xs mt-6 italic ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  For questions or concerns about this policy, please contact
                  our Data Protection Officer at <u>privacy@ims.in</u>.
                </p>
              </div>
            )}

            {/* Help & Support Section */}
            {activeTab === "help" && (
              <div className={`rounded-xl p-6 shadow-lg ${theme}`}>
                <h1 className="text-2xl font-bold mb-6">Help & Support</h1>
                <div
                  className={`p-5 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <h3 className="font-semibold mb-4">Contact Support</h3>
                  <p
                    className={`mb-4 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    If you need assistance, please contact our support team at
                    support@example.com or call us at +1 (555) 123-4567.
                  </p>
                  <h3 className="font-semibold mb-4 mt-6">FAQs</h3>
                  <div className="space-y-3">
                    <div
                      className={`p-3 rounded-lg ${
                        darkMode ? "bg-gray-600" : "bg-white"
                      } shadow`}
                    >
                      <h4 className="font-medium">
                        How do I reset my password?
                      </h4>
                      <p
                        className={`text-sm mt-1 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Go to the Security tab and click on "Change Password" to
                        reset your password.
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        darkMode ? "bg-gray-600" : "bg-white"
                      } shadow`}
                    >
                      <h4 className="font-medium">
                        How do I enable dark mode?
                      </h4>
                      <p
                        className={`text-sm mt-1 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Navigate to Preferences and toggle the theme switch to
                        enable dark mode.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
