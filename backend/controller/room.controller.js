import StudyRoomModel from "../models/room.model.js";

const userRoomCreateController = async (req, res) => {
            console.log('room got hit');
    try {

        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                msg : "room name is required"
            })
        }
        // check if the room already exist created by the id with this name 
        const roomAlreadyExistWithNameId = await StudyRoomModel.findOne({createdBy : req.user.id, name : name})
        if(roomAlreadyExistWithNameId){
            return res.status(400).json({
                msg : "room already exist with this name create a new one "
            })
        }
        const room = await StudyRoomModel.create({
                name,
                createdBy : req.user.id,
                members : [req.user.id],   
        })

        return res.status(201).json({
            success : true,
            msg : "room created successFully",
            room
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            msg : "internal server error"
        })
    }
}

const userRoomJoiningController = async (req, res) => {
    try {

        const roomId = req.params.roomId;
        const id = req.user.id

        // validate if the room exist with this roomId or not 
         const room = await StudyRoomModel.findById(roomId)
         if(!room){
            return res.status(404).json({
                success : false,
                msg : "error"
            })
         }
            const isMember = room.members.some(
                member => member.toString() === id
            );

            if (isMember) {
                return res.status(200).json({
                    success : true,
                    msg: "user already exist in room",
                    UpdatedRoom : room
                });

            }
              room.members.push(id);
              await room.save();

              return res.status(200).json({
                 success: true,
                 msg : "user joined room successFully",
                 UpdatedRoom : room
              })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            msg : "internal server error"
        })
    }
}

const userRoomsController = async (req, res) => {
    try {

        const allRooms = await StudyRoomModel.find({createdBy : req.user.id});

        if(allRooms.length === 0){
            return res.status(400).json({
                userRooms : []
            })
        }

        return res.status(200).json({
            userRooms : allRooms
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg : "internal server error"
        })
    }
}

const userRoomDeleteController = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        // check if the room exist with this room id or not and check the ownership  
        const room = await StudyRoomModel.findOneAndDelete({
            _id : roomId,
            createdBy : req.user.id
        })

        if(!room){
            return res.status(400).json({
                msg : "room not found or you are not authorized"
            })
        };

        return res.status(200).json({
            msg : "room deleted successFully",
            room,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg : "internal server error"
        })
    }
}

const userJoinedRoomController = async (req, res) => {
    try {
        console.log("api hit")
        const {username, id} = req.user;
        // check if this user has been a part of any of the room or not
        const room = await StudyRoomModel.findOne({
        members: id
        }).sort({ updatedAt: -1 });

        if(!room){
            return res.status(404).json({
                success : false,
                msg : "user is not present in any of the room"
            })
        }

        return res.status(200).json({
            success : true,
            msg : "room found successFully",
            room,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg : "internal server error"})
    }
}

export  {userRoomCreateController, userRoomJoiningController, userRoomsController,userRoomDeleteController,userJoinedRoomController}