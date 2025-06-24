import { Request, Response } from "express";
import { Order } from "../models/orders.model";
import crypto from "crypto";
import { ApiError } from "../utils/api-error";
import { Book } from "../models/books.model";
import { ApiResponse } from "../utils/api-response";
import { ApiKey } from "../models/apikey.model";
import { User } from "../models/user.model";

const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const { bookId, quantity } = req.body;

        const book = await Book.findById(bookId);
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(400, "User not found", "User not found");
        }
        if (!book) {
            throw new ApiError(400, "Book not found", "Book not found");
        }

        const totalAmount = book.price * quantity;
        const order = await Order.create({
            user: userId, books: [bookId], totalAmount: totalAmount, status: "pending",
           
        });
        

        if (!order) {
            throw new ApiError(400, "Failed to create order", "Failed to create order");
        }

        const apiKey = await ApiKey.create({
            key: crypto.randomBytes(32).toString("hex"),
            user: userId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
        });

        order.apiKey.push(apiKey._id);
        user.apiKeys.push(apiKey._id.toString());
        await user.save();
        await order.save();

        const orderResponse = {
            id: order._id,
            user: order.user,
            books: order.books,
            totalAmount: order.totalAmount,
            status: order.status,
        }
        res.status(201).json(new ApiResponse(201, "Order created successfully", orderResponse));
    } catch (error) {
        console.log(`Error in createOrder: ${error}`);
        throw new ApiError(500, "Internal server error", "Internal server error");
    }
};

const getUserOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            throw new ApiError(400, "User not found", "User not found");
        }
        const orders = await Order.find({ user: userId }).populate("books");
        res.status(200).json(new ApiResponse(200, "Orders fetched successfully", orders));
    } catch (error) {
        console.log(`Error in getUserOrders: ${error}`);
        throw new ApiError(500, "Internal server error", "Internal server error");
    }
}

const getOrderById = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate("books");
        if (!order) {
            throw new ApiError(400, "Order not found", "Order not found");
        }
        res.status(200).json(new ApiResponse(200, "Order fetched successfully", order));
    } catch (error) {
        console.log(`Error in getOrderById: ${error}`);
        throw new ApiError(500, "Internal server error", "Internal server error");
    }
}
export { createOrder, getUserOrders, getOrderById };