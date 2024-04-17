import { useState, useEffect } from 'react'
import { useGigsContext } from '../hooks/useGigsContext'
import { useAuthContext } from '../hooks/useAuthContext'

//Components
import AllGigdetails from '../components/AllGigdetails'

const LatestGig = () => {
    const { gigs, dispatch } = useGigsContext()
    const {user} = useAuthContext()
    const [, setLoading] = useState(true);
    useEffect(() => {
        const fetchGigs = async () => {
            const response = await fetch('/api/gigs', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_GIGS', payload: json})
            }
            setLoading(false);
        }

        if (user) {
            fetchGigs()
        }
    }, [dispatch, user])

    return (
        <div className="LatestGig">
          <h2>Latest Gigs</h2>
                <>
                    <div className='gigs'>
                        {gigs && gigs.map((gig) => (
                            <AllGigdetails key={gig._id} gig={gig} />
                        ))}
                    </div>
                </>
        </div>
    );
};

export default  LatestGig 
