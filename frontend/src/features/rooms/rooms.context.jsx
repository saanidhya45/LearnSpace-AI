import { createContext, useState } from "react";

export const roomContext = createContext();


export const RoomContextProvider = ({children}) => {
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(false)
    return (
        <roomContext.Provider value={{room, setRoom, loading, setLoading}}>
            {children}
        </roomContext.Provider>
    )
}