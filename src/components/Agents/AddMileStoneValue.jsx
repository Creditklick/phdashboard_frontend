// import React, { useState, useEffect } from 'react';
// import ReviewFrom from './ReviewFrom';
// import axios from 'axios';
// function AddMileStoneValue({
//     selectedClient,
//     selectedProduct,
//     selectedBucket,
//     selectedPH,
//     selectedAPH,
//     selectedMonth,
//     selectedYear,
//     months,
//     setError,
//     setSuccessMessage,
//     isLoading,
//     setIsLoading,
//     currentMilestoneData,
//     setCurrentMilestoneData
// }) {
//     // Local state for all input fields in this section
//     const [milestoneInputs, setMilestoneInputs] = useState({
//         count: '',
//         valueInCr: '',
//         '8': '',
//         '14': '',
//         '21': '',
//         '28': ''
//     });

//     // State to control the review modal visibility
//     const [showReview, setShowReview] = useState(false);

//     // Update local state when currentMilestoneData prop changes (e.g., parent filters change)
//     useEffect(() => {
//         setMilestoneInputs({
//             count: currentMilestoneData.count !== undefined ? String(currentMilestoneData.count) : '', // Convert to string for input
//             valueInCr: currentMilestoneData.valueInCr !== undefined ? String(currentMilestoneData.valueInCr) : '', // Convert to string
//             '8': currentMilestoneData['8'] !== undefined ? String(currentMilestoneData['8']) : '', // Convert to string
//             '14': currentMilestoneData['14'] !== undefined ? String(currentMilestoneData['14']) : '', // Convert to string
//             '21': currentMilestoneData['21'] !== undefined ? String(currentMilestoneData['21']) : '', // Convert to string
//             '28': currentMilestoneData['28'] !== undefined ? String(currentMilestoneData['28']) : ''  // Convert to string
//         });
//     }, [currentMilestoneData]);

//     const handleInputChange = (field, value) => {
//         const isDecimalField = ['valueInCr', '8', '14', '21', '28'].includes(field);
//         const isCountField = field === 'count';

//         if (isDecimalField) {
//             // Allow empty string, numbers, and a single decimal point
//             if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
//                 setMilestoneInputs(prev => ({
//                     ...prev,
//                     [field]: value // Keep as string to allow typing "12." or "12.00"
//                 }));
//             }
//         } else if (isCountField) {
//             // Allow empty string, and only whole numbers (integers)
//             if (value === '' || /^\d*$/.test(value)) {
//                 setMilestoneInputs(prev => ({
//                     ...prev,
//                     [field]: value // Keep as string initially
//                 }));
//             }
//         } else {
//             // For non-numeric fields, just set the value directly
//             setMilestoneInputs(prev => ({
//                 ...prev,
//                 [field]: value
//             }));
//         }
//     };

//     const handleSaveMilestones = (e) => {
//         e.preventDefault(); // Prevent default form submission behavior

//         // Check if all filter fields are selected
//         if (!selectedClient || !selectedProduct || !selectedBucket || !selectedPH || !selectedAPH || !selectedMonth || !selectedYear) {
//             setError('Please select all filter fields.');
//             setSuccessMessage(null);
//             return;
//         }

//         // Prepare data for review/saving by converting numeric strings to numbers
//         const processedMilestoneInputs = {};
//         for (const key in milestoneInputs) {
//             const value = milestoneInputs[key];
//             const isNumericField = ['count', 'valueInCr', '8', '14', '21', '28'].includes(key);

//             if (isNumericField) {
//                 // Convert to actual number, if it's a valid number string.
//                 // If it's an empty string or invalid number, store as null or 0, depending on backend expectation.
//                 // For SQL DECIMAL(10,2), NULL is often acceptable for non-entered values.
//                 processedMilestoneInputs[key] = value === '' || isNaN(parseFloat(value)) ? null : parseFloat(value);
//             } else {
//                 processedMilestoneInputs[key] = value;
//             }
//         }

//         // Check if all processed milestone inputs are effectively empty/null
//         const allInputsEmpty = Object.values(processedMilestoneInputs).every(value => value === null || value === undefined);
//         if (allInputsEmpty) {
//             setError('Please enter at least one value for Count, Value in Cr, or a Milestone Target before saving.');
//             setSuccessMessage(null);
//             return;
//         }

       
//         setError(null);
//         setSuccessMessage(null);
//         setShowReview(true);
        
//     };

   
    


    
   






    

   
//     const confirmSave = async () => {
//         setShowReview(false);
//         setIsLoading(true);

