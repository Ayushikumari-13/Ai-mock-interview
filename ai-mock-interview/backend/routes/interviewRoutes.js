const express = require("express");
const router = express.Router();

const {
  startInterview,
  chatInterview
} = require("../controllers/interviewController");

const Interview = require("../models/Interview");


// 🚀 START INTERVIEW
// POST → /api/interview/start
router.post("/start", startInterview);


// 💬 CHAT (Next + Submit)
// POST → /api/interview/chat
router.post("/chat", chatInterview);


// 📜 GET ALL HISTORY (IMPORTANT 🔥)
// GET → /api/interview/history
router.get("/history", async (req, res) => {
  try {
    const data = await Interview.find().sort({ createdAt: -1 });

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: "Error fetching history" });
  }
});


// 📄 GET SINGLE INTERVIEW BY ID
// GET → /api/interview/:id
router.get("/:id", async (req, res) => {
  try {
    const data = await Interview.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: "Error fetching interview" });
  }
});


module.exports = router;