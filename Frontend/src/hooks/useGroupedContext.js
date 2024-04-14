import { GroupedContext } from "../context/GroupedContext";
import { useContext } from "react";

export const useGroupedContextt = () => {
    const context = useContext(GroupedContext)

    if (!context) {
        throw Error('useGroupedContext must be used inside an GroupedContextProvider')
    }

    return context
}