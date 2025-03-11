import express, { Response, Request } from "express";
import mongoose from "mongoose";
import UserRoutes from "./Routes/UserRoutes";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT;

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

if (port) {
  //Listening to port
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} else {
  console.log("PORT not found");
}
