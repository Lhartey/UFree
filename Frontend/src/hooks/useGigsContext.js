import { GigsContext } from "../context/GigsContext";
import { useContext } from "react";

export const useGigsContext = () => {
    const context = useContext(GigsContext)

    if (!context) {
        throw Error('useGigsContext must be used inside an GigsContextProvider')
    }

    return context
}