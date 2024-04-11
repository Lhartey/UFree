import { useAuthContext } from "./useAuthContext"
import { useGigsContext} from './useGigsContext'

    export const useLogout = () => {
        const { dispatch } = useAuthContext()
        const { dispatch: gigsDispatch } = useGigsContext()

        const logout = () => {
            //remove user from storage
            localStorage.removeItem('user')

            // dispatch logout action
            dispatch({type: 'LOGOUT'})
            gigsDispatch({type: 'SET_GIGS', payload: null})
        }

        return {logout}
    }