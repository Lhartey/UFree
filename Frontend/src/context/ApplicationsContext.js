import { createContext, useReducer } from "react";

export const ApplicationsContext = createContext();

export const applicationsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_APPLICATIONS':
            return {
                applications: action.payload || [] // Provide an empty array if payload is null
            }
        case 'CREATE_APPLICATIONS':
            return {
                applications: [action.payload, ...state.applications]
            }
        case "DELETE_APPLICATIONS":
            return {
                applications: state.applications.filter((a) => a._id !== action.payload._id),
            }
        default:
            return state
    }
}

export const ApplicationsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(applicationsReducer, {
        applications: null
    })

    return (
        <ApplicationsContext.Provider value={{...state, dispatch}}>
            { children }
        </ApplicationsContext.Provider>
    )
}
