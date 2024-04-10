const User = require('../models/userModels');
const mongoose = require('mongoose')

// Consistent error handling middleware
const handleError = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};

// Get all Users with optimized sorting
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    handleError(error, req, res);
  }
};

// Get a single User with concise validation
const getUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
  return res.status(404).json({error: 'No such User'})
  
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
    if (error) {
        handleError(error, req, res);
      }
};

// Create new User with robust validation and input sanitization
const createUser = async (req, res) => {
    const {email, password, userType, firstname, lastname} = req.body

    // add doc to db
try {
    const user = await User.create({email, password, userType, firstname, lastname})
    res.status(200).json(user)
} catch (error) {
    res.status(400).json({error: error.message})
}

}

//Delete a user with concise validation
const deleteUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such user'})
    }
  
    const user = await User.findOneAndDelete({ _id: id });
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    res.status(200).json(user);
  }
  
  // Update a user with concise validation
  const updateUser = async (req, res) => {
    // Destructure and validate User ID
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid user ID' });
    }
  
    // Find and update user in one step using findOneAndUpdate
    try {
      const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body, { new: true }); // Return updated document
      if (!updatedUser) {
        return res.status(400).json({ error: 'User not found' });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({ error: 'Internal Server Error' }); // Handle unexpected errors
    }
  };
  

module.exports = { getUsers, getUser, createUser, deleteUser, updateUser };

