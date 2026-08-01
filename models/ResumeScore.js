const mongoose = require("mongoose");

const ResumeScoreSchema = new mongoose.Schema({
  email: String,
  score: Number,
  skills: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ResumeScore", ResumeScoreSchema);
