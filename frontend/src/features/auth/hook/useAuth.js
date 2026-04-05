import { useContext } from "react";
import { authContext } from "../auth.context";
import { registerUser, LoginUser, getUserData } from "../services/auth.api";
import { useEffect } from "react";


export const useAuth = () => {
    const context = useContext(authContext);

    const {user, setUser, loading, setLoading} = context;

    const handleUserRegister = async ({username, email, password}) => {
        setLoading(true);
        try {
            const data = await registerUser({username, email, password});
            if(data?.success){
                setUser(data.user)
            }
            return data;

        } catch (error) {
            console.log(error);
            return {success : false, msg : "something went wrong"}
        }
        finally{
            setLoading(false);
        }
    }
    
    const handleUserLogin = async ({email, password}) => {
        setLoading(true);
        try {
            const data = await LoginUser({email, password});
            if(data?.success){
                setUser(data.user);
            }
            return data;
        } catch (error) {
            console.log(error);
            return {success : false, msg : "something went wrong"}
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        const handleUserGetMe = async() => {
            try {
                const data = await getUserData();
                if(data?.success){
                    setUser(data.user);
                }
            } catch (error) {
                
            }finally{
                setLoading(false);
            }
        }

        handleUserGetMe();
    },[])

    return {handleUserRegister, loading, handleUserLogin, user}
}