import express from "express";
import {
  viewProfile,
  updateProfile,
  createUser,
  getAllUsers,
  upload,
} from "../Controllers/AuthController";
import { protect } from "../Middleware/VerifyToken"; // Protect middleware for authorization

const router = express.Router();

// Public Route: Create User
router.post("/create", createUser);

// Protected Routes
router.get("/profile", protect, viewProfile); // View Profile
router.put("/profile", protect, upload.single("profileImage"), updateProfile); // Update Profile

// Admin Route: Get All Users
router.get("/users", protect, getAllUsers);

export default router;
