const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  hallticket: String,
  name: String,
  telugu: Number,
  hindi: Number,
    urdu: Number,
  english: Number,
  maths: Number,
  science: Number,
  social: Number,
  total: Number,
  result: String
});

module.exports = mongoose.model("Student", studentSchema);