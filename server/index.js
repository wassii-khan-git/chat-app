// imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// custom
import routes from "./routes/index.js";
import DatabaseConnection from "./db/connection.js";
import { PORT_NUMBER } from "./config/config.js";

// dotenv config
dotenv.config();
// app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
// Database Connection
DatabaseConnection();
// routes
app.use("/v1/api", routes);
// other routes
app.get("/", (req, res) => {
  res.status(200).send("<h1>Server is healthy</h1>");
});
// listen
app.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port ${PORT_NUMBER}`);
});
