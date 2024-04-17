const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  coverLetter: { type: String, required: true } // Stores the uploaded file key
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
