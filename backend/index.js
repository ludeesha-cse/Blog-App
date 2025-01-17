import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbconfig.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import morgan from "morgan";

dotenv.config();

dbConnect();

const __dirname = path.resolve();

const app = express();
app.use(morgan('dev'));

const corsOptions = {
  origin: ["https://blogapp-tdgg.onrender.com"], // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true,  // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/post", postRoutes);

app.use("/api/comment", commentRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
