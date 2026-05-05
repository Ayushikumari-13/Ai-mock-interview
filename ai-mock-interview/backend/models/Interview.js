const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    trim: true
  },

  questions: {
    type: [String],
    default: []
  },

  index: {
    type: Number,
    default: 0
  },

  answers: {
    type: [String],
    default: []
  },

  scores: {
    type: [Number],
    default: []
  },

  feedbacks: {
    type: [String],
    default: []
  },

  // 🔥 NEW (AI evaluation future use)
  strengths: {
    type: [String],
    default: []
  },

  weaknesses: {
    type: [String],
    default: []
  },

  totalScore: {
    type: Number,
    default: 0
  },

  percentage: {
    type: Number,
    default: 0
  },

  startTime: {
    type: Date,
    default: Date.now
  },

  endTime: {
    type: Date
  }

}, {
  timestamps: true   // 🔥 history + dashboard के लिए important
});

module.exports = mongoose.model("Interview", interviewSchema);