const Interview = require("../models/Interview");

// 🎯 QUESTIONS
const questionBank = {
  "Frontend Developer": [
    "What is HTML?",
    "What is CSS Flexbox?",
    "Difference between let, var, const?",
    "What is React?",
    "Explain useState hook",
    "What is useEffect?",
    "What is Virtual DOM?",
    "What is responsive design?",
    "What is event delegation?",
    "What is closure?"
  ],
  "Backend Developer": [
    "What is Node.js?",
    "What is Express?",
    "What is REST API?",
    "What is middleware?",
    "What is JWT?",
    "What is MongoDB?",
    "What is database indexing?",
    "Difference between SQL and NoSQL?",
    "What is authentication?",
    "Explain CRUD operations"
  ],
  "Full Stack Developer": [
    "What is full stack development?",
    "Difference between frontend and backend?",
    "What is MERN stack?",
    "How frontend connects with backend?",
    "What is API?",
    "What is deployment?",
    "What is Git?",
    "What is version control?",
    "What is state management?",
    "Explain MVC architecture"
  ]
};


// 🚀 START
exports.startInterview = async (req, res) => {
  try {
    const { role } = req.body;

    const questions = questionBank[role];

    const data = await Interview.create({
      role,
      questions,
      index: 0,
      answers: [],
      scores: [],
      feedbacks: [],
      startTime: new Date()
    });

    res.json({
      interviewId: data._id,
      question: questions[0]
    });

  } catch (err) {
    res.status(500).json({ message: "Error starting interview" });
  }
};


// 💬 CHAT + AI EVALUATION
exports.chatInterview = async (req, res) => {
  try {
    const { interviewId, message } = req.body;

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({ message: "Not found" });
    }

    // 🧠 SMART SCORING
    let score = 0;

    if (!message || message.trim() === "") {
      score = 0;
    } else if (message.length < 30) {
      score = 4;
    } else if (message.length < 80) {
      score = 6;
    } else if (message.toLowerCase().includes("example")) {
      score = 9;
    } else {
      score = 8;
    }

    // 🎯 FEEDBACK
    let feedback = "Needs improvement ❗";

    if (score >= 9) feedback = "Excellent answer 🔥";
    else if (score >= 7) feedback = "Good explanation 🙂";
    else if (score >= 5) feedback = "Average, explain more";
    else feedback = "Too short ❗";

    // SAVE
    interview.answers.push(message);
    interview.scores.push(score);
    interview.feedbacks.push(feedback);

    interview.index += 1;

    // ✅ FINAL RESULT
    if (interview.index >= interview.questions.length) {

      const totalScore = interview.scores.reduce((a, b) => a + b, 0);
      const totalQuestions = interview.questions.length;
      const percentage = (totalScore / (totalQuestions * 10)) * 100;

      let performance = "Needs Improvement ❗";
      if (percentage > 80) performance = "Excellent 🔥";
      else if (percentage > 50) performance = "Good 🙂";

      interview.endTime = new Date();

      await interview.save();

      return res.json({
        completed: true,
        totalScore,
        totalQuestions,
        percentage: percentage.toFixed(2),
        performance,
        questions: interview.questions,
        answers: interview.answers,
        feedbacks: interview.feedbacks   // 🔥 IMPORTANT
      });
    }

    const nextQ = interview.questions[interview.index];

    await interview.save();

    res.json({
      completed: false,
      score,
      feedback,
      nextQuestion: nextQ
    });

  } catch (err) {
    res.status(500).json({ message: "Chat error" });
  }
};