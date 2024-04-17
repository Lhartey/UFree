import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests

const ApplicationForm = () => {
  // State variables for form data, submission status, and error messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState('initial');
  const [errorMessages, setErrorMessages] = useState([]);

  // Handle name input change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handle email input change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle cover letter input change
  const handleCoverLetterChange = (event) => {
    setCoverLetter(event.target.files[0]); // Assuming single file selection
    setErrorMessages([]); // Clear any previous validation errors on file selection
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    const validationErrors = [];
    if (!name.trim()) {
      validationErrors.push('Please enter your name.');
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.push('Please enter a valid email address.');
    }
    if (!coverLetter) {
      validationErrors.push('Please select a cover letter file.');
    }

    if (validationErrors.length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    try {
      // Upload cover letter file using FormData
      const formData = new FormData();
      formData.append('file', coverLetter);
      formData.append('autoDelete', true); // Set autoDelete to true (optional)
      const fileUploadResponse = await fetch('https://file.io/', {
        method: 'POST',
        body: formData
      });
      const fileUploadData = await fileUploadResponse.json();

      if (!fileUploadData.success) {
        throw new Error('Error uploading file.');
      }

      // Send application data (including fileKey) to backend using Axios
      const applicationData = {
        name,
        email,
        coverLetter: fileUploadData.key // Use the uploaded file key
      };
      setSubmissionStatus('pending'); // Update submission status

      const response = await axios.post('http://localhost:3000/api/applications', applicationData);
      console.log('Application submitted successfully!', response.data);
      setSubmissionStatus('success');
      setErrorMessages([]); // Clear error messages on success
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmissionStatus('error');
      setErrorMessages(['Error submitting application. Please try again.']);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name Input */}
      <label htmlFor="nameInput">Name:</label>
      <input
        type="text"
        id="nameInput"
        value={name}
        onChange={handleNameChange}
        className={errorMessages.includes('Please enter your name.') ? 'error-input' : ''}
      />
      {errorMessages.includes('Please enter your name.') && (
        <p className="error-message">Please enter your name.</p>
      )}

      {/* Email Input */}
      <label htmlFor="emailInput">Email:</label>
      <input
        type="email"
        id="emailInput"
        value={email}
        onChange={handleEmailChange}
        className={errorMessages.includes('Please enter a valid email address.') ? 'error-input' : ''}
      />
      {errorMessages.includes('Please enter a valid email address.') && (
        <p className="error-message">Please enter a valid email address.</p>
      )}

      {/* Cover Letter Input */}
      <label htmlFor="coverLetterInput">Cover Letter:</label>
      <input
        type="file"
        id="coverLetterInput"
        onChange={handleCoverLetterChange}
        className={errorMessages.includes('Please select a cover letter file.') ? 'error-input' : ''}
      />
      {errorMessages.includes('Please select a cover letter file.') && (
        <p className="error-message">Please select a cover letter file.</p>
      )}

      {/* Submit Button */}
      <button type="submit" disabled={submissionStatus === 'pending'}>
        {submissionStatus === 'initial' ? 'Submit Application' : (
          submissionStatus === 'pending' ? 'Submitting...' : 'Success!'
        )}
      </button>

      {/* Display any error messages from submission or validation */}
      {errorMessages.length > 0 && (
        <ul className="error-messages">
          {errorMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default ApplicationForm;
