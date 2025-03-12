import express from "express";
import {
  sendMessage,
  getMessages,
  getUsers,
} from "../Controllers/MessageController"; // Import the controller functions
import { verifyToken } from "../Middleware/VerifyToken";
import upload from "../Middleware/auth.MulterConfig";
const router = express.Router();

router.post(
  "/send/:id",
  verifyToken,
  upload.single("image"),
  (req, res, next) => {
    console.log("File uploaded:", req.file); // Log file details
    next();
  },
  sendMessage
);
router.get("/get/:id", verifyToken, getMessages);
router.get("/getusers", verifyToken, getUsers);

export default router;
