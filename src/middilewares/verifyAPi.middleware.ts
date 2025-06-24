import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { ApiKey } from "../models/apikey.model";
import { User } from "../models/user.model";

const verifyApiKey = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["order-api-key"];
    console.log("apiKey====>", apiKey)
    if (!apiKey) {
        throw new ApiError(401, "Unauthorized", "Unauthorized");
    }
    const apiKeyModel = await ApiKey.findOne({ key: apiKey });
    console.log("apiKeyModel====>", apiKeyModel)
    if (!apiKeyModel || apiKeyModel.expiresAt < new Date()) {
        throw new ApiError(401, "Unauthorized", "Unauthorized");
    }


    const user = await User.findById(apiKeyModel.user);
    if (!user) {
        throw new ApiError(401, "Unauthorized", "Unauthorized");
    }
    if (!user.apiKeys.includes(apiKeyModel._id.toString())) {
        throw new ApiError(401, "Unauthorized", "Unauthorized");
    }
    next();
}


export { verifyApiKey };