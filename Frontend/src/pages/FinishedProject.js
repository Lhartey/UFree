// src/pages/FinishedProject.js

import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'; // Import the authentication context

function FinishedProject() {
  const { currentUser } = useAuthContext(); // Get the current authenticated user
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submitting feedback and rating, e.g., sending them to the backend
    console.log('User ID:', currentUser.id); // Log the authenticated user's ID
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    // Clear the feedback input after submission
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="FinishedProject">
      <h2>Feedback and Rating</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rate the service:</label>
          <select id="rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
            <option value={0}>Select</option>
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
        </div>
        <div>
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here..."
            required
          ></textarea>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default FinishedProject;
