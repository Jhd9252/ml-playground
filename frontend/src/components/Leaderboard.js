import React from 'react';

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">🏆 Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Alias</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Dataset</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Model</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Accuracy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaderboard.map((entry, index) => (
              <tr key={entry._id} className={`${index < 3 ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                    index === 0 ? 'bg-yellow-400 text-yellow-900' :
                    index === 1 ? 'bg-gray-400 text-gray-900' :
                    index === 2 ? 'bg-orange-400 text-orange-900' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{entry.alias}</td>
                <td className="px-4 py-3 text-gray-600 capitalize">
                  {entry.dataset.replace('_', ' ')}
                </td>
                <td className="px-4 py-3 text-gray-600 capitalize">
                  {entry.model.replace('_', ' ')}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {(entry.accuracy * 100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {leaderboard.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No entries yet. Train a model and be the first on the leaderboard!
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
