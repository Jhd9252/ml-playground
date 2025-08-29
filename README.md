# ML Playground

## Deployment Strategy

- **Frontend**: [Vercel](https://vercel.com/)
- **Backend**: [Railway](https://railway.app/), [Render](https://render.com/), or [Heroku](https://www.heroku.com/) *(free tiers available)*
- **ML Service**: Same platform as backend (containerized)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

---

## Features

1. Users choose between predetermined datasets, models, parameters, and train-test-split ratio
2. Users click "Train" and get model results
3. Users can optionally submit results to a leaderboard using an alias

---

## Personal Goals

- Learn, test, apply the basics of **HTML, CSS, JS**
- Build and integrate a backend using **Express/Node.js**
- Get hands-on experience with **APIs** and **Docker**

---

## ✅ Current (Runs Locally)
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
---

## Next
- Deploy backend to render, frontend to vercel
- test complete user experience
- Add more datasets (sklearn, processed)
- Add more models and parameters
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

## Project Setup

### Frontend Setup (React + TailwindCSS)

```bash
npx create-react-app frontend
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
### Backend Setup

```bash
mkdir backend
cd backend

# Initialize and install dependencies
npm init -y
npm install express mongoose cors axios dotenv
npm install -D nodemon

# Create server.js manually
```
## Testing

### Starting Frontend
```bash
cd frontend
npm install
npm start
```

### Starting backend
```bash
mkdir backend
cd backend
```
#### Run backend with nodemon
```bash
npx nodemon server.js
```
#### Run backend with nodemon (scripts)
##### In backend/package.json

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

#### Run scripts using:
```bash
npm run dev
```

## deployment 

### backend (if with railway)
```bash
npm install -g @railway/cli
railway login
cd backend
railway init
railway up
```

### Deploy Frontend (if with Vercel)

1. Connect GitHub repo to Vercel
2. Set build command: npm run build
3. Add env variable:
4. REACT_APP_API_URL=your_backend_url


# Access (Local Development)

1. Frontend: http://localhost:3000
2. Backend: http://localhost:5000
3. ML Service: http://localhost:8000

