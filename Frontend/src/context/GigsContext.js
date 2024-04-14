import { createContext, useReducer } from "react";

export const GigsContext = createContext()

export const gigsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GIGS':
            return {
                gigs: action.payload || [] // Provide an empty array if payload is null
            }
        case 'CREATE_GIGS':
            return {
                gigs: [action.payload, ...state.gigs]
            }
        case "DELETE_GIGS":
            return {
                gigs: state.gigs.filter((g) => g._id !== action.payload._id),
            }
        default:
            return state
    }
}

export const GigsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(gigsReducer, {
        gigs: null
    })

    return (
        <GigsContext.Provider value={{...state, dispatch}}>
            { children }
        </GigsContext.Provider>
    )
}