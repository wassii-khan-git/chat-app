import mongoose from "mongoose";
import { EmailRegex } from "../utils/patterns.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => EmailRegex.test(v),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.users || mongoose.model("users", UserSchema);
