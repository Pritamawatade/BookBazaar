import { Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { User } from "../models/user.model";
import { ApiResponse } from "../utils/api-response";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new ApiError(400, "All fields are required", []);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new ApiError(400, "User already exists", []);
    }
    const user = await User.create({
      username,
      email,
      password,
    });
    res
      .status(201)
      .json(new ApiResponse(201, "user created successfully", user));
  } catch (error) {
    console.log("error in register ", error);
    throw new ApiError(400, "error in register", error);
  }
};


export { register };
