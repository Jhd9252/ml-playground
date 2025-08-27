import React from 'react';

const DatasetDropdown = ({ datasets, selectedDataset, onDatasetChange }) => {
  return (
    <div>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Choose Dataset
      </label>

      <select 
        value={selectedDataset} 
        onChange={(e) => onDatasetChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select Dataset</option>
          {datasets.map(dataset => (
            <option key={dataset} value={dataset}>
              {dataset.replace('_', ' ').toUpperCase()}
            </option>
        ))}

      </select>

    </div>
  );
};

export default DatasetDropdown;
