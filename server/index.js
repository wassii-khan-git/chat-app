import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import router from "./routes/index.js";
import { PORT_NUMBER } from "./config/config.js";
import DatabaseConnection from "./db/connection.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
// Allow your React app at port 5173 to connect
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.json());
// If you need auth on your WebSocket, do it here:

DatabaseConnection();

let users = {};

// Socket handlers
io.on("connection", (socket) => {
  console.log("⚡ A user connected:", socket.id);

  // listen for the event
  socket.on("join_room", ({ roomId }) => {
    console.log("room id received in the server: ", roomId);
    // join the room
    socket.join(roomId);
    users[roomId];
  });

  // handle private chat
  // Replace the existing private_message handler with:
  socket.on("private_message", ({ roomId, sender, content, date }) => {
    console.log("Message received in room:", roomId, "Content:", content);

    // Broadcast the message to ALL clients in the room (including sender)
    io.to(roomId).emit("private_message", {
      sender,
      content, // Fixed: was using users.content incorrectly
      date,
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// HTTP routes still work
app.get("/", (req, res) => {
  res.send("<h1>Server is healthy</h1>");
});

// Use your existing routes:
app.use("/v1/api", router);

server.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port ${PORT_NUMBER}`);
});
