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
  timestamp: { type: Date, default: Date.now }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// Simple handling of routes, endpoints, controllers (global routes)
// get(path, callback function)

// GET leaderboard stats
app.get('/api/getLeaderboard', async (req, res) => {
  try {
    const results = await Leaderboard.find().sort( {accuracy: -1} ).limit(10);
    res.json(results);
    console.log('Got API Leaderboard requests success')
    console.log(typeof results)
    console.log('Full Data: ', results)
    // console.log(typeof res)
    // console.log(result)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// POST train req => (MVP) Run python on Node.JS
app.post('/api/train', (req, res) => {
  const inputData = JSON.stringify(req.body);
  const python = spawn('python3', ['../ml-service/app.py', inputData]);

  let output = '';
  let errorOutput = '';

  python.stdout.on('data', (data) => {
    output += data.toString();
  });

  python.stdout.on('data', (data) => {
    errorOutput += data.toString();
  });

  python.on('close', (code) => {
    if (code !== 0) {
      console.error('Python error: ', errorOutput);
      return res.stats(500).json({error: 'Python script failed'});
    }

    try {
      const result = JSON.parse(output);
      res.json(result);
    } catch (error) {
      res.status(500).json({error: 'Invalid JSON returned from Python'});
    }

  });

  python.stdin.write(JSON.stringify(req.body));
  python.stdin.end();
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
