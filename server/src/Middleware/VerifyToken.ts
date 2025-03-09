import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return Promise.resolve();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = decoded.userId;
    next();
    return Promise.resolve();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
  return Promise.resolve();
};

export { protect };
