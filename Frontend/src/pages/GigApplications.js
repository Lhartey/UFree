// src/pages/GigApplications.js

import React, { useState } from 'react';
import GigList from '../components/GigList';
import ApplicationList from '../components/ApplicationList';
import { WeavyComponent } from '../components/WeavyComponent';
import markAsRead from '../components/markAsRead';
import gigsData from '../data/gigsData'; // Import the gig data file


function GigApplications() {
  const [userGigs] = useState(gigsData);
  const [selectedGig, setSelectedGig] = useState(null);
  const [recipient, setRecipient] = useState(null);

  const handleGigSelect = (gigId) => {
    setSelectedGig(userGigs.find(gig => gig.id === gigId));
  };

  const handleSendMessage = (applicant) => {
    setRecipient(applicant.applicantName);
    markAsRead(applicant.applicantName, applicant.messageId);
  };

  return (
    <div className="GigApplications">
      <h1>Gig Management</h1>
      <GigList gigs={userGigs} onGigSelect={handleGigSelect} />
      {selectedGig && (
        <>
          <ApplicationList gig={selectedGig} onSendMessage={handleSendMessage} />
          {recipient && <WeavyComponent recipient={recipient} />}
        </>
      )}
    </div>
  );
}

export default GigApplications;
