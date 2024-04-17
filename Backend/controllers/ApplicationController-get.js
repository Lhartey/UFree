// ApplicationController.js
const Application = require('../models/applicationModels');

// Function to fetch all applications
const getAllApplications = async (req, res) => {
  try {
    // Fetch all applications from the database
    const applications = await Application.find();
    res.status(200).json(applications); // Return the applications as JSON response
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications!' });
  }
};

module.exports = {
  getAllApplications
};
