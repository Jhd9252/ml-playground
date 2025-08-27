import React, { useState, useEffect } from 'react';
import mockAPI from './mockAPI';
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
  const [parameters, setParameters] = useState({});
  const [trainTestSplit, setTrainTestSplit] = useState(0.8);

  // Send user options to backend and get results
  const [loading, setLoading] = useState(false);

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
      const data = await mockAPI.getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////
  
  // training model and mock API (frontend/src/mockAPI.js)
  const trainModel = async () => {
    if (!selectedDataset || !selectedModel) {
      alert('Please select both dataset and model');
      return;
    } 
    setLoading(true);
    try {
      const config = {
        dataset: selectedDataset,
        model: selectedModel,
        parameters,
        trainTestSplit
      };
      const response = await mockAPI.trainModel(config);
      setResults(response);  
    } catch (error) {
      console.error('Error training model:', error);
      alert('Error training model');
    }
    setLoading(false);
  };

  //////////////////////////////////////////////////////////////////////////////////
  // submission API req 
  const submitToLeaderboard = async () => {
    if (!alias.trim() || !results) {
      alert('Please enter an alias and train a model first');
      return;
    }
    try {
      const entry = {
          alias: alias.trim(),
          dataset: selectedDataset,
          model: selectedModel,
          accuracy: results.accuracy,
          parameters,
          trainTestSplit,
          timestamp: new Date()
      };
      await mockAPI.submitToLeaderboard(entry);
      // Add to local leaderboard and sort
      const updatedLeaderboard = [...leaderboard, { ...entry, _id: Date.now().toString() }]
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 10);
      setLeaderboard(updatedLeaderboard);
      setAlias('');
      alert('Submitted to leaderboard!');
    } catch (error) {
        console.error('Error submitting to leaderboard:', error);
        alert('Error submitting to leaderboard');
        return;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////
  return (
    <div className = 'min-h-screen bg-gray-50'>

      <header className = 'bg-blue-600 text-white py-6'>
        <div className = 'max-w-6xl mx-auto px-4'>
          <h1 className = 'text-3xl font-bold text-center'> ML PlayGround</h1>
          <p className = 'text-center mt-2 text-blue-100'> 
            Train classification machine learning models with interactive parameters
          </p>
        </div>
      </header>
  
      <div className = 'max-w-6xl mx-auto px-4 py-8'>

        {/* Main Controls */}
        <div className = 'bg-white rounded-lg shadow-lg p-6 mb-8'>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Configure Your Model</h2>
          <div className="grid md:grid-cols-2 gap-6">

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
            />

            {/* Parameters Selection */}
            <ModelParameterSliders 
              selectedModel = {selectedModel} 
              parameters = {parameters} 
              onParameterChange={(param, value) => setParameters(prev => ({...prev, [param]: value}))}
            />

          </div>

          {/* TTS Selection - Full Width */}
          <TrainTestSplitSlider
            trainTestSplit={trainTestSplit} 
            onTrainTestSplitChange={setTrainTestSplit}
          />
          {/* Train Button on Selection */}
          <TrainButton 
            loading = {loading} 
            selectedDataset = {selectedDataset} 
            selectedModel={selectedModel} 
            onTrainModel={trainModel}
          />
        </div>

        {/* Results */}
        <ResultsDisplay 
          results={results} 
          alias={alias} 
          onAliasChange={setAlias} 
          onSubmitToLeaderboard={submitToLeaderboard}
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
