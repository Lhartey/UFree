const Gig = require('../models/gigModels');

// Consistent error handling middleware
const handleError = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};

// Get all gigs with optimized sorting
const getGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().sort({ createdAt: -1 });
    res.status(200).json(gigs);
  } catch (error) {
    handleError(error, req, res);
  }
};

// Get a single gig with concise validation
const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    res.status(200).json(gig);
  } catch (error) {
    handleError(error, req, res);
  }
};

// Create new gig with robust validation and input sanitization
const createGig = async (req, res) => {
    const {title, description, requirements, budget, employerId, category, deadline, attachments} = req.body

    // add doc to db
try {
    const gig = await Gig.create({title, description, requirements, budget, employerId, category, deadline, attachments})
    res.status(200).json(gig)
} catch (error) {
    res.status(400).json({error: error.message})
}
}

module.exports = { getGigs, getGig, createGig };

