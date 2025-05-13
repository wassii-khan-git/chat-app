import { ChatModel } from "../../models/chat-model.js";
import { RoomModel } from "../../models/room-model.js";
import { UserModel } from "../../models/user-model.js";
// create chat rooms
export const CreateRoom = async (req, res) => {
  try {
    // extract the info
    const { name, members, ownerId } = req.body;
    // check for the null
    if (!name || !members.length === 0 || !ownerId) {
      return res.status(409).json({
        success: false,
        message: "Name, members or ownerid is required",
      });
    }
    // store the room info in the db
    const isRoomExists = await RoomModel.findOne({
      members,
      ownerId,
    });

    if (isRoomExists) {
      return res.status(403).json({
        success: false,
        message: "Name, members and ownerId already exists",
      });
    }

    // store the room info in the db
    const newRoom = await RoomModel.create({
      name,
      members,
      ownerId,
    });

    // save it in the db
    await newRoom.save();

    // find the members id and popluate the users in the members too
    const room = await RoomModel.find({ members }).populate({
      path: "members",
      select: "username email online _id",
    });

    return res
      .status(201)
      .json({ success: true, message: "Room created", data: room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// get chat rooms
export const GetRoomById = async (req, res) => {
  try {
    // get the id
    const { id } = req.params;
    // get the user id
    const userId = req.userId;

    // check the id
    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "roomId is required" });
    }

    // find the members id and popluate the users in the members too
    const rooms = await RoomModel.find({
      $or: [{ members: id }, { ownerId: id }],
    }).populate({
      path: "members",
      select: "username email online _id",
    });

    // no room found
    if (!rooms) {
      return res
        .status(404)
        .json({ success: false, message: "Room doenot exists" });
    }

    // check for the ambiguity
    const result =
      rooms.map((item) => item.members)[0][0]._id.toString() ===
      userId.toString();

    if (result) {
      const ownerId = rooms?.[0].ownerId;
      const ownerInfo = await UserModel.findOne({ _id: ownerId }).select(
        "-password -token -createdAt -updatedAt -__v"
      );
      rooms[0].members = ownerInfo;
    }

    // return the response
    return res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Hello, world" });
  }
};

// get all the messages by room id
export const GetMessagesByRoomId = async (req, res) => {
  try {
    const { id } = req.params;
    // check for the null
    if (!id) {
      return res.status(403).json({
        success: false,
        message: "Message, sender or receiver is required",
      });
    }

    // store the chat info in the db
    const chats = await ChatModel.find({ roomId: id });

    if (!chats) {
      return res.status(402).json({
        success: false,
        message: "No chats records found",
      });
    }

    return res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
