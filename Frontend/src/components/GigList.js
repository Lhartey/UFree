import React from 'react';
import { Link } from 'react-router-dom'; // Optional for routing

const GigList = ({ gigs, onGigSelect }) => {
  return (
    <ul>
      {gigs.map(gig => (
        <li key={gig.id}>
          <Link to={`/gigs/${gig.id}`} onClick={() => onGigSelect(gig.id)}>
            {gig.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GigList;
