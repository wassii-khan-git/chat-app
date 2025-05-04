import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import bcrypt from "bcryptjs";

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
  return bcrypt.hash(password, salt);
};

// verify hash
export const VerifyHash = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
