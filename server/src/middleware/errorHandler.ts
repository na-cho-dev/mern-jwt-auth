import { ErrorRequestHandler, Response } from "express";
import { z } from "zod";

import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http.ts";
import AppError from "../utils/AppError.ts";
import { clearAuthCookies, REFRESH_PATH } from "../utils/cookies.ts";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  return res.status(BAD_REQUEST).json({ message: error.message, errors });
};

const handleAppError = (res: Response, error: AppError) => {
  return res
    .status(error.statusCode)
    .json({ message: error.message, errorCode: error.errorCode });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);

  if (req.path === REFRESH_PATH) {
    clearAuthCookies(res);
  }

  if (error instanceof z.ZodError) {
    handleZodError(res, error);
    return;
  }

  if (error instanceof AppError) {
    handleAppError(res, error);
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;
