import express from "express";
import { register, login } from "../Controllers/AuthController";
import upload from "../Middleware/auth.MulterConfig";
const router = express.Router();

// Public Route: Create User
router.post(
  "/register",
  upload.single("profile"),
  (req, res, next) => {
    console.log("File uploaded:", req.file); // Log file details
    next();
  },
  register
);

router.post("/login", login);
export default router;
