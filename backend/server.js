const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ml-playground');

// Leaderboard Schema
const leaderboardSchema = new mongoose.Schema({
  alias: String,
  dataset: String,
  model: String,
  accuracy: Number,
  parameters: Object,
  trainTestSplit: Number,
  timestamp: { type: Date, default: Date.now }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// Routes
app.get('/api/leaderboard', async (req, res) => {
  try {
    const results = await Leaderboard.find().sort({ accuracy: -1 }).limit(10);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/train', async (req, res) => {
  try {
    const { dataset, model, parameters, trainTestSplit } = req.body;
    
    // Call ML service
    const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL || 'http://localhost:8000'}/train`, {
      dataset,
      model,
      parameters,
      train_test_split: trainTestSplit
    });
    
    res.json(mlResponse.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/leaderboard', async (req, res) => {
  try {
    const newEntry = new Leaderboard(req.body);
    await newEntry.save();
    res.json(newEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});