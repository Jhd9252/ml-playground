import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DatasetDropdown from './components/DatasetDropdown';
import ModelDropdown from './components/ModelDropdown';
import TrainTestSplitSlider from './components/TrainTestSplitSlider';
import ModelParameterSliders from './components/ModelParameterSliders';
import ResultsDisplay from './components/ResultsDisplay';
import Leaderboard from './components/Leaderboard';
import TrainButton from './components/TrainButton';

function MLPlayground() {

  // User Options
  const datasets = ['iris', 'wine', 'breast_cancer'];
  const models = ['random_forest', 'logistic_regression', 'svm'];

  
  // States (user options)
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [trainTestSplit, setTrainTestSplit] = useState(0.5);
  const [parameters, setParameters] = useState({});
  
  // states (api results of training + option of setting alias for leaderboard)
  const [results, setResults] = useState(null);
  const [alias, setAlias] = useState('');

  // states (leaderboard data)
  const [leaderboard, setLeaderboard] = useState([]); 
  

  //////////////////////////////////////////////////////////////////////////////////  
  
  // on mount, load leaderboard (start with mock data)
  useEffect(() => {
    loadLeaderboard();
  }, []);
   
  // load leaderboard data from mock API
  const loadLeaderboard = async () => {
    try {
      // const data = await mockAPI.getLeaderboard();
      // CHANGE FOR DEPLOYMENT
      const data = await axios.get('http://localhost:5000/api/getLeaderboard');
      setLeaderboard(data.data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
  };
  
  //////////////////////////////////////////////////////////////////////////////////
  

  //////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="min-h-screen bg-gray-600">

      <header className="bg-blue-600 text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">ML PlayGround</h1>
          <p className="text-center mt-2 text-blue-100"> 
            Train classification machine learning models with interactive parameters
          </p>
        </div>
      </header>
  
      <div className="max-w-6xl mx-auto bg-gray-400 px-4 py-8">

        {/* Main Controls */}
        <div className="bg-gray-600 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-white-800 text-center">Configure Your Model</h2>
          <div className="grid gap-6 md:grid-cols-2">

            {/* Dataset Selection */}
            <DatasetDropdown 
              datasets = {datasets} 
              selectedDataset = {selectedDataset} 
              onDatasetChange={setSelectedDataset} 
            />

            {/* Model Selection */}
            <ModelDropdown 
              models = {models} 
              selectedModel = {selectedModel} 
              onModelChange={setSelectedModel}
              parameters={parameters}
              setParameters={setParameters}
            />

            

          </div>

          {/* Parameters Selection */}
            <ModelParameterSliders 
              selectedModel = {selectedModel} 
              parameters = {parameters} 
              onParameterChange={(param, value) => setParameters(prev => ({...prev, [param]: value}))}
          />

          {/* TTS Selection - Full Width */}
          <TrainTestSplitSlider
            trainTestSplit={trainTestSplit} 
            onTrainTestSplitChange={setTrainTestSplit}
          />

          {/* Train Button on Selection */}
          <TrainButton 
            selectedDataset = {selectedDataset} 
            selectedModel={selectedModel}
            parameters = {parameters}
            trainTestSplit ={trainTestSplit}
            setResults={setResults}
            // onTrainModel={trainModel}
          />
        </div>

        {/* Results */}
        <ResultsDisplay 
          results={results} 
          alias={alias} 
          onAliasChange={setAlias} 
          setResults={setResults}
          setDataset={setSelectedDataset}
          setModel={setSelectedModel}
          loadLeaderboard={loadLeaderboard}
          
        />

        {/* Leaderboard */}
        <Leaderboard 
          leaderboard={leaderboard} 
        />
      </div>
    </div>
  );

}

export default MLPlayground;
