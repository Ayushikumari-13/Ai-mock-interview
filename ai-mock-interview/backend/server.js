const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/aimock")
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log(err));





// 🧠 MEMORY STORE
let interviews = {};

// 🎯 QUESTION BANK
const questionBank = {
  "Frontend Developer": [
    "What is HTML?",
    "What is CSS Flexbox?",
    "What is React?"
  ],
  "Backend Developer": [
    "What is Node.js?",
    "What is REST API?",
    "What is database?"
  ],
  "Full Stack Developer": [
    "Explain full stack development",
    "Difference between frontend and backend"
  ]
};

// 🔥 TEST ROUTE (check server working)
app.get("/", (req, res) => {
  res.send("✅ Server working properly");
});


// 🚀 START INTERVIEW
app.post("/api/interview/start", (req, res) => {
  console.log("🔥 START API HIT");

  const { role } = req.body;

  const questions = questionBank[role] || questionBank["Frontend Developer"];

  const interviewId = Date.now().toString();

  interviews[interviewId] = {
    questions,
    currentIndex: 0,
    answers: [],
    createdAt: new Date()
  };

  res.json({
    interviewId,
    question: questions[0]  // ✅ ALWAYS SEND FIRST QUESTION
  });
});


// ➡ NEXT QUESTION
app.post("/api/interview/chat", (req, res) => {
  console.log("➡ CHAT API HIT");

  const { interviewId, message } = req.body;

  const interview = interviews[interviewId];

  if (!interview) {
    return res.status(404).json({ error: "Interview not found ❌" });
  }

  // save answer
  interview.answers.push(message);

  // move next
  interview.currentIndex++;

  // 🎯 FINISH
  if (interview.currentIndex >= interview.questions.length) {
    return res.json({
      completed: true,
      performance: "Good 👍",
      totalScore: 80,
      percentage: 80,
      questions: interview.questions,
      answers: interview.answers
    });
  }

  // 🔥 NEXT QUESTION
  res.json({
    nextQuestion: interview.questions[interview.currentIndex]
  });
});


// 📊 HISTORY (FOR HOME PAGE COUNT)
app.get("/api/interview/history", (req, res) => {
  res.json(Object.values(interviews));
});


// 🚀 SERVER START
app.listen(5000, () => {
  console.log("🔥 Server running on http://localhost:5000");
});