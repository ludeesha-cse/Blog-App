import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbconfig.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

dbConnect();

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRoutes);

app.use("/api/auth", authRoutes);
