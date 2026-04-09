import axios from "axios";


export const roomCreation = async ({name}) => {

   try {
        const response = await axios.post("http://localhost:8000/api/room/",
            {name},
            {withCredentials: true}
        )
        
        return response.data;
   } catch (error) {
   
      console.log(error?.response || error.message);
      return error?.response;
   }
}

export const roomJoin = async ({ roomId }) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/room/${roomId}`,
            {},
            { withCredentials: true }
        );

        console.log("response", response);
        return response.data;

    } catch (error) {
        console.log("error");
        console.log(error?.response || error.message);
        return error?.response;
    }
};


export const getUserRooms = async () => {
    try {
        const response = await axios.get("http://localhost8000/api/room/", {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error?.response || error.message);
        return error?.response;
    }
}


export const getMyRoom = async () => {
    console.log("isthisfuniasdf")
    try {
        const response = await axios.get(
            "http://localhost:8000/api/room/my-room",
            { withCredentials: true }
        );
        console.log(response);
        return response.data;

    } catch (error) {
        console.log(error?.response || error.message);

        return {
            success: false,
            msg: error?.response?.data?.msg || "Something went wrong"
        };
    }
};