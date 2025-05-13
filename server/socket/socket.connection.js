import {
  AddChat,
  GetMessagesByRoomId,
  UpdateMessageStatus,
  UpdateUserStatus,
} from "../utils/helper.js";

const SocketInit = (io) => {
  // connection
  io.on("connection", async (socket) => {
    console.log("User connected:", socket.id);
    let status = null;
    // get the user
    const user = socket.user;
    // set the user online
    if (user?._id) {
      status = true;
      await UpdateUserStatus(user?._id, status);
    }
    // join room event
    socket.on("join_room", async ({ roomId }) => {
      socket.join(roomId);
      // get all the messages
      console.log(`${socket.id} joined roomId ${roomId}`);
      const messages = await GetMessagesByRoomId(roomId);
      io.to(roomId).emit("join_room", messages);
    });

    // leave room event
    socket.on("leave_room", ({ roomId }) => {
      console.log(`${socket.id} left the room`, roomId);
      socket.leave(roomId);
    });

    // chat event
    socket.on("chat", async ({ roomId, message, sender, receiver, date }) => {
      console.log(`roomId ${roomId} msg: ${message}`);
      // store the message in a db
      const msgResult = await AddChat(roomId, message, sender, receiver);
      io.to(roomId).emit("chat", msgResult);
    });

    // message seen
    socket.on("message_status", async ({ chatIds, roomId }) => {
      console.log(chatIds);
      console.log(roomId);
      const result = await UpdateMessageStatus(chatIds, roomId, true);
      console.log(result);
      io.to(roomId).emit("message_status", result.chats);
    });

    // disconnect event
    socket.on("disconnect", async () => {
      // set the user online
      if (user) {
        status = false;
        await UpdateUserStatus(user._id, status);
      }
      console.log("User disconnected:", socket.id);
    });
  });
};

export default SocketInit;
