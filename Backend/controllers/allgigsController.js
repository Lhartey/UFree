const Gig = require('../models/gigModels');

const getUserGigs = async (req, res) => {
    const user_id = req.user._id
    try {
      const gigs = await Gig.find({user_id}).sort({ createdAt: -1 });
  
      res.status(200).json(gigs);
    } catch (error) {
      handleError(error, req, res);
    }
  }

  module.exports = getUserGigs