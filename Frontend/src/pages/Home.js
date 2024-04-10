import { useEffect } from 'react'
import { useGigsContext } from '../hooks/useGigsContext'

//Components
import GigDetails from '../components/GigDetails'
import GigForm from '../components/GigForm'

const Home = () => {
    const { gigs, dispatch } = useGigsContext()
    useEffect(() => {
        const fetchGigs = async () => {
            const response = await fetch('/api/gigs')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_GIGS', payload: json})
            }
        }

        fetchGigs()
    }, [dispatch])

    return (
        <div className="Home">
            <div className='gigs'>
                {gigs && gigs.map((gig) => (
                    <GigDetails key={gig._id} gig={gig} /> 
                ))}
            </div>
            <GigForm />
        </div>
    )
}

export default Home