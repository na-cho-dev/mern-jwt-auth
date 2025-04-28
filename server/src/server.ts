import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(OK).json({ status: "Healthy" });
});

// Auth Routes
app.use("/auth", authRoutes);

// Protected Routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`🚀 Server running on PORT: ${PORT} in ${NODE_ENV} Environment`);
  await connectDB();
});
