import mongoose from "mongoose";

/// a room can have the multiple User so we create the array right 

const StudyRoomSchema = new mongoose.Schema({
    name : {
        type : String, 
        required: [true, "room name is required"]
    },
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    members:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    pdfS : [  
        {
            pdfName : {type : String},
            uploadedBy : {type : mongoose.Schema.Types.ObjectId, ref: "User"},
            pdfText : {type : String},
        }
    ]
}, {timestamps : true})


const StudyRoomModel = mongoose.model("Room", StudyRoomSchema)

export default StudyRoomModel;