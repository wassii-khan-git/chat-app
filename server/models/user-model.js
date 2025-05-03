import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
});

export default UserSchema;
