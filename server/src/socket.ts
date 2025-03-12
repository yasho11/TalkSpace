import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // The URL of your front-end app
  },
});

const userSocketMap: { [key: string]: string } = {}; // {userId: SocketId}

io.on("connection", (socket) => {
  console.log("A user Connected", socket.id);

  const userId = socket.handshake.query.userId as string;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated online users
  });
});

export function getReceiverSocketId(userId: any) {
  return userSocketMap[userId];
}

// Start the server
server.listen(1256, () => {
  console.log("Server is running on http://localhost:1256");
});

export { io, app, server };
