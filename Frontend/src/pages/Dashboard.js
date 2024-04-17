import { useState, useEffect } from 'react'
import { useGigsContext } from '../hooks/useGigsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Dashboard.css';

//Components
import GigDetails from '../components/GigDetails'

const Dashboard = () => {
    const { gigs, dispatch } = useGigsContext()
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchGigs = async () => {
            const response = await fetch('/api/allgigs', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_GIGS', payload: json })
            }
            setLoading(false);
        }

        if (user) {
            fetchGigs()
        }
    }, [dispatch, user])

    return (
        <div className="Dashboard">
            <h3>Dashboard</h3>
            <div className="top-links">
                <Link to="/post-project" className="link">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    Post a Project
                </Link>
                <Link to="/GigApplications" className="link">
                    <FontAwesomeIcon icon={faFileAlt} className="icon" />
                    Applications
                </Link>
            </div>
            {loading ? ( // Display loading message while fetching data
                <p>Loading...</p>
            ) : gigs && gigs.length === 0 ? (
                <p>No gigs posted yet. <Link to="/post-project">Post a Project</Link></p>
            ) : (
                <>
                    <div className='gigs'>
                        {gigs && gigs.map((gig) => (
                            <GigDetails key={gig._id} gig={gig} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
