import { User } from "../models/user.model";
import { ApiError } from "../utils/api-error";
import jwt from "jsonwebtoken";
const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const { accessToken } = req.cookies || req.headers;

    if (!accessToken) {
      throw new ApiError(401, "Unauthorized", []);
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as any;

    if (!decoded) {
      throw new ApiError(401, "Unauthorized", []);
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(401, "Unauthorized", []);
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error in auth middleware", error)
    throw new ApiError(400, "error in auth middleware", error);
  }
};

export { authMiddleware }
