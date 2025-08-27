import React from 'react';

const ModelParameterSliders = ({ selectedModel, parameters, onParameterChange }) => {
  const renderParameterSliders = () => {
    if (selectedModel === 'random_forest') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              N Estimators: {parameters.n_estimators || 100}
            </label>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={parameters.n_estimators || 100}
              onChange={(e) => onParameterChange('n_estimators', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Max Depth: {parameters.max_depth || 5}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={parameters.max_depth || 5}
              onChange={(e) => onParameterChange('max_depth', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      );
    } else if (selectedModel === 'logistic_regression') {
      return (
        <div>
          <label className="block text-sm font-medium mb-2">
            C (Regularization): {parameters.C || 1.0}
          </label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={parameters.C || 1.0}
            onChange={(e) => onParameterChange('C', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      );
    } else if (selectedModel === 'svm') {
      return (
        <div>
          <label className="block text-sm font-medium mb-2">
            C (Regularization): {parameters.C || 1.0}
          </label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={parameters.C || 1.0}
            onChange={(e) => onParameterChange('C', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      );
    }
    return (
      <div className="text-gray-500 text-sm">
        Select a model to see parameter options
      </div>
    );
  };

  if (!selectedModel) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Model Parameters</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        {renderParameterSliders()}
      </div>
    </div>
  );
};

export default ModelParameterSliders;
