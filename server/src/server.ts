import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(OK).json({ status: "Healthy" });
});

app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`🚀 Server running on PORT: ${PORT} in ${NODE_ENV} Environment`);
  await connectDB();
});
