import express from "express";
import {
  CreateRoom,
  GetRooms,
} from "../../controllers/chat/chat-controller.js";

const router = express.Router();

// create chat room
router.post("/create-room", CreateRoom);
// get chat rooms
router.get("/all-rooms", GetRooms);

export default router;
