import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

import { connectDB } from "./config/db.ts";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.ts";
import errorHandler from "./middleware/errorHandler.ts";
import { OK } from "./constants/http.ts";
import authRoutes from "./routes/auth.route.ts";
import authenticate from "./middleware/authenticate.ts";
import userRoutes from "./routes/user.route.ts";
import sessionRoutes from "./routes/session.route.ts";

const app = express();
const swaggerDocument = YAML.load("./src/swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(OK).json({ status: "Healthy" });
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Protected Routes
app.use("/api/user", authenticate, userRoutes);
app.use("/api/sessions", authenticate, sessionRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`🚀 Server running on PORT: ${PORT} in ${NODE_ENV} Environment`);
  await connectDB();
});
