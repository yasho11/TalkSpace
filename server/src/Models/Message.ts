import mongoose, { Schema, Document } from "mongoose";

// Message Interface
export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId; // Sender user ID
  receiver: mongoose.Types.ObjectId; // Receiver user ID
  content: string; // The message content
  image: string;
  timestamp: Date; // Time when the message was sent
}

// Message Schema
const MessageSchema: Schema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Reference to the Users collection for the sender
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Reference to the Users collection for the receiver
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Message = mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
