import express, { Response, Request } from "express";
import mongoose from "mongoose";
import UserRoutes from "./Routes/UserRoutes";
import MessageRoutes from "./Routes/MessageRoutes"; // Import the message routes
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { io, server, app } from "./socket";
dotenv.config();

const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", UserRoutes);
app.use("/messages", MessageRoutes); // Use the message routes

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
if (mongoURI) {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.error("Couldn't connect to MongoDB", err));
} else {
  console.log("Couldn't process MongoDB URI from dotenv");
}

// Handle socket.io connections and events
io.on("connection", (socket) => {
  console.log(`New user connected: ${socket.id}`);

  // Listening for incoming messages
  socket.on("send-message", (message) => {
    console.log(`Message received: ${message}`);

    // Emit the message to all clients (or to specific receiver if needed)
    io.emit("receive-message", message);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
