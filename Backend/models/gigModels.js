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
    or: [String],
    required: true, 
  },
  budget: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true
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
  createdAt: {
    type: Date,
    default: Date.now
  }
} , {timestamp: true,});

module.exports = mongoose.model('Gig', gigSchema);