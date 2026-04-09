import React, { useContext } from 'react'
import { useRoom } from '../hook/UseRoom'
import { getMyRoom } from '../services/rooms.api';
import {useEffect} from 'react'
import { roomContext } from '../rooms.context';
const Rooms = () => {
   const context = useContext(roomContext);
   const {setRoom, room} = context;
      useEffect(()=>{
        const init = async () => {
  
            try {
             const data = await getMyRoom();
            if(data?.success){
                setRoom(data.room);
            }   
            } catch (error) {
                console.log(error);
            }
        }
        init();
    },[])
  console.log(room);
  return (
    <div>{room?.name}</div>
  )
}

export default Rooms