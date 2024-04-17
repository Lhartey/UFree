import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicationList from '../components/ApplicationList';

function GigApplications() {
  const [showAllApplications, setShowAllApplications] = useState(false);
  const [filteredApplications, setFilteredApplications] = useState([]);

  const toggleApplications = () => {
    setShowAllApplications(prevState => !prevState);
  };

  const filterApplicationsByTime = (time) => {
    // Get the current date
    const today = new Date();
    // Filter applications based on the selected time
    let filteredApps = [];
    if (time === 'today') {
      filteredApps = filteredApplications.filter(app => {
        const appDate = new Date(app.createdAt);
        return appDate.toDateString() === today.toDateString();
      });
    } else if (time === 'this week') {
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      filteredApps = filteredApplications.filter(app => {
        const appDate = new Date(app.createdAt);
        return appDate >= oneWeekAgo;
      });
    } else if (time === 'this month') {
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      filteredApps = filteredApplications.filter(app => {
        const appDate = new Date(app.createdAt);
        return appDate >= firstDayOfMonth;
      });
    }
    // Update the state with filtered applications
    setFilteredApplications(filteredApps);
  };

  useEffect(() => {
    // Fetch applications data
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/applications/get');
        setFilteredApplications(response.data); // Assuming response contains application data
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="GigApplications">
      <h1>Gig Management</h1>
      {/* Buttons to filter applications */}
      <button onClick={toggleApplications}>
        {showAllApplications ? 'Hide Applications' : 'Show All Applications'}
      </button>
        <button onClick={() => filterApplicationsByTime('today')}>Today</button>
        <button onClick={() => filterApplicationsByTime('this week')}>This Week</button>
        <button onClick={() => filterApplicationsByTime('this month')}>This Month</button>
      {/* Render ApplicationList only if showAllApplications is true */}
      {showAllApplications && (
        <ApplicationList applications={filteredApplications} />
      )}
      {/* Button to toggle showing/hiding applications */}
     
    </div>
  );
}

export default GigApplications;
