import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbconfig.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

dbConnect();

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRoutes);
