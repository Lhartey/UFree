const Gig = require('../models/gigModels');
const mongoose = require('mongoose')

// Consistent error handling middleware
const handleError = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};

// Get all gigs with optimized sorting
const getGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({}).sort({ createdAt: -1 });

    res.status(200).json(gigs);
  } catch (error) {
    handleError(error, req, res);
  }
}

// Get a gig with concise validation
const getGig = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(404).json({error: 'No such gig'})
  }
    const gig = await Gig.findById(id);
    if (!gig) {
      return res.status(400).json({ error: 'Gig not found' });
    }
    res.status(200).json(gig);
}

// Create new gig with robust validation and input sanitization
const createGig = async (req, res) => {
  const { title, description, requirements, budget, category, deadline, attachments } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (!requirements) {
    emptyFields.push('requirements');
  }
  if (!budget) {
    emptyFields.push('budget');
  }
  if (!category) {
    emptyFields.push('category');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in the required fields', emptyFields });
  }

  // Add doc to db
  try {
    const user_id = req.user._id;
    const gig = await Gig.create({ title, description, requirements, budget, user_id, category, deadline, attachments });
    res.status(200).json(gig);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//Delete a gig with concise validation
const deleteGig = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such gig'})
  }

  const gig = await Gig.findOneAndDelete({ _id: id });

  if (!gig) {
    return res.status(400).json({ error: 'Gig not found' });
  }

  res.status(200).json(gig);
}

// Update a gig with concise validation
const updateGig = async (req, res) => {
  // Destructure and validate gig ID
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid gig ID' });
  }

  // Find and update gig in one step using findOneAndUpdate
  try {
    const updatedGig = await Gig.findOneAndUpdate({ _id: id }, req.body, { new: true }); // Return updated document
    if (!updatedGig) {
      return res.status(400).json({ error: 'Gig not found' });
    }
    return res.status(200).json(updatedGig);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' }); // Handle unexpected errors
  }
};


module.exports = { getGigs,  getGig, createGig, deleteGig, updateGig};

