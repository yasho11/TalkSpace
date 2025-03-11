import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Extend Request type to include userId
interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token after "Bearer "

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT Secret not found" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.userId = decoded.id;

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
