import { useGigsContext } from "../hooks/useGigsContext"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const GigDetails = ({ gig }) => {
    const { dispatch } = useGigsContext()

    const handleClick = async () => {
        const response = await fetch('/api/gigs/' + gig._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_GIGS', payload: json})
        }
    }

    return (
        <div className="gig-details">
            <h4>{gig.title}</h4>
            <p><strong>Description:</strong>{gig.description}</p>
            <p><strong>Requirement:</strong>{gig.requirements}</p>
            <p><strong>Budget:</strong>{gig.budget}</p>
            <p><strong>Deadline:</strong>{gig.deadline}</p>
            <p>{formatDistanceToNow(new Date(gig.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default GigDetails