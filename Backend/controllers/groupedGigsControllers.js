// Import necessary modules
const express = require('express');
const Gig = require('../models/gigModels'); // Import your Gig model

// Create an Express router
const router = express.Router();

// Route to fetch grouped gigs by category
const getGroupedGigs = async (req, res) => {
  try {
    // Optional filtering based on query parameters (replace with your desired filtering logic)
    const filters = {};
    if (req.query.city) {
      filters.city = req.query.city;
    }
    if (req.query.date) {
      filters.date = req.query.date; // Adjust date format as needed
    }

    // Aggregation pipeline with optional filtering
    const pipeline = [
      { $match: filters }, // Apply filters if any
      { $group: { _id: '$category', gigs: { $push: '$$ROOT' } } },
    ];

    // Aggregate gigs to group by category
    const groupedGigs = await Gig.aggregate(pipeline);

    res.json(groupedGigs);
  } catch (error) {
    console.error(error);

    // More specific error handling based on error type
    if (error.name === 'MongoError') {
      res.status(400).json({ message: 'Invalid query parameter(s)' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// Export the router
module.exports = getGroupedGigs;
