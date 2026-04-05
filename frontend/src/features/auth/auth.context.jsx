import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";



export const authContext = createContext();


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    return (
        <authContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </authContext.Provider>
    )
}