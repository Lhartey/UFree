import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (name, email, password, userType) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch ('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password, userType})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // Update the auth context
            dispatch({type: 'LOGIN', payload: json})

            // Update loading state
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}