import mongoose, { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    call: String,

    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Call = mongoose.models.Call || model("Call", schema);
