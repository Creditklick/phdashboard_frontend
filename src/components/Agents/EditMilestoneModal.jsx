


import React, { useState } from "react";

const EditMilestoneModal = ({ rowData, onSave, onClose, isLoading }) => {
  const [editedValues, setEditedValues] = useState({
    "8th_Achievement": rowData["8th_Achievement"] || "",
    "14th_Achievement": rowData["14th_Achievement"] || "",
    "21th_Achievement": rowData["21th_Achievement"] || "",
    "28th_Achievement": rowData["28th_Achievement"] || ""
  });

  const handleChange = (field, value) => {
    // Only allow editing if the current value is empty or null
    if (!rowData[field] || rowData[field] === "") {
      setEditedValues(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const calculateAchievementPercentage = (achievement, target) => {
    if (!target || target === 0) return "0%";
    const percentage = (parseFloat(achievement || 0) / parseFloat(target)) * 100;
    return `${percentage.toFixed(2)}%`;
  };

  const handleSubmit = () => {
    const updatedData = {
      ...rowData,
      ...editedValues,
      "8th_percentage": calculateAchievementPercentage(editedValues["8th_Achievement"], rowData["8th"]),
      "14th_percentage": calculateAchievementPercentage(editedValues["14th_Achievement"], rowData["14th"]),
      "21th_percentage": calculateAchievementPercentage(editedValues["21th_Achievement"], rowData["21th"]),
      "28th_percentage": calculateAchievementPercentage(editedValues["28th_Achievement"], rowData["28th"])
    };
    onSave(updatedData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Milestone Achievements</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-medium">Client: {rowData.client_name}</h3>
                <p>Product: {rowData.product}</p>
              </div>
              <div>
                <p>Bucket: {rowData.bucket}</p>
                <p>Value in Cr: {rowData.value_in_cr}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["8th", "14th", "21th", "28th"].map((milestone) => {
                const achievementField = `${milestone}_Achievement`;
                const isEditable = !rowData[achievementField] || rowData[achievementField] === "";
                
                return (
                  <div key={milestone} className="border p-4 rounded-lg">
                    <h3 className="font-medium mb-3 text-center">{milestone} Details</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Target</label>
                        <div className="p-2 bg-gray-100 rounded">
                          {rowData[milestone]}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Achievement</label>
                        {isEditable ? (
                          <input
                            type="number"
                            value={editedValues[achievementField]}
                            onChange={(e) => handleChange(achievementField, e.target.value)}
                            className="w-full p-2 border rounded"
                            disabled={isLoading}
                          />
                        ) : (
                          <div className="p-2 bg-gray-100 rounded">
                            {rowData[achievementField]}
                            <p className="text-xs text-gray-500 mt-1">(Already set, cannot edit)</p>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Achievement %</label>
                        <div className="p-2 bg-gray-100 rounded">
                          {calculateAchievementPercentage(
                            isEditable ? editedValues[achievementField] : rowData[achievementField],
                            rowData[milestone]
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">SDLM</label>
                        <div className="p-2 bg-gray-100 rounded">
                          {rowData[`${milestone}_sdlm`] || 'N/A'}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">SDBM</label>
                        <div className="p-2 bg-gray-100 rounded">
                          {rowData[`${milestone}_sdbm` || 'N/A']}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMilestoneModal;





