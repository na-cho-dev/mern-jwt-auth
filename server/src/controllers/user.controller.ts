import { NOT_FOUND, OK } from "../constants/http.ts";
import UserModel from "../models/user.model.ts";
import appAssert from "../utils/appAssert.ts";
import catchErrors from "../utils/catchErrors.ts";

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");

  return res.status(OK).json(user.omitPassword());
});
