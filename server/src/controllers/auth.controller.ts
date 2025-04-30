import catchErrors from "../utils/catchErrors.ts";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
  resetPassword,
  sendPasswordResetEmail,
  verifyEmail,
} from "../services/auth.service.ts";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http.ts";
import {
  clearAuthCookies,
  getAccessTokenOptions,
  getRefreshTokenOptions,
  setAuthCookies,
} from "../utils/cookies.ts";
import {
  registerSchema,
  loginSchema,
  verificationCodeSchema,
  emailSchema,
  resetPasswordSchema,
} from "./auth.schemas.ts";
import { verifyToken } from "../utils/jwt.ts";
import SessionModel from "../models/session.model.ts";
import appAssert from "../utils/appAssert.ts";

export const registerHandler = catchErrors(async (req, res) => {
  // Validate the request body against the schema
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // Call Service to handle registration logic
  const { user, accessToken, refreshToken } = await createAccount(request);

  // Return Response
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  // Validate the request body against the schema
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // Call Service to handle login logic
  const { user, accessToken, refreshToken } = await loginUser(request);

  // Return Response
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Login successful" });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  const { payload } = verifyToken(accessToken || "");

  // console.log("Logout Payload", payload);

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  // Clear the cookies & return a response
  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logout successful" });
});

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Refresh token not found");

  // Call Service to handle refresh logic
  const { accessToken, newRefreshToken } =
    await refreshUserAccessToken(refreshToken);

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenOptions());
  }

  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenOptions())
    .json({
      message: "Access token refreshed successfully",
    });
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code);

  await verifyEmail(verificationCode);
  return res.status(OK).json({
    message: "Email verified successfully",
  });
});

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  await sendPasswordResetEmail(email);

  return res.status(OK).json({
    message: "Password reset email sent successfully",
  });
});

export const resetPasswordHandler = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse({
    ...req.body,
  });

  await resetPassword(request);

  return clearAuthCookies(res).status(OK).json({
    message: "Password reset successfully",
  });
});
