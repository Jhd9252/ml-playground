// frontend/src/mockAPI.js
const mockAPI = {
    // mock API for python backend
    trainModel: async (config) => {
    // Simulate training delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Return mock results
    return {
        accuracy: Math.random() * 0.4 + 0.6, // Random accuracy between 0.6-1.0
        train_size: Math.floor(config.trainTestSplit * 1000),
        test_size: Math.floor((1 - config.trainTestSplit) * 1000)
    };
    },
  
    // mock api for leaderboard backend mongodb (POST)
    submitToLeaderboard: async (entry) => {
    // Mock submission
    return { success: true };
    },
  
    // mock api for fetching leaderboard data (GET)
    getLeaderboard: async () => {
    // mock leaderboard data
    return [
        { _id: '1', alias: 'MLMaster', dataset: 'iris', model: 'random_forest', accuracy: 0.97, timestamp: new Date() },
        { _id: '2', alias: 'DataScientist', dataset: 'wine', model: 'svm', accuracy: 0.95, timestamp: new Date() },
        { _id: '3', alias: 'AIExplorer', dataset: 'breast_cancer', model: 'logistic_regression', accuracy: 0.93, timestamp: new Date() },
        { _id: '4', alias: 'CodeNewbie', dataset: 'iris', model: 'svm', accuracy: 0.91, timestamp: new Date() },
        { _id: '5', alias: 'PythonPro', dataset: 'wine', model: 'random_forest', accuracy: 0.89, timestamp: new Date() }
    ];
    }
};

export default mockAPI;