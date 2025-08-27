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

## ✅ Current (Mock Implementation)

- A working **React frontend** with mock APIs for:
  - Training
  - Submission
  - Leaderboard display

---

## Next Steps

- ❌ Set up **MongoDB Atlas** and connect
- ❌ Build **ML Service (Python/Flask)** to handle actual machine learning
- ❌ Build **Backend API (Node.js/Express)** to interface with ML service and DB
- ❌ Replace frontend mock APIs with real **API calls**
- ❌ Test everything **locally**
- ❌ Deploy backend to **Railway/Render**
- ❌ Deploy frontend to **Vercel**
- ❌ Test the **complete user flow**

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
cd backend
npm install
npm run dev
```
### starting ML service
```bash
cd ml-service
pip install -r requirements.txt
python app.py
```

### Run with Docker Compose (Local Dev)
```bash
docker-compose up
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

# Project Structure: 
ml-playground/
├── frontend/                # React app 
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   └── App.css          # Styles
│   ├── package.json         # Frontend dependencies
│   └── Dockerfile           # How to containerize frontend
│
├── backend/                 # Express.js server (API)
│   ├── server.js            # Main server file
│   ├── package.json         # Backend dependencies  
│   └── Dockerfile           # How to containerize backend
│
├── ml-service/              # Python ML service
│   ├── app.py               # Flask server with ML logic
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile           # How to containerize ML service
│
└── docker-compose.yml     # Runs all services together locally
