import mongoose from "mongoose";
import { DATABASE_URL } from "../config/config.js";

const DatabaseConnection = async () => {
  try {
    const connection = await mongoose.connect(DATABASE_URL);
    if (connection) {
      console.log("Database connected successfully");
    }
  } catch (error) {
    console.log("Failed to connect Db");
  }
};
export default DatabaseConnection;
