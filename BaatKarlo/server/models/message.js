import mongoose, { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    content: String,
    attachments: [
      {
        public_id: {
          type: string,
          required: true,
        },
        url: {
          type: string,
          required: true,
        },
      },
    ],

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

export const Message = mongoose.models.Message || model("Message", schema);
