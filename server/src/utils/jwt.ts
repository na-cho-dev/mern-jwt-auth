import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

export const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...SignOptions } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret!, { ...SignOptions, ...defaults });
};

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  const { secret = JWT_SECRET, ...verifyOptions } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOptions,
    }) as TPayload;

    // console.log("JWT Payload", payload);

    return { payload };
  } catch (error: any) {
    return { error: error.message };
  }
};
