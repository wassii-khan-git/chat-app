import mongoose from "mongoose";
import { EmailRegex } from "../utils/patterns.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
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
    },
  },
  { timestamps: true }
);

// create a compound text index on username + email
UserSchema.index({ username: "text", email: "text" });

export const UserModel =
  mongoose.models.users || mongoose.model("users", UserSchema);
