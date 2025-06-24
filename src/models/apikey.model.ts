import mongoose, { Document } from "mongoose";

export interface IApiKey extends Document {
    key: string;
    user: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const apiKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true })

export const ApiKey = mongoose.model("ApiKey", apiKeySchema);
