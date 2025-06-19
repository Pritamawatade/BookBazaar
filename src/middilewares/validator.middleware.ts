import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: Record<string, string>[] = [];

  errors.array().forEach((element) => {
    if ("path" in element && "msg" in element) {
      extractedErrors.push({
        [element.path]: element.msg,
      });
    }
  });
  throw new ApiError(400, "Validation Error", extractedErrors);
};
