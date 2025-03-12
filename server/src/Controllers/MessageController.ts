import { ObjectId } from "mongoose";
import Message from "../Models/Message";
import { Request, Response } from "express-serve-static-core";
import User from "../Models/User";

interface CustomRequest extends Request {
  id?: ObjectId;
}

export const getUsers = async (req: CustomRequest, res: Response) => {
  const LeftUser = req.id;

  try {
    const filteredUsers = await User.find({ _id: { $ne: LeftUser } }).select(
      "-UserPassword"
    );

    res.status(200).json({ users: filteredUsers });
  } catch (error) {
    console.log("Problem in the getUsers controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessage = async (req: CustomRequest, res: Response) => {
  const id = req.params;
  const senderId = req.id;
  const { content } = req.body;
  const image = req.file ? `/messImage/${req.file.filename}` : null;

  if (image || content) {
    try {
      const message = new Message({
        sender: senderId,
        receiver: id,
        content,
        image,
      });

      await message.save();

      res.status(201).json({ Notice: "Message create successfully", message });
    } catch (error) {
      console.log("Problem in the sendMessage controller");
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    console.log("Please write somethingtheir");
  }
};

export const getMessages = async (req: CustomRequest, res: Response) => {
  const senderId = req.id;
  const { id: receiverId } = req.params;

  try {
    const getMessages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    res.status(200).json(getMessages);
  } catch (error) {
    console.log("Problem in the getMessages controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
