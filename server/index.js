import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import router from "./routes/index.js";
import { PORT_NUMBER } from "./config/config.js";
import DatabaseConnection from "./db/connection.js";
import SocketInit from "./socket/socket.connection.js";
import SocketAuthHanlder from "./middlewares/socket/socket.middleware.js";
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

// database connection
DatabaseConnection();

app.use(cors());
app.use(express.json());
// If you need auth on your WebSocket, do it here:
io.use(SocketAuthHanlder);

// Socket handlers
SocketInit(io);

// HTTP routes still work
app.get("/", (req, res) => {
  res.send("<h1>Server is healthy</h1>");
});

// Use your existing routes:
app.use("/v1/api", router);

server.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port ${PORT_NUMBER}`);
});
