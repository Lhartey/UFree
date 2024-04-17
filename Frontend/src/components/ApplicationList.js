import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ApplicationList({ onSendMessage }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/api/applications/get');
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="ApplicationList">
      <h2>All Applications</h2>
      {loading ? (
        <p>Loading applications...</p>
      ) : (
        applications.map(applicant => (
          <div key={applicant._id}>
            <p>{applicant.name}</p>
            <p>{applicant.email}</p>
            <a href={`https://file.io/${applicant.coverLetter}`} target="_blank" rel="noopener noreferrer">Cover Letter</a>
            <button onClick={() => onSendMessage(applicant)}>Send Message</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ApplicationList;
