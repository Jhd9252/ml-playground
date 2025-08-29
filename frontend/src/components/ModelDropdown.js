import React from 'react';

const ModelDropdown = ({ models, selectedModel, onModelChange , parameters, setParameters}) => {
  const defaultModelParameters ={
    random_forest: {
      n_estimators: 25,
      max_depth: 5,
    },
    logistic_regression: {
      C: 1
    },
    svm: {
      C: 1
    }
  }
  return (
    <div>
      <label className="block text-center text-sm font-medium text-white-500 mb-2">
        Choose Model
      </label>
      <select 
        value={selectedModel} 
        onChange={(e) => {
          onModelChange(e.target.value)
          setParameters(defaultModelParameters[e.target.value] || {})
        }}

        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select Model</option>
        {models.map(model => (
          <option key={model} value={model}>
            {model.replace('_', ' ').toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelDropdown;
