import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
    user: string;
    books: string[];
    totalAmount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    apiKey: string[];
}

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    apiKey: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ApiKey",
        }
    ]

}, { timestamps: true })

export const Order = mongoose.model("Order", orderSchema);


