import { RequestHandler } from "express";
import appAssert from "../utils/appAssert.ts";
import { UNAUTHORIZED } from "../constants/http.ts";
import AppErrorCode from "../constants/appErrorCode.ts";
import { verifyToken } from "../utils/jwt.ts";

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Unauthorized access",
    AppErrorCode.InvalidAccessToken
  );

  const { payload, error } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token Expired" : "Invalid Token",
    AppErrorCode.InvalidAccessToken
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;

  next();
};

export default authenticate;
