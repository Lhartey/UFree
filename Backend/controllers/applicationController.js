

const handleApplication = async (req, res) => {
  const { name, email } = req.body;
  const file = req.file; // Assuming file is uploaded using a field named 'file'

  const errors = []; // Use an array to store validation errors

  if (!name) {
    errors.push('Name is required');
  }
  if (!email) {
    errors.push('Email is required');
  }
  if (!file) {
    errors.push('CV/Resume upload is required'); // Assuming the uploaded file is a CV/Resume
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', errors });
  }

  try {
    // Await the upload to ensure fileUrl is defined
    const fileUrl = await uploadService.uploadFileToFIleIO(file);
    const application = await applicationService.saveApplicationData(name, email, fileUrl);

    res.status(200).json({ message: 'CV/Resume uploaded and application saved successfully', application });
  } catch (error) {
    console.error('Error processing application:', error);

    // Handle potential upload error from uploadService
    if (error.message === 'Failed to upload file') {
      return res.status(500).json({ error: 'Failed to upload CV/Resume' }); // More specific error message
    }

    // Handle other errors
    res.status(500).json({ error: error.message || 'Failed to process application' });
  }
};

module.exports = { handleApplication };
