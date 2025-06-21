import { Request, Response } from "express";
import { User } from "../models/user.model";
import { ApiResponse } from "../utils/api-response";
import { ApiError } from "../utils/api-error";

const generateAccessAndRefreshToken = async (
  id: string
): Promise<{ accessToken: string, refreshToken: string }> => {
  try {
    const user = await User.findById(id);

    const accessToken = user?.generateAccessToken() as string;
    const refreshToken = user?.generateRefreshToken() as string;
    if (!user) {
      throw new ApiError(404, "User not found", []);
    }

    if (!accessToken || !refreshToken) {
      throw new ApiError(401, "error in creating accessToken", []);
    }
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("error in generateAccessAndRefreshToken ", error);
    throw new ApiError(400, "error in generateAccessAndRefreshToken", error);
  }
};

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

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id as string);

    user.refreshToken = refreshToken;

    await user.save();

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "strict" as const : "lax" as const,
      maxAge: 15 * 60 * 1000,
    }

    res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(new ApiResponse(201, "user created successfully", user));
  } catch (error) {
    console.log("error in register ", error);
    throw new ApiError(400, "error in register", error);
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "All fields are required", []);
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found", []);
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid password", []);
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id as string);
    user.refreshToken = refreshToken;
    await user.save();

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "strict" as const : "lax" as const,
      maxAge: 15 * 60 * 1000,
    }
    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(new ApiResponse(200, "user logged in successfully", user));

  } catch (error) {
    console.log("error in login ", error);
    throw new ApiError(400, "error in login", error);
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new ApiError(401, "Unauthorized", []);
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      throw new ApiError(404, "User not found", []);
    }
    user.refreshToken = undefined as unknown as string;
    await user.save();
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json(new ApiResponse(200, "user logged out successfully", user));
  } catch (error) {

    console.log("error in logout ", error);
    throw new ApiError(400, "error in logout", error);
  }
};

export { register, login, logout };
