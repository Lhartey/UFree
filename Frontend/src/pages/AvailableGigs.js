import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGroupedContext } from '../context/GroupedContext';
import AllGigDetails from '../components/AllGigdetails'

const AvailableGigs = () => {
  const { groupedGigs, dispatch } = useGroupedContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupedGigs = async () => {
      try {
        const response = await fetch('/api/grouped-gigs', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch grouped gigs');
        }
        const json = await response.json();
        dispatch({ type: 'SET_GROUPED_GIGS', payload: json });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchGroupedGigs();
    }
  }, [dispatch, user]);

  return (
    <div className='available-gigs'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        groupedGigs.map(({ _id, gigs }) => (
          <div key={_id}>
            <h2>{_id}</h2>
            <div className="gig-category">
              {gigs.map(gig => (
                <AllGigDetails key={gig._id} gig={gig} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AvailableGigs;
