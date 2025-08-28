// imports 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

// // This loads .env variables into process.env 
require('dotenv').config();

// create express and port
const app = express();
const PORT = process.env.PORT || 5000;

// apply middleware (cors, parser)
app.use(cors());
app.use(express.json());

// import routes (not needed in MVP)
// use routes (not needed in MVP)

// mongoDB connection 
mongoose.connect(process.env.MONGODB_URI);

/* 
create schema / new mongoose.Schema({});            -> create class attributes
create model  / mongoose.model('NAME', Schema)      -> create mongoose class from schema
use model     / built-in methods model.save(), etc. -> interact with DB
*/
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

// Simple handling of routes, endpoints, controllers (global routes)
// get(path, callback function)

// GET leaderboard stats
app.get('/api/getLeaderboard', async (req, res) => {
  try {
    const results = await Leaderboard.find().sort( {accuracy: -1}).limit(10);
    res.json(results);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// POST train req to ML service
app.post('/api/train', async (req, res) => {
  try {
    const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL || 'http://localhost:8000'}/train`, {
      dataset,
      model,
      parameters,
      train_test_split: trainTestSplit
    });
    res.json(mlResponse.data);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// POST result submission to MongoDB
app.post('/api/submit', async (req, res) => {
  try {
    const entry = new Leaderboard(req.body);
    await entry.save();
    res.json(newEntry);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
  
});

// listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
