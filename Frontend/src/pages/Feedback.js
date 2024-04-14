import { Link } from 'react-router-dom';
import React from 'react';

function Feedbacks() {
  // Dummy feedback data
  const dummyFeedbacks = [
    { id: 1, userId: 1, userName: 'John Doe', rating: 5, feedback: 'Excellent service!' },
    { id: 2, userId: 2, userName: 'Jane Smith', rating: 4, feedback: 'Very good work done.' },
    { id: 3, userId: 3, userName: 'Alice Johnson', rating: 3, feedback: 'Good experience overall.' }
    // Add more dummy feedbacks as needed
  ];

  return (
    <div className="Feedbacks">
      <h1>All Feedbacks</h1>
      <Link to="/FinishedProject">Provide Feedback</Link>
      <br />
      <ul>
        {dummyFeedbacks.map(feedback => (
          <li key={feedback.id}>
            <strong>User: </strong>{feedback.userName}<br />
            <strong>Rating: </strong>{feedback.rating}<br />
            <strong>Feedback: </strong>{feedback.feedback}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feedbacks;
