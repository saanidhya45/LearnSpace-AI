import axios from "axios";

export const registerUser = async ({ username, email, password }) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/auth/register",
            { username, email, password }, 
            { withCredentials: true } 
        );
        return response.data;
    } catch (error) {
        console.log(error.response?.data || error.message);
        return error.response?.data;
    }
};


export const LoginUser = async ({email, password}) => {
     try {
         const response = await axios.post(
            "http://localhost:8000/api/auth/login",
            {email, password},
            {withCredentials: true}
         )
         return response.data;
     } catch (error) {
        console.log(error.response?.data || error.message)
        return error.response?.data;
     }
}


export const getUserData = async () => {
    try {
        const response = await axios.get(
            "http://localhost:8000/api/auth/getMe",
            {withCredentials: true}
        )
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

