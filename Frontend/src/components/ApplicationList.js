import React from 'react';

function ApplicationList({ gig, onSendMessage }) {
  return (
    <div className="ApplicationList">
      <h2>Applications for {gig.title}</h2>
      {gig.applications.map(applicant => (
        <div key={applicant.id}>
          <p>{applicant.applicantName}</p>
          <p>{applicant.email}</p>
          <a href={applicant.coverLetterLink} target="_blank" rel="noopener noreferrer">Cover Letter</a>
          <button onClick={() => onSendMessage(applicant)}>Send Message</button> {/* Pass applicant to onSendMessage */}
        </div>
      ))}
    </div>
  );
}

export default ApplicationList;
