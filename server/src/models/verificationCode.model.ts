import mongoose from "mongoose";
import VerificationCodeType from "../constants/verificationCodeTypes";

export interface VerificationCodeDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationCodeType;
  expiresAt: Date;
  createdAt: Date;
}

const verifificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  type: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
  "VerificationCode",
  verifificationCodeSchema,
  "verification_codes"
);
export default VerificationCodeModel;
