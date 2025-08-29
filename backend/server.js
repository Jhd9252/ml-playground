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

// Health check on deployment
app.get('/', (req, res) => {
    res.send('Backend is running');
  });

// apply middleware (cors, parser)
app.use(cors({ 
  origin: process.env.FRONTEND_URL || '*'
  // credentials: true
}));

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
  alias: {type: String, unique: true},
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
    console.log('Received request to pull leaderboard data...')
    const results = await Leaderboard.find().sort( {accuracy: -1} ).limit(10);
    res.json(results);

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

const { spawn } = require('child_process');

// POST train req => (MVP) Run python on Node.JS
app.post('/api/train', (req, res) => {

  console.log(req.body);

  console.log('Received request to run python script...')
  console.log('Attempting to spawn python child process from node...')
  const python = spawn('python3', ['./ml-service/app.py']);
 
  let output = '';
  let errorOutput = ''; 

  python.stdout.on('data', (data) => {
    output += data.toString();
  });

  python.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });


  python.on('close', (code) => {
    if (code !== 0) {
      console.error('Python error:', errorOutput || 'Unknown error (empty stderr)');
      return res.status(500).json({ error: 'Python script failed', details: errorOutput });
    }

    console.log('Attempting to train model...')
    try {  
      const result = JSON.parse(output);
      console.log('Sending result back...')
      res.json(result);
      console.log('Success')
    } catch (error) {
      console.error('JSON parse error:', error);
      res.status(500).json({error: 'Invalid JSON returned from Python'});
    }
  });
  console.log('Sending input from application into python services...')
  // validate shape of req.body
  if (!req.body || !req.body.dataset || !req.body.model) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  python.stdin.write(JSON.stringify(req.body));
  python.stdin.end();
});

// POST result submission to MongoDB
app.post('/api/submit', async (req, res) => {
  console.log('Attempting to submit results to MongoDB...')
  // check if alias exists
  try {
    const exist = await Leaderboard.findOne({alias: req.body.alias});
    if (exist) {
      return res.status(400).json({ error: 'Alias already exists' });
    }

    const entry = new Leaderboard(req.body);
    await entry.save();
    console.log('Success')
    res.json(entry);

  } catch (error) {
    // if req slips through
    if (error.code === 11000) {
      return res.status(400).json({error: 'Alias already exists'});
    }
    console.log('Fail')
    res.status(500).json({error: error.message});
  }
  
});

// listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
