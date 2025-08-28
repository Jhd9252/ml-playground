import React from 'react';

const ModelParameterSliders = ({ selectedModel, parameters, onParameterChange }) => {
  if (!selectedModel) {
    return null;
  }

  const renderModelParameters = () => {
    switch (selectedModel) {
      case 'random_forest':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white-500 text-center mb-2">
                N Estimators: {parameters.n_estimators || 100}
              </label>
              <input
                type="range"
                min="10"
                max="50"
                step="10"
                value={parameters.n_estimators || 100}
                onChange={(e) => onParameterChange('n_estimators', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white-500 text-center mb-2">
                Max Depth: {parameters.max_depth || 5}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={parameters.max_depth || 5}
                onChange={(e) => onParameterChange('max_depth', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        );
      case 'logistic_regression':
        return (
          <div>
            <label className="block text-sm font-medium text-white-500 text-center mb-2">
              C (Regularization): {parameters.C || 1.0}
            </label>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={parameters.C || 1.0}
              onChange={(e) => onParameterChange('C', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        );
      case 'svm':
        return (
          <div>
            <label className="block text-sm font-medium text-white-500 text-center mb-2">
              C (Regularization): {parameters.C || 1.0}
            </label>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={parameters.C || 1.0}
              onChange={(e) => onParameterChange('C', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        );
      default:
        return (
          <div className="text-gray-500 text-sm">
            Select a model to see parameter options
          </div>
        );
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-white-800 text-center mb-4">Model Parameters</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        {renderModelParameters()}
      </div>
    </div>
  );
};

export default ModelParameterSliders;
