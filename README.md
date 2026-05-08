# 🤖 AI Mock Interview Platform

An intelligent web-based platform to practice technical interviews with AI, get instant feedback, and track your performance.

---

## 🚀 Features

* 🎤 AI-powered mock interviews
* 💬 Real-time question-answer interaction
* 🤖 AI feedback on answers
* 📊 Performance analytics dashboard
* 🎙️ Voice input support
* 🎥 Video interview simulation
* 📜 Interview history tracking

---

## 🖥️ Tech Stack

### Frontend

* React.js
* React Router
* CSS (Custom Styling)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Other Tools

* JWT Authentication
* bcrypt (Password hashing)
* Web Speech API (Voice input)

---

## 📂 Project Structure

```
ai-mock-interview/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ai-mock-interview.git
cd ai-mock-interview
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

### 🔐 Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### 🎤 Interview

* POST `/api/interview/start`
* POST `/api/interview/chat`
* GET `/api/interview/history`

---

## 📸 Screenshots

* 🏠 Home Page
* 📊 Dashboard
* 🎤 Interview Page
* 📜 History Page

---

## ✨ Future Improvements

* 🧠 GPT-based answer evaluation
* 📊 Advanced analytics charts
* 🎯 Personalized interview questions
* 🌍 Live deployment (Vercel + Render)
* 🗣️ AI avatar speaking UI

---

## 👨‍💻 Author

**Ayushi Kumari**

* 💼 Aspiring Frontend Developer
* 🎯 Focused on placement & real-world projects

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
