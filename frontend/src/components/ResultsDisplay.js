import React from 'react';

const ResultsDisplay = ({ 
  results, 
  alias, 
  onAliasChange, 
  onSubmitToLeaderboard 
}) => {
  if (!results) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Results</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-blue-600">
            {(results.accuracy * 100).toFixed(1)}%
          </div>
          <div className="text-blue-800 font-medium">Accuracy</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {results.train_size}
          </div>
          <div className="text-green-800 font-medium">Train Samples</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            {results.test_size}
          </div>
          <div className="text-purple-800 font-medium">Test Samples</div>
        </div>
      </div>
      
      {/* Submit to Leaderboard */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-3">Submit to Leaderboard</h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter your alias"
            value={alias}
            onChange={(e) => onAliasChange(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            onClick={onSubmitToLeaderboard}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
