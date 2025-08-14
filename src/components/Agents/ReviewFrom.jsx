import React from 'react';

function ReviewFrom({
    showReview,
    selectedClient,
    selectedProduct,
    selectedBucket,
    selectedPH,
    selectedAPH,
    selectedMonth,
    selectedYear,
    months,
    milestoneInputs,
    cancelReview,
    confirmSave,
    isLoading
}) {
    // Define milestoneDates directly inside the component
    const milestoneDates = ['8', '14', '21', '28'];





    

    return (
        <div>
            {showReview && (
                <div className=" bg-opacity-50 flex items-center justify-center z-50 p-4"> {/* Use fixed inset-0 for full screen overlay */}
                    <div className="bg-white shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col rounded-lg"> {/* Added rounded-lg */}
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white"> {/* Increased padding */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold">Confirm Milestone Data</h3> {/* Larger title */}
                                    <p className="text-blue-100 mt-1">
                                        Please review your entries before saving
                                    </p>
                                </div>
                                <button
                                    onClick={cancelReview}
                                    className="text-white hover:text-blue-200 text-3xl font-light transition-colors"
                                    aria-label="Close review"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-4 overflow-y-auto flex-grow"> {/* Increased padding */}
                            {/* Summary Section */}
                            <div className="mb-6"> {/* Increased margin-bottom */}
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                    Summary
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-lg shadow-sm"> {/* Added shadow-sm */}
                                        <p className="text-sm text-gray-500">Client</p>
                                        <p className="font-medium text-gray-900">{selectedClient || 'Not specified'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm text-gray-500">Product</p>
                                        <p className="font-medium text-gray-900">{selectedProduct || 'Not specified'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm text-gray-500">Bucket</p>
                                        <p className="font-medium text-gray-900">{selectedBucket || 'Not specified'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm text-gray-500">PH</p>
                                        <p className="font-medium text-gray-900">{selectedPH || 'Not specified'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm text-gray-500">APH</p>
                                        <p className="font-medium text-gray-900">{selectedAPH || 'Not specified'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm text-gray-500">Period</p>
                                        <p className="font-medium text-gray-900">
                                            {selectedMonth && selectedYear && months[parseInt(selectedMonth) - 1] ? `${months[parseInt(selectedMonth) - 1]}, ${selectedYear}` : 'Not specified'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Milestone Values Section */}
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                    Milestone Values
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Adjusted for more columns */}
                                    {/* Main Metrics */}
                                    <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1"> {/* Adjusted column span */}
                                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg shadow-sm"> {/* Increased padding, added shadow */}
                                            <span className="font-medium text-gray-700">Total Count</span>
                                            <span className="font-bold text-blue-700 text-lg">
                                                {milestoneInputs.count !== '' ? milestoneInputs.count : 'Not specified'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg shadow-sm"> {/* Increased padding, added shadow */}
                                            <span className="font-medium text-gray-700">Value (Cr)</span>
                                            <span className="font-bold text-green-700 text-lg">
                                                {milestoneInputs.valueInCr !== '' ? milestoneInputs.valueInCr : 'Not specified'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Date Targets */}
                                    <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2 lg:col-span-2"> {/* Adjusted column span */}
                                        {milestoneDates.map(dateKey => (
                                            <div
                                                key={`review-${dateKey}`}
                                                className="p-4 bg-purple-50 rounded-lg shadow-sm flex flex-col justify-between" // Added flex for better alignment
                                            >
                                                <p className="text-sm text-purple-600 mb-1">Target for {dateKey}th</p>
                                                <p className="font-bold text-purple-800 text-lg">
                                                    {milestoneInputs[dateKey] !== '' ? milestoneInputs[dateKey] : 'Not specified'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex-shrink-0"> {/* Increased padding, flex-shrink-0 */}
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={cancelReview}
                                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmSave}
                                    disabled={isLoading}
                                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin h-5 w-5 mr-2 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Saving...
                                        </span>
                                    ) : (
                                        'Confirm & Save'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReviewFrom;