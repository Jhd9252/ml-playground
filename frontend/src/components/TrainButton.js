import React from 'react';

function TrainButton({ 
  loading, 
  selectedDataset, 
  selectedModel, 
  onTrainModel 
}) {
  const isDisabled = loading || !selectedDataset || !selectedModel;

  return (
    <div className="mt-8 text-center">
      <button 
        onClick={onTrainModel} 
        disabled={isDisabled}
        className={`px-8 py-3 rounded-lg font-semibold text-white text-lg transition-all duration-200 ${
          isDisabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 transform hover:scale-105 shadow-lg'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Training Model...
          </div>
        ) : (
          'Train & Predict'
        )}
      </button>
    </div>
  );
}

export default TrainButton;
