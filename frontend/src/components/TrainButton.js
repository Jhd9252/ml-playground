import React, { useState } from 'react';
import axios from 'axios'

function TrainButton({ 

  selectedDataset, 
  selectedModel, 
  parameters,
  trainTestSplit,
  setResults
  }) {

  const [training, setTraining] = useState(false);
  
  const isDisabled = training || !selectedDataset || !selectedModel;

  const trainModel = async () => {

    if (!selectedDataset || !selectedModel) {
      alert('Please select both dataset and model');
      return;
    }

    setTraining(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/train`, {
        dataset: selectedDataset,
        model: selectedModel,
        parameters: parameters,
        trainTestSplit: trainTestSplit
      })
      console.log(response.data)
      setResults(response.data);  
    } catch (error) {
      console.error('Error training model:', error);
      alert('Error training model');
    }
    setTraining(false);
  };






  return (
    <div className="mt-8 text-center">
      <button 
        onClick={trainModel} 
        disabled={isDisabled}
        className=
          {`px-8 py-3 rounded-lg font-semibold text-lg text-white-800 transition-all duration-200 
            ${  isDisabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700 hover:scale-105 shadow-lg'
          }`}
      >
          {training ? (
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
