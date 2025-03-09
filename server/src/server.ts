import express, { Response, Request } from "express";
import mongoose from "mongoose";
import UserRoutes from "./Routes/UserRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.use("/auth", UserRoutes);

const mongoURI = "mon";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Couldnt connect to MongoDB"));
