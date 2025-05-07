import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
      required: true,
      ref: "users",
    },
    ownerId: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const RoomModel = mongoose.model("rooms", RoomSchema);
