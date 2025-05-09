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
  connectionStateRecovery: {},
});

app.use(cors());
app.use(express.json());
// If you need auth on your WebSocket, do it here:

DatabaseConnection();

// Socket handlers
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", ({ roomId }) => {
    socket.join(roomId);
    console.log(`${socket.id} joined roomId ${roomId}`);
  });

  socket.on("leave_room", ({ roomId }) => {
    console.log(`${socket.id} left the room`, roomId);
    socket.leave(roomId);
  });

  socket.on("chat", ({ roomId, message, sender, date }) => {
    console.log(`roomId ${roomId} msg: ${message}`);
    io.to(roomId).emit("chat", { message, sender, date });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
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
