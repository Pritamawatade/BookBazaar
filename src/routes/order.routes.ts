import { Router } from "express";
import { authMiddleware } from "../middilewares/auth.middleware";
import { createOrder, getOrderById, getUserOrders } from "../controllers/orders.controller";
import { verifyApiKey } from "../middilewares/verifyAPi.middleware";

const orderRouter = Router();

orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/", authMiddleware, verifyApiKey, getUserOrders);
orderRouter.get("/:id", authMiddleware, verifyApiKey, getOrderById);

export default orderRouter;