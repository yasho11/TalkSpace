import User from "../Models/User";
import dotenv from "dotenv";
import { Response, Request } from "express";
import multer from "multer";
import bcrypt from "bcrypt";
import path from "path";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.filename + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

//?-----------------------------------------------------------------------------------------------

/*
!@name: getAllUsers
!@access: Private(admin-level)
!@desc: Get all users if your role is admin
*/

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

//?--------------------------------------------------------------------------------------------------------

/*
!@name: Create Users
!@access: Public
!@desc: Create a new user
*/

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { UserName, UserEmail, UserPassword } = req.body;

  try {
    const existingUser = await User.findOne({ UserEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(UserPassword, 10);

    const newUser = new User({
      UserName,
      UserEmail,
      UserPassword: hashedPassword,
      Points: 0, // You can set default values as needed
      ProfileUrl: "", // Set a default or empty URL initially
      resetToken: "",
      resetTokenExpiry: new Date(),
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

//?--------------------------------------------------------------------------------------------------------

/*
!@name: viewProfile
!@access: Private (Authenticated users only)
!@desc: Get the logged-in user's profile
*/

export const viewProfile = async (req: Request, res: Response): Promise<any> => {
  const userId = req.userId; // Assuming userId is passed as part of JWT token in auth middleware

  try {
    const user = await User.findById(userId).select("-UserPassword"); // Don't return password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

//?--------------------------------------------------------------------------------------------------------

/*
!@name: updateProfile
!@access: Private (Authenticated users only)
!@desc: Update the logged-in user's profile (including profile image)
*/

export const updateProfile = async (req: Request, res: Response):Promise<any>=> {
  const userId = req.userId; // Assuming userId is passed as part of JWT token in auth middleware
  const { UserName, UserEmail, ProfileUrl } = req.body;

  try {
    // Find the user and update their profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        UserName,
        UserEmail,
        ProfileUrl: req.file?.path || ProfileUrl, // Handle file upload
      },
      { new: true } // Return the updated user
    ).select("-UserPassword"); // Don't return password

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export { upload };
