import AppErrorCode from "../constants/appErrorCode.ts";
import { HttpStatusCode } from "../constants/http.ts";

export class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCode
  ) {
    super(message);
  }
}

export default AppError;
