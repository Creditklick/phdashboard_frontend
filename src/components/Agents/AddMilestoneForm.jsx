import React, { useState, useEffect } from 'react';
import AddMileStoneValue from './AddMileStoneValue';
import ListMileStone from './ListMileStone';
import { use } from 'react';

const clientList = [
    'Axis Bank', 'Axis Bank(Citi)', 'Encore ARC', 'Kotak Mahindra Bank',
    'MoneyView', 'Poonawalla Fincorp', 'SBI Cards', 'SBI'
];

const productList = [
    'Credit Card', 'Personal Loan', 'MFI Loan', 'Agri Loan', 'Unsecured'
];

const bucketList = [
    'Woff', 'NPA', 'CD6', 'CD 2', 'Bucket X', 'Bucket 1', 'Bucket 2', 'CD 3-7', 'Recovery'
];

const phList = [
    'Paras Jethwa', 'Deepak Sharma', 'Bharat Choudhary'
];

const aphList = [
    'Arun Arora', 'Kannan Naidu', 'Keshav Kashyap', 'Krishana Rao', 'Suchita Dwivedi',
    'Ravindra Singh', 'Naveen Kumar'
];

function AddMilestoneForm() {
    // State variables for selected filter values
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedBucket, setSelectedBucket] = useState('');
    const [selectedPH, setSelectedPH] = useState('');
    const [selectedAPH, setSelectedAPH] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    // State to store all milestone data (mocking a database/API response)
    // Structure: { client-product-bucket-ph-aph-month-year: { '8': value, '14': value, ... } }
    const [allMilestoneData, setAllMilestoneData] = useState({});

    // State for error, success, and loading messages
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Helper to generate month options
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Use useEffect to set the current month and year when the component mounts
    useEffect(() => {
        const date = new Date();
        setSelectedMonth((date.getMonth() + 1).toString());
        setSelectedYear(date.getFullYear().toString());
    }, []);


   

    // Function to clear all filters and associated messages
    const clearFilters = () => {
        setSelectedClient('');
        setSelectedProduct('');
        setSelectedBucket('');
        setSelectedPH('');
        setSelectedAPH('');
        const date = new Date();
        setSelectedMonth((date.getMonth() + 1).toString());
        setSelectedYear(date.getFullYear().toString());
        setError(null);
        setSuccessMessage(null);
        setIsLoading(false);
    };

    // Helper to generate a range of years for the dropdown
    const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear - 5; i <= currentYear + 5; i++) {
            years.push(i.toString());
        }
        return years;
    };

    const yearsList = generateYears();

    // Function to get a unique key for the current filter selection
    const getCurrentFilterKey = () => {
        if (!selectedClient || !selectedProduct || !selectedBucket || !selectedPH || !selectedAPH || !selectedMonth || !selectedYear) {
            return null;
        }
        return `${selectedClient}-${selectedProduct}-${selectedBucket}-${selectedPH}-${selectedAPH}-${selectedMonth}-${selectedYear}`;
    };

    // Derived state: Get the milestone data for the currently selected filters
    const currentFilterKey = getCurrentFilterKey();
    const currentMilestoneData = currentFilterKey ? (allMilestoneData[currentFilterKey]?.data || {}) : {};

    // Function to update milestone data in `allMilestoneData`
    const updateMilestoneData = (newData) => {
        const key = `${newData.client}-${newData.product}-${newData.bucket}-${newData.ph}-${newData.aph}-${newData.month}-${newData.year}`;
        setAllMilestoneData(prevData => ({
            ...prevData,
            [key]: {
                client: newData.client,
                product: newData.product,
                bucket: newData.bucket,
                ph: newData.ph,
                aph: newData.aph,
                month: newData.month,
                year: newData.year,
                data: newData.data // This is the object containing '8', '14', '21', '28' values
            }
        }));
    };

    return (
        <div>
            <div className="container w-full bg-gray-50 min-h-screen px-1 py-1">
                
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-md animate-fade-in" role="alert">
                        <div className="flex items-center">
                            <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v2h-2zm0 4h2v-2H9v2z"/></svg></div>
                            <div>
                                <strong className="font-bold">Error!</strong>
                                <span className="block sm:inline ml-2">{error}</span>
                            </div>
                        </div>
                    </div>
                )}
                {successMessage && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md shadow-md animate-fade-in" role="alert">
                        <div className="flex items-center">
                            <div className="py-1"><svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-5.7-5.7L6.7 9.29z"/></svg></div>
                            <div>
                                <strong className="font-bold">Success!</strong>
                                <span className="block sm:inline ml-2">{successMessage}</span>
                            </div>
                        </div>
                    </div>
                )}
                {isLoading && (
                    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md shadow-md animate-pulse" role="alert">
                        <div className="flex items-center">
                            <div className="py-1"><svg className="animate-spin h-6 w-6 text-blue-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>
                            <div>
                                <strong className="font-bold">Loading...</strong>
                                <span className="block sm:inline ml-2">Please wait.</span>
                            </div>
                        </div>
                    </div>
                )}

                <section className="bg-white shadow-xl rounded-lg p-8 mb-8 border border-gray-100 transform transition-all duration-300 hover:scale-[1.005]">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">Select Filters ✨</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Client Name */}
                        <div className="group">
                            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">Client Name:</label>
                            <select
                                id="clientName"
                                value={selectedClient}
                                onChange={(e) => setSelectedClient(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out hover:border-blue-400"
                            >
                                <option value="">Select Client</option>
                                {clientList.map(client => <option key={client} value={client}>{client}</option>)}
                            </select>
                        </div>
                        {/* Product Name */}
                        <div className="group">
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Product Name:</label>
                            <select
                                id="productName"
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out hover:border-blue-400"
                            >
                                <option value="">Select Product</option>
                                {productList.map(product => <option key={product} value={product}>{product}</option>)}
                            </select>
                        </div>
                        {/* Bucket */}
                        <div className="group">
                            <label htmlFor="bucket" className="block text-sm font-medium text-gray-700 mb-1">Bucket:</label>
                            <select
                                id="bucket"
                                value={selectedBucket}
                                onChange={(e) => setSelectedBucket(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out hover:border-blue-400"
                            >
                                <option value="">Select Bucket</option>
                                {bucketList.map(bucket => <option key={bucket} value={bucket}>{bucket}</option>)}
                            </select>
                        </div>
                        {/* PH */}
                        <div className="group">
                            <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-1">PH:</label>
                            <select
                                id="ph"
                                value={selectedPH}
                                onChange={(e) => setSelectedPH(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out hover:border-blue-400"
                            >
                                <option value="">Select PH</option>
                                {phList.map(ph => <option key={ph} value={ph}>{ph}</option>)}
                            </select>
                        </div>
                        {/* APH */}
                        <div className="group">
                            <label htmlFor="aph" className="block text-sm font-medium text-gray-700 mb-1">APH:</label>
                            <select
                                id="aph"
                                value={selectedAPH}
                                onChange={(e) => setSelectedAPH(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out hover:border-blue-400"
                            >
                                <option value="">Select APH</option>
                                {aphList.map(aph => <option key={aph} value={aph}>{aph}</option>)}
                            </select>
                        </div>
                        {/* Month */}
                        <div className="group">
                            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">Month:</label>
                            <select
                                id="month"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out hover:border-blue-400"
                            >
                                <option value="">Select Month</option>
                                {months.map((month, index) => (
                                    <option key={month} value={index + 1}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Year */}
                        <div className="group">
                            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year:</label>
                            <select
                                id="year"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out hover:border-blue-400"
                            >
                                <option value="">Select Year</option>
                                {yearsList.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                         <div className="flex justify-center mt-6">
                        <button
                            onClick={clearFilters}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75 transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                        >
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                Clear All Filters
                            </span>
                        </button>
                    </div>
                    </div>
                   
                </section>

                
                     


                <AddMileStoneValue
                    selectedClient={selectedClient}
                    selectedProduct={selectedProduct}
                    selectedBucket={selectedBucket}
                    selectedPH={selectedPH}
                    selectedAPH={selectedAPH}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    months={months}
                    setError={setError}
                    setSuccessMessage={setSuccessMessage}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    currentMilestoneData={currentMilestoneData} 
                    setCurrentMilestoneData={updateMilestoneData} 
                />
               
              
            </div>
        </div>
    );
}

export default AddMilestoneForm;