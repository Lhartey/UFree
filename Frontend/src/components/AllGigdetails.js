import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import '../styles/AllGigDetails.css';

const AllGigDetails = ({ gig }) => {
  if (!gig) {
    return null;
  }

  return (
    <div className="all-gig-details">
      <h4 className="gig-title">{gig.title}</h4>
      <div className="gig-info">
        <div className="detail">
          <span className="detail-label">Description:</span>
          <span className="detail-value">{gig.description}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Requirements:</span>
          <span className="detail-value">{gig.requirements}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Budget:</span>
          <span className="detail-value">{gig.budget}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Deadline:</span>
          <span className="detail-value">{gig.deadline}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Posted by:</span>
          <span className="detail-value">{gig.user ? gig.user.name : 'Unknown'}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Posted at:</span>
          <span className="detail-value">{formatDistanceToNow(new Date(gig.createdAt), { addSuffix: true })}</span>
        </div>
      </div>
      <Link to={`/application-form/${gig._id}`} className="apply-button">
        Apply Now
      </Link>

    </div>
  );
};

export default AllGigDetails;
