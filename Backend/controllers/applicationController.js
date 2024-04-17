const Application = require('../models/application'); // Import the application model

const submitApplication = async (req, res) => {
  const { name, email, coverLetter } = req.body;

  try {
    const newApplication = new Application({
      name,
      email,
      coverLetter
    });

    await newApplication.save();

    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ message: 'Error submitting application!' });
  }
};

module.exports = {
  submitApplication
};
