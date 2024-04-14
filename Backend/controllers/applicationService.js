const Application = require('../models/applicationModels'); // Replace with your model path

async function saveApplicationData(name, email, fileUrl) {
  try {
    const newApplication = new Application({ name, email, coverLetterFile: fileUrl });
    await newApplication.save();
    return newApplication; // Optional: return the created application document
  } catch (error) {
    console.error('Error saving application data:', error);
    throw new Error('Failed to save application');
  }
}

module.exports = { saveApplicationData };
