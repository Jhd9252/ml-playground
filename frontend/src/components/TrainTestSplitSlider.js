import React from 'react';

const TrainTestSplitSlider = ({ trainTestSplit, onTrainTestSplitChange }) => {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-white-500 text-center mb-2">
        Train/Test Split: {Math.round(trainTestSplit * 100)}% Train / {Math.round((1 - trainTestSplit) * 100)}% Test
      </label>
      <input
        type="range"
        min="0.5"
        max="0.9"
        step="0.05"
        value={trainTestSplit}
        onChange={(e) => onTrainTestSplitChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-xs text-white-500 font-medium mt-1">
        <span>50% Train</span>
        <span>90% Train</span>
      </div>
    </div>
  );
};

export default TrainTestSplitSlider;
