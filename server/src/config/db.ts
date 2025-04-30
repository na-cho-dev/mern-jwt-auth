import mongoose from "mongoose";
import { MONGODB_URI } from "../constants/env.ts";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`🔐 Database Connected Successfully`);
  } catch (error) {
    console.log("Error Connecting to Database: ", error);
    process.exit(1);
  }
};