//         const payload = {
//             client: selectedClient,
//             product: selectedProduct,
//             bucket: selectedBucket,
//             ph: selectedPH,
//             aph: selectedAPH,
//             month: selectedMonth,
//             year: selectedYear,
//             ims_id: currentMilestoneData.ims_id || 0, // Default to 0 if not present
//             data: {
//                 count: milestoneInputs.count ? parseInt(milestoneInputs.count) : null,
//                 valueInCr: milestoneInputs.valueInCr ? parseFloat(milestoneInputs.valueInCr) : null,
//                 '8': milestoneInputs['8'] ? parseFloat(milestoneInputs['8']) : null,
//                 '14': milestoneInputs['14'] ? parseFloat(milestoneInputs['14']) : null,
//                 '21': milestoneInputs['21'] ? parseFloat(milestoneInputs['21']) : null,
//                 '28': milestoneInputs['28'] ? parseFloat(milestoneInputs['28']) : null
//             }
//         };

//         try {
//             const response = await axios.post('https://phdashboard-backend.onrender.com/milestone/add_month/api', payload);
            
//             if (response.data.success) {
//                 setSuccessMessage(response.data.message || `Milestone data saved successfully!`);
//                 setCurrentMilestoneData({
//                     ...currentMilestoneData,
//                     ims_id: response.data.ims_id,
//                     count: response.data.data?.count_value,
//                     valueInCr: response.data.data?.value_in_cr,
//                     '8': response.data.data?.['8th'],
//                     '14': response.data.data?.['14th'],
//                     '21': response.data.data?.['21th'],
//                     '28': response.data.data?.['28th']
//                 });
//             } else {
//                 setError(response.data.message || 'Failed to save milestones');
//             }
//         } catch (error) {
//             console.error('API Error:', error);
//             setError(error.response?.data?.message || 'Failed to save milestones. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };






//     const cancelReview = () => {
//         setShowReview(false); // Close the review modal
//         setError(null); // Clear any errors
//     };

//     // Render nothing if essential filter selections are missing
//     if (!(selectedClient && selectedProduct && selectedBucket && selectedPH && selectedAPH && selectedMonth && selectedYear)) {
//         return null;
//     }

//     const milestoneDates = ['8', '14', '21', '28'];

//     return (
//         <section className="bg-white shadow-xl rounded-lg px-2 py-1 mt-8 border border-gray-100 transform transition-all duration-300 hover:scale-[1.005]">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
//                 Set Milestones for {months[parseInt(selectedMonth) - 1]}, {selectedYear} 🎯
//             </h2>
//             <form onSubmit={handleSaveMilestones}>
//                 <div className="overflow-x-auto mb-6">
//                     <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Client Name</th>
//                                 <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Product</th>
//                                 <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Bucket</th>
//                                 <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">PH</th>
//                                 <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">APH</th>
//                                 <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Count</th>
//                                 <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Value (Cr)</th>
//                                 {milestoneDates.map(date => (
//                                     <th key={date} className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">{date}th</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr className="hover:bg-gray-50 transition-colors duration-150">
//                                 <td className="py-3 px-4 border-b text-gray-800 font-medium whitespace-nowrap">{selectedClient}</td>
//                                 <td className="py-3 px-4 border-b text-gray-800 font-medium whitespace-nowrap">{selectedProduct}</td>
//                                 <td className="py-3 px-4 border-b text-gray-800 font-medium whitespace-nowrap">{selectedBucket}</td>
//                                 <td className="py-3 px-4 border-b text-gray-800 font-medium whitespace-nowrap">{selectedPH}</td>
//                                 <td className="py-3 px-4 border-b text-gray-800 font-medium whitespace-nowrap">{selectedAPH}</td>
//                                 <td className="py-3 px-4 border-b">
//                                     <input
//                                         type="number" // Keep type="number" for mobile keyboards, but handle parsing carefully
//                                         step="1" // Use step="1" for count to indicate whole numbers
//                                         value={milestoneInputs.count}
//                                         onChange={(e) => handleInputChange('count', e.target.value)}
//                                         placeholder="Count"
//                                         className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-400 no-spinners"
//                                     />
//                                 </td>
//                                 <td className="py-3 px-4 border-b">
//                                     <input
//                                         type="number"
//                                         step="0.01" // Important for decimal input
//                                         value={milestoneInputs.valueInCr}
//                                         onChange={(e) => handleInputChange('valueInCr', e.target.value)}
//                                         placeholder="Value"
//                                         className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-400 no-spinners"
//                                     />
//                                 </td>
//                                 {milestoneDates.map(dateKey => (
//                                     <td key={dateKey} className="py-3 px-4 border-b">
//                                         <input
//                                             type="number"
//                                             step="0.01" // Important for decimal input
//                                             value={milestoneInputs[dateKey]}
//                                             onChange={(e) => handleInputChange(dateKey, e.target.value)}
//                                             placeholder="Target"
//                                             className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-400 no-spinners"
//                                         />
//                                     </td>
//                                 ))}
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="flex justify-start md:justify-end mt-6">
//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75 transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         Review & Save Milestones
//                     </button>
//                 </div>
//             </form>

