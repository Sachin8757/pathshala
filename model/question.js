// models/Question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctAnswer: String // optional, used for checking result later
});

module.exports = mongoose.model("Question", questionSchema);
