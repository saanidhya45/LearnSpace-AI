import express from "express";
import { jwtAuthenticator } from "../config/jwtAuth.js";
import {
  userRoomCreateController,
  userRoomDeleteController,
  userRoomJoiningController,
  userRoomsController,
} from "../controller/room.controller.js";

const RoomRouter = express.Router();

/// only the logged in user can create the room
/**
 * @route POST /api/room/
 * @description Create a new study room (only for authenticated users)
 * @access Private
 */

RoomRouter.route("/").post(jwtAuthenticator, userRoomCreateController);

// a user want to join a specific room with the roomId

/**
 * @route POST /api/room/ :roomId,
 * @description a user can join any room with roomId (only for authenticated users)
 * @access Private
 */

RoomRouter.route("/:roomId").post(jwtAuthenticator, userRoomJoiningController);

/**
 * @route ge /api/room/
 * @description a user can get all the rooms he/she created (only for authenticated users)
 * @access Private
 */

RoomRouter.route("/").get(jwtAuthenticator, userRoomsController);

/**
 * @route delete /api/room/:roomId
 * @description a user can delete one of the room created by him with the specific room id (one for authenticated users)
 * @access Private
 */

RoomRouter.route("/:roomId").delete(jwtAuthenticator, userRoomDeleteController);

export default RoomRouter;
