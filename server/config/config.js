import dotenv from "dotenv";
dotenv.config();

// Database URL
export const DATABASE_URL = process.env.DATABASE_URL;

// PORT NUMBER
export const PORT_NUMBER = process.env.PORT_NUMBER || 5000;

// JWT SECRET
export const JWT_SECRET = process.env.JWT_SECRET;

// client request URL
export const ClientURL = "http://localhost:5173";
