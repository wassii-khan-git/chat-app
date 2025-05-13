import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const ChatModel = mongoose.model("chats", ChatSchema);
