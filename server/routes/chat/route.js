import express from "express";
import {
  CreateRoom,
  GetMessagesByRoomId,
  GetRoomById,
} from "../../controllers/chat/chat-controller.js";
import { VerifyUserToken } from "../../middlewares/auth/auth.middleware.js";

const router = express.Router();

// create chat room
router.post("/create-room", VerifyUserToken, CreateRoom);
// get chat rooms
router.get("/room/:id", VerifyUserToken, GetRoomById);
// get chat by room id
router.get("/messages/:id", VerifyUserToken, GetMessagesByRoomId);

export default router;
