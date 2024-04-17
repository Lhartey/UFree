// ApplicationRoutes.js
const express = require('express');
const Application = require('../models/applicationModels');
const router = express.Router();

// GET route to fetch all applications
router.get('/api/applications/get', async (req, res) => {
  try {
    // Fetch all applications from the database
    const applications = await Application.find();
    res.status(200).json(applications); // Return the applications as JSON response
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications!' });
  }
});

module.exports = router;
