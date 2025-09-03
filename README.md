# Backend - QuizMaster 🎯

This is the **backend service** for the QuizMaster application.  
It provides APIs for user management, quiz handling, and score tracking.  
The backend is built with **Node.js, Express, and MongoDB**.

---

## 🚀 Features
- User signup and login
- Create, fetch, and manage quizzes
- Store and retrieve quiz results
- MongoDB integration for persistent storage
- CORS-enabled API for frontend access

---

## 🌐 Links and Deployment
- Frontend Repo: [quizMaster](https://github.com/pranavtss/quizMaster.git)
- Frontend Live (Vercel): [QuizMaster App](https://quiz-master-six-iota.vercel.app/)

---

## 🛠️ Tech Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB + Mongoose** - Database & ODM
- **CORS** - Cross-origin support

---

## ⚙️ Installation & Setup

Run the following commands step by step:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/pranavtss/Backend-QuizMaster.git
cd Backend-QuizMaster

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create a .env file for environment variables
cat > .env << EOL
MONGO_URI=mongodb://localhost:27017/quizMaster
PORT=5000
EOL

# 4️⃣ Start the server
npm start
