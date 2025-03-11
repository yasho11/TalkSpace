import express, { Response, Request } from "express";
import mongoose from "mongoose";
import UserRoutes from "./Routes/UserRoutes";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { disconnect } from "process";
dotenv.config();

const app = express();
const port = process.env.PORT;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use(express.static("public"));

app.use("/auth", UserRoutes);

const mongoURI = process.env.MONGO_URI;
if (mongoURI) {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.error("Couldnt connect to MongoDB", err));
} else {
  console.log("Couldnt process mongodb uri from dotenv");
}

io.on("connection", (socket) => {
  console.log(`New user connected: ${socket.id}`);

  socket.on("Send-message", (message) => {
    console.log(`Message Received: ${message}`);

    io.emit("receive-message", message);
  });

  socket.on("disconnect", ()=>{
    console.log(`User disconnected: ${socket.id}`);
  })

});






if (port) {
  //Listening to port
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} else {
  console.log("PORT not found");
}
