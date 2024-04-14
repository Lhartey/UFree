import { useEffect } from 'react'
import { useGigsContext } from '../hooks/useGigsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import React from 'react'
import GigForm from '../components/GigForm'

const PostProject = () => {
    const {  dispatch } = useGigsContext()
    const {user} = useAuthContext()
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
        }

        if (user) {
            fetchGigs()
        }
    }, [dispatch, user])
    return (
        <div className='post-project'>
            <GigForm />
        </div>
    )
}

export default PostProject