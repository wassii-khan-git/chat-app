import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/user-model.js";
import { ChatModel } from "../models/chat-model.js";

// generate token
export const GenerateToken = async (id) => {
  return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: "1w" });
};

// verify token
export const VerifyToken = async (token) => {
  return jwt.verify(token, JWT_SECRET);
};

// hash password
export const GenerateHash = async (password) => {
  return bcrypt.hash(password, 10);
};

// verify hash
export const VerifyHash = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// update user
export const UpdateUserStatus = async (userId, status) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { online: status },
      { new: true }
    );
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    // 5. Proper error propagation
    throw new Error(`Update failed: ${error.message}`);
  }
};

// add chat
export const AddChat = async (roomId, message, sender, receiver) => {
  try {
    // check for the null
    if (!roomId || !message || !sender || !receiver) {
      throw new Error("Message, sender or receiver is required");
    }

    // store the chat info in the db
    const newChat = await ChatModel.create({
      roomId,
      message,
      sender,
      receiver,
    });

    // save it in the db
    await newChat.save();

    return newChat;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get all the messages by room id
export const GetMessagesByRoomId = async (roomId) => {
  try {
    // check for the null
    if (!roomId) {
      throw new Error("Message, sender or receiver is required");
    }

    // store the chat info in the db
    const chats = await ChatModel.find({ roomId });

    if (!chats) {
      throw new Error(`No Chats found against this roomId ${roomId}`);
    }

    return chats;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update seen status for multiple chats and their messages
export const UpdateMessageStatus = async (chatIds, roomId, status) => {
  try {
    // Update multiple chats using updateMany
    const result = await ChatModel.updateMany(
      { _id: { $in: chatIds } },
      {
        $set: {
          seen: status,
        },
      },
      {
        arrayFilters: [{ "elem.seen": { $ne: status } }], // Only update messages that don't have current status
        multi: true,
      }
    );

    if (result.matchedCount === 0) {
      throw new Error("No chats found with the specified IDs");
    }

    if (!roomId) {
      throw new Error("RoomId is required");
    }

    const chats = await ChatModel.find({ roomId });
    // if no chats found
    if (!chats) {
      throw new Error("No chats found with this roomId");
    }
    return {
      success: true,
      updatedCount: result.modifiedCount,
      chats,
    };
  } catch (error) {
    throw new Error(`Update failed: ${error.message}`);
  }
};
