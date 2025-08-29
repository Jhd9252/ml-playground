# ML Playground

## Deployment Strategy

- **Frontend**: [Vercel](https://vercel.com/)
- **Backend**: [Render](https://render.com/)
- **ML Service**: Same platform as backend (spawn)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

---

## Features

1. Users choose between predetermined datasets, models, parameters, and train-test-split ratio
2. Users click "Train" and get model results
3. Users can optionally submit results to a leaderboard using an alias

---

## Personal Goals

- Learn, test, apply the basics of **HTML, CSS, JS, React**
- Build and integrate a backend using **Express/Node.js**
- Get hands-on experience with **RESTful APIs**, **CORS**, **deployment**

---
## Challenges:
- First time building a full stack SPA
- First time using Tailwind CSS
- React components, react hooks, async awaits, etc. 
- CORS
- Spawning python ML-service within Node
---

## ✅ Current (Deployed)
- Planning basic concepts (done)
- Basic project structure, setup, dependencies (done)
- Basic render in App.js (done)
- DatasetDropdown component (done)
- ModelDropdown component (done)
- TrainTestSplit component (done)
- ModelParameters component (done)
- TrainButton component with mock API (done)
- ResultDisplay component with mock API (done)
- Leaderboard component with mock API (done)
- Page Styling with TailwindCSS (done)
- MongoDB Atlas installation, setup, connection (done)
- Tested DB connection with mock data in MongoDB (done)
- Built/tested API for pulling leaderboard data (done)
- Built ML service in python file (running Node spawn) (done)
- Built/tested API for training displaying results (done)
- Built/tested API for result submission to MongoDB (done)
- Corrected routing and env for deployment (done)
- Backend deployment on Render, setup, build scripts. (done)
- Test with local frontend and MongoDB (done)
- Frontend deployment on Vercel, setup, build scripts. 
- Tested full deployment and APIs (done)
---

## Next
- Add more datasets (pre-cleaned)
- Add more models and parameters
- Create more difficulty in accuracy
- Allow users to submit there own datasets
---

## Frontend Overview

### React Components

1. **Dataset Dropdown**: iris, wine, breast cancer
2. **Model Dropdown**: RF, SVM, Logistic Regression
3. **Model Parameter Sliders**:  
   - RF: `n_estimators`, `max_depth`  
   - Logistic: `C`  
   - SVM: `C`
4. **Train-Test Split Slider**
5. **Train Button**:  
   - Triggers API → backend → ML service → result → frontend
6. **Results Display**:  
   - Shows accuracy, train/test size  
   - Option to submit [alias, dataset, model, accuracy]
7. **Leaderboard**:  
   - Loads on mount  
   - Displays [rank, alias, dataset, model, accuracy]
---

## 🔌 API Overview

1. **Train (POST)**  
   Sends user config to backend → Python ML container → returns results

2. **Submit Result (POST)**  
   Frontend sends alias + result → backend → MongoDB → confirms save

3. **Get Leaderboard (GET)**  
   Frontend requests leaderboard → backend → MongoDB → returns data

---

## Project Setup (Local)

### Frontend Setup (React + TailwindCSS)

```bash
npx create-react-app frontend
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
### Backend Setup (Express, Node)

```bash
mkdir backend
cd backend

npm init -y                 # Initialize package.json FIRST
npm install express mongoose cors axios dotenv
npm install -D nodemon      # dev dependency for auto-restart

# Create server.js manually
```
---
### Changing .env

- Create a **/backend/.env** file with:

```bash
MONGODB_URI=<YOUR_DB_URL>
FRONTEND_URL=http://localhost:3000
PORT=5000
```
- Create a **/frontend/.env** file with REACT_APP_API_URL

```bash
REACT_APP_API_URL=http://localhost:5000
```

- This will allow local routes in the App.js, server.js, TrainButton.js, ResultsDisplay.js:


---
## Running

### Starting Frontend

```bash
cd frontend
npm start
```
### Starting backend
```bash
cd backend
npx nodemon server.js

# OR 

cd backend 
npm run dev
```

- To run "npm run dev" (cleaner and quicker), to to **package.json** and edit:
- "scripts": {"start": "node server.js", "dev": "nodemon server.js"}

---

## Access (Local Development)

1. Frontend: http://localhost:3000
2. Backend: http://localhost:5000
3. ML Service: http://localhost:8000 (Not needed if Node spawn)


