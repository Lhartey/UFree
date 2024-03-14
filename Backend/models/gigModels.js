const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    or: [String], // Allow single string or array of strings for skills
  },
  budget: {
    type: Number,
    required: true,
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  attachments: {
    type: [String], // Array of file paths or references (optional)
  },
} , {timestamp: true,});

module.exports = mongoose.model('Gig', gigSchema);