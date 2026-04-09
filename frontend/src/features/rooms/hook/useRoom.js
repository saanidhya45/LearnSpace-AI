import { useContext, useEffect } from "react";
import { roomContext } from "../rooms.context";
import { roomCreation, roomJoin, getUserRooms, getMyRoom } from "../services/rooms.api";



export const useRoom = ()=> {
    const context = useContext(roomContext);
    const {room, setRoom, loading, setLoading} = context;

    const handleRoomCreation = async ({name}) => {
        setLoading(true);
        try {
            const data = await roomCreation({name});
            if(data?.success){
                console.log("this is the data", data);
                setRoom(data.room);
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
    
    const handleRoomJoining = async ({roomId}) => {
        setLoading(true);
        console.log("is id coming", roomId)
        try {
            
            const data = await roomJoin({roomId});
            console.log(data);
            if(data?.success){
                setRoom(data.UpdatedRoom);
                console.log("updated room", room)
            }
            return data;
        } catch (error) {
            console.log(error);
            return {success : false, msg : 'something went wrong'}
        }
        finally{
            setLoading(false);
        }
    }


    return {handleRoomCreation, loading, room, handleRoomJoining, getMyRoom}
}