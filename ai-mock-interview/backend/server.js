const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ MONGODB CONNECT
mongoose.connect(
  "mongodb://127.0.0.1:27017/aimock"
)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log("❌ MongoDB Error:", err);
});

// 🧠 MEMORY STORE
let interviews = [];

// 👤 USERS STORE
let users = [];

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

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("✅ Server working properly");
});


// ======================================================
// ✅ REGISTER API
// ======================================================

app.post("/api/auth/register", (req, res) => {

  console.log("🔥 REGISTER API HIT");

  const { name, email, password } = req.body;

  // ✅ CHECK EMPTY
  if (!name || !email || !password) {

    return res.status(400).json({
      message: "All fields are required ❌"
    });

  }

  // ✅ CHECK USER EXISTS
  const existingUser = users.find(
    (user) => user.email === email
  );

  if (existingUser) {

    return res.status(400).json({
      message: "User already exists ❌"
    });

  }

  // ✅ SAVE USER
  const newUser = {
    id: Date.now(),
    name,
    email,
    password
  };

  users.push(newUser);

  res.status(200).json({
    success: true,
    message: "Registered Successfully ✅",
    user: newUser
  });

});


// ======================================================
// ✅ LOGIN API
// ======================================================

app.post("/api/auth/login", (req, res) => {

  console.log("🔥 LOGIN API HIT");

  const { email, password } = req.body;

  // ✅ FIND USER
  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  if (!user) {

    return res.status(401).json({
      message: "Invalid email or password ❌"
    });

  }

  res.status(200).json({
    success: true,
    message: "Login Successful ✅",
    token: "dummy-token",
    user
  });

});


// ======================================================
// 🚀 START INTERVIEW
// ======================================================

app.post("/api/interview/start", (req, res) => {

  console.log("🔥 START API HIT");

  const { role } = req.body;

  const questions =
    questionBank[role] ||
    questionBank["Frontend Developer"];

  const interviewId =
    Date.now().toString();

  const newInterview = {

    interviewId,

    role,

    questions,

    currentIndex: 0,

    answers: [],

    totalScore: 80,

    percentage: 80,

    feedbacks: [
      "Good answer 👍",
      "Nice explanation 👍",
      "Well done 👍"
    ],

    createdAt: new Date()

  };

  interviews.push(newInterview);

  res.status(200).json({

    interviewId,

    question: questions[0]

  });

});


// ======================================================
// ➡ NEXT QUESTION
// ======================================================

app.post("/api/interview/chat", (req, res) => {

  console.log("➡ CHAT API HIT");

  const { interviewId, message } = req.body;

  const interview = interviews.find(
    (item) =>
      item.interviewId === interviewId
  );

  if (!interview) {

    return res.status(404).json({
      error: "Interview not found ❌"
    });

  }

  // ✅ SAVE ANSWER
  interview.answers.push(message);

  // ✅ NEXT QUESTION
  interview.currentIndex++;

  // ✅ FINISH INTERVIEW
  if (
    interview.currentIndex >=
    interview.questions.length
  ) {

    return res.status(200).json({

      completed: true,

      performance: "Good 👍",

      totalScore: interview.totalScore,

      percentage: interview.percentage,

      questions: interview.questions,

      answers: interview.answers

    });

  }

  // ✅ SEND NEXT QUESTION
  res.status(200).json({

    nextQuestion:
      interview.questions[
        interview.currentIndex
      ]

  });

});


// ======================================================
// 📊 HISTORY API
// ======================================================

app.get("/api/interview/history", (req, res) => {

  console.log("📊 HISTORY API HIT");

  res.status(200).json(interviews);

});


// ======================================================
// 🚀 SERVER START
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🔥 Server running on http://localhost:${PORT}`
  );

});