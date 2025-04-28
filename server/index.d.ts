import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      userId: mongoose.Types.ObjectId;
      sessionId: monggose.Types.ObjectId;
    }
  }
}
export {};
