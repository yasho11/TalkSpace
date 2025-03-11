import User from "../Models/User";
import dotenv from "dotenv";
import { Response, Request } from "express";
import multer from "multer";
import bcrypt from "bcrypt";
import path from "path";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

//?-----------------------------------------------------------------------------------------------

/* 
!@name: register
!@access: public
!@desc:Controller to register user
*/
export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log("Register Triggerred");
  const { name, email, password } = req.body;
  const ProfileURL = req.file ? `/uploads/${req.file.filename}` : null;
  if (!name || !email || !password) {
    console.log("Items not gotten");
  } else {
    try {
      if (await User.findOne({ email })) {
        res.status(400).json({ message: "Email already taken!" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
          UserName: name,
          UserEmail: email,
          UserPassword: passwordHash,
          ProfileUrl: ProfileURL,
        });

        await user.save();
        res.status(201).json({ message: "User created successfully!!" });
      }
    } catch (err: any) {
      res.status(500).json({ error: "Server error", err });
    }
  }
};

//?--------------------------------------------------------------------------------------------------------
/* 
!@name: login
!@access: public
!@desc:Controller to log user in
*/

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Find user by email
    const user = await User.findOne({ UserEmail: email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found! Please register first." });
    }

    // Compare password
    const isMatched = await bcrypt.compare(password, user.UserPassword);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate JWT Token
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT Secret not found" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.UserEmail },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.UserName,
        email: user.UserEmail,
        profile: user.ProfileUrl,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error", err });
  }
};
