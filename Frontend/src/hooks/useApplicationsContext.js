import { ApplicationsContext } from "../context/ApplicationsContext";
import { useContext } from "react";

export const useApplicationsContext = () => {
    const context = useContext(ApplicationsContext)

    if (!context) {
        throw Error('useApplicationsContext must be used inside an ApplicationsContextProvider')
    }

    return context
}