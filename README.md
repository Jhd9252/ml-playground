# Deployment Strategy:
Frontend: Vercel
Backend: Railway, Render, or Heroku (free tiers available)
ML Service: Same platform as backend (containerized)
Database: MongoDB Atlas

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

# Features I wanted: 
(1) Users choose between predetermined datasets, models, parameters, train-test-split ratio
(2) Users can click train and get results
(3) Users have an option to submit results to a leaderboard with an alias


# Personal Goals: 
- Learn, test, apply the basics of HTML, CSS, JS
- Apply and implement a project using Express and Node as backend
- Get exposure to API's and basic docker. 

# Current (Mock):
✅ A working React frontend (with mock data API for training, submission, leaderboard)

# Next Steps:
❌ Set up MongoDB Atlas and get connection string
❌ ML Service (Python/Flask) - handles the actual machine learning
❌ Backend API (Node.js/Express) - handles requests and database
❌ Connect Frontend - replace mock data with real API calls
❌ Test everything locally
❌ Deploy backend to Railway/Render
❌ Deploy frontend to Vercel
❌ Test the complete flow
##############################################################################
Front End:

    React Components:

        (1) Dataset Drop Down (iris, wine, breast cancer)

        (2) Model Drop Down (RF, SVM, Logistic)

        (3) Model Parameter Sliders (RF: N-est, MaxDepth, Logistic: C, SVM: C)

        (4) Train Test Split Slider 

        (5) Train Button (API request to backend, to python container, and back to frontend)

        (6) Results Display (accuracy, train size, test size) 
            - option to create and submit [alias, dataset, model, accuracy]

        (7) Leaderboard (on mount, API Req)
            - View [rank, alias, dataset, model, accuracy]
    
    App.css
    App.js
    index.css
    index.js
    mockAPI.js 



APIs:
    (1) Train (onclick): Sends user choice to backend for training (BE, Python Res, BE, FE)
    (2) Results: Option to create alias to submit to leaderboard (FE->BE->DB) and back for display
    (3) Get leaderboard data: Get request from FE->BE->DB and back for displa
    







##############################################################################
# Create frontend (via create react app)
npx create-react-app frontend
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# create backend (manually)
mkdir backend
cd backend
## Initialize package.json (answers "yes" to all questions)
npm init -y                                     
## Install the packages & dependencies we need
npm install express mongoose cors axios dotenv  
## Install nodemon for development (restarts server when files change)
npm install -D nodemon
## Then create server.js manually

# Installing Node.js
1. From website (LTS)
2. If brew is installed, run 'brew install node'

## running backend
cd backend && npm run dev

cd ml-service && python app.py

docker run -p 27017:27017 mongo


























# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
cd backend
railway init
railway up

# Render: 
Connect GitHub repo, choose backend folder, set build command to npm install

# Frontend Deployment (Vercel)
Connect GitHub repo to Vercel
Set build command: npm run build
Set environment variable: REACT_APP_API_URL=your_backend_url

# Getting Started

## Clone and setup:
bashgit clone your-repo
cd ml-playground

## Local development:
bash# Start all services
docker-compose up

## Access: (Local)
Frontend: http://localhost:3000
#Backend: http://localhost:5000
ML Service: http://localhost:8000

## Backend Commands
cd backend
npm install
npm run dev

## ML Service Commands
cd ml-service
pip install -r requirements.txt
python app.py

## Frontend Commands
cd frontend
npm install
npm start