//             <ReviewFrom
//                 showReview={showReview}
//                 selectedClient={selectedClient}
//                 selectedProduct={selectedProduct}
//                 selectedBucket={selectedBucket}
//                 selectedPH={selectedPH}
//                 selectedAPH={selectedAPH}
//                 selectedMonth={selectedMonth}
//                 selectedYear={selectedYear}
//                 months={months}
//                 // Pass the raw milestoneInputs to ReviewFrom for display
//                 // ReviewFrom can handle converting to "Not specified" if needed
//                 milestoneInputs={milestoneInputs}
//                 cancelReview={cancelReview}
//                 confirmSave={confirmSave}
//                 isLoading={isLoading}
//             />

//         </section>
//     );  
// }

// export default AddMileStoneValue;
































import React, { useState, useEffect, useContext } from 'react';
import ReviewFrom from './ReviewFrom';
import axios from 'axios';
import { authContext } from '../ContextApi/Contextapi';

function AddMileStoneValue({
    selectedClient,
    selectedProduct,
    selectedBucket,
    selectedPH,
    selectedAPH,
    selectedMonth,
    selectedYear,
    months,
    setError,
    setSuccessMessage,
    isLoading,
    setIsLoading,
    currentMilestoneData,
    setCurrentMilestoneData
}) {
    // Local state for all input fields in this section
    const [milestoneInputs, setMilestoneInputs] = useState({
        count: '',
        valueInCr: '',
        '8': '',
        '14': '',
        '21': '',
        '28': ''
    });

    // State to control the review modal visibility
    const [showReview, setShowReview] = useState(false);


    const {user} = useContext(authContext);

    // Update local state when currentMilestoneData prop changes (e.g., parent filters change)
    useEffect(() => {
        setMilestoneInputs({
            count: currentMilestoneData.count !== undefined ? String(currentMilestoneData.count) : '',
            valueInCr: currentMilestoneData.valueInCr !== undefined ? String(currentMilestoneData.valueInCr) : '',
            '8': currentMilestoneData['8'] !== undefined ? String(currentMilestoneData['8']) : '',
            '14': currentMilestoneData['14'] !== undefined ? String(currentMilestoneData['14']) : '',
            '21': currentMilestoneData['21'] !== undefined ? String(currentMilestoneData['21']) : '',
            '28': currentMilestoneData['28'] !== undefined ? String(currentMilestoneData['28']) : ''
        });
    }, [currentMilestoneData]);

    const handleInputChange = (field, value) => {
        const isDecimalField = ['valueInCr', '8', '14', '21', '28'].includes(field);
        const isCountField = field === 'count';

        if (isDecimalField) {
            if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                setMilestoneInputs(prev => ({
                    ...prev,
                    [field]: value
                }));
            }
        } else if (isCountField) {
            if (value === '' || /^\d*$/.test(value)) {
                setMilestoneInputs(prev => ({
                    ...prev,
                    [field]: value
                }));
            }
        } else {
            setMilestoneInputs(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSaveMilestones = (e) => {
        e.preventDefault();

        // Check if all filter fields are selected
        if (!selectedClient || !selectedProduct || !selectedBucket || !selectedPH || !selectedAPH || !selectedMonth || !selectedYear) {
            setError('Please select all filter fields.');
            setSuccessMessage(null);
            return;
        }

        // Check if all milestone fields are filled
        const requiredFields = ['count', 'valueInCr', '8', '14', '21', '28'];
        const emptyFields = requiredFields.filter(field => !milestoneInputs[field]);

        if (emptyFields.length > 0) {
            setError('Please fill all milestone fields before reviewing.');
            setSuccessMessage(null);
            return;
        }

        // Prepare data for review/saving
        const processedMilestoneInputs = {};
        for (const key in milestoneInputs) {
            const value = milestoneInputs[key];
            const isNumericField = ['count', 'valueInCr', '8', '14', '21', '28'].includes(key);

            if (isNumericField) {
                processedMilestoneInputs[key] = value === '' || isNaN(parseFloat(value)) ? null : parseFloat(value);
            } else {
                processedMilestoneInputs[key] = value;
            }
        }

        setError(null);
        setSuccessMessage(null);
        setShowReview(true);
    };

    const confirmSave = async () => {
        setShowReview(false);
        setIsLoading(true);

        const payload = {
            client: selectedClient,
            product: selectedProduct,
            bucket: selectedBucket,
            ph: selectedPH,
            aph: selectedAPH,
            month: selectedMonth,
            year: selectedYear,
            ims_id: user?.ims_id || 0,
            data: {
                count: milestoneInputs.count ? parseInt(milestoneInputs.count) : null,
                valueInCr: milestoneInputs.valueInCr ? parseFloat(milestoneInputs.valueInCr) : null,
                '8': milestoneInputs['8'] ? parseFloat(milestoneInputs['8']) : null,
                '14': milestoneInputs['14'] ? parseFloat(milestoneInputs['14']) : null,
                '21': milestoneInputs['21'] ? parseFloat(milestoneInputs['21']) : null,
                '28': milestoneInputs['28'] ? parseFloat(milestoneInputs['28']) : null
            }
        };

        try {
            const response = await axios.post('https://phdashboard-backend.onrender.com/milestone/add_month/api', payload);
            
            if (response.data.success) {
                setSuccessMessage(response.data.message || `Milestone data saved successfully!`);
                setCurrentMilestoneData({
                    ...currentMilestoneData,
                    ims_id: response.data.ims_id,
                    count: response.data.data?.count_value,
                    valueInCr: response.data.data?.value_in_cr,
                    '8': response.data.data?.['8th'],
                    '14': response.data.data?.['14th'],
                    '21': response.data.data?.['21th'],
                    '28': response.data.data?.['28th']
                });
            } else {
                setError(response.data.message || 'Failed to save milestones');
            }
        } catch (error) {
            console.error('API Error:', error);
            setError(error.response?.data?.message || 'Failed to save milestones. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const cancelReview = () => {
        setShowReview(false);
        setError(null);
    };

    if (!(selectedClient && selectedProduct && selectedBucket && selectedPH && selectedAPH && selectedMonth && selectedYear)) {
        return null;
    }

    const milestoneDates = ['8', '14', '21', '28'];

    return (
        <section className="bg-white shadow-xl rounded-lg px-2 py-1 mt-8 border border-gray-100 transform transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
                Set Milestones for {months[parseInt(selectedMonth) - 1]}, {selectedYear} 🎯
            </h2>
            <form onSubmit={handleSaveMilestones}>
                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Client Name</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Product</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Bucket</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">PH</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">APH</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Count</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Value (Cr)</th>
                                {milestoneDates.map(date => (
                                    <th key={date} className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">{date}th</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="py-3 px-4 border-b text-gray-800 font-medium whitespace-nowrap">{selectedClient}</td>
                                <td className="py-3 px-4 border-b text-gray-800 font-medium whitespace-nowrap">{selectedProduct}</td>
                                <td className="py-3 px-4 border-b text-gray-800 font-medium whitespace-nowrap">{selectedBucket}</td>
                                <td className="py-3 px-4 border-b text-gray-800 font-medium whitespace-nowrap">{selectedPH}</td>
                                <td className="py-3 px-4 border-b text-gray-800 font-medium whitespace-nowrap">{selectedAPH}</td>
                                <td className="py-3 px-4 border-b">
                                    <input
                                        type="text"
                                       
                                        value={milestoneInputs.count}
                                        onChange={(e) => handleInputChange('count', e.target.value)}
                                        placeholder="Count"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-400 no-spinners"
                                        required
                                    />
                                </td>
                                <td className="py-3 px-4 border-b">
                                    <input
                                        type="text"
                                    
                                        value={milestoneInputs.valueInCr}
                                        onChange={(e) => handleInputChange('valueInCr', e.target.value)}
                                        placeholder="Value"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-400 no-spinners"
                                        required
                                    />
                                </td>
                                {milestoneDates.map(dateKey => (
                                    <td key={dateKey} className="py-3 px-4 border-b">
                                        <input
                                            type="text"
                                            
                                            value={milestoneInputs[dateKey]}
                                            onChange={(e) => handleInputChange(dateKey, e.target.value)}
                                            placeholder="Target"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-400 no-spinners"
                                            required
                                        />
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-start md:justify-end mt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75 transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Review & Save Milestones
                    </button>
                </div>
            </form>

            <ReviewFrom
                showReview={showReview}
                selectedClient={selectedClient}
                selectedProduct={selectedProduct}
                selectedBucket={selectedBucket}
                selectedPH={selectedPH}
                selectedAPH={selectedAPH}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                months={months}
                milestoneInputs={milestoneInputs}
                cancelReview={cancelReview}
                confirmSave={confirmSave}
                isLoading={isLoading}
            />
        </section>
    );  
}



export default AddMileStoneValue;