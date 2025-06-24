import { Router } from "express";
import { createBook, getBooks, getBookById, updateBook, deleteBook } from "../controllers/books.controller";
import { authMiddleware, checkAdmin } from "../middilewares/auth.middleware";
import { createReview, deleteReview, getReviewById, getReviews, updateReview } from "../controllers/review.controller";

const booksRouter = Router();

booksRouter.post("/", authMiddleware, checkAdmin, createBook);
booksRouter.get("/", getBooks);
booksRouter.get("/:id", getBookById);
booksRouter.put("/:id", authMiddleware, checkAdmin, updateBook);
booksRouter.delete("/:id", authMiddleware, checkAdmin, deleteBook);

// reviews

booksRouter.post("/:bookId/reviews", authMiddleware, createReview);
booksRouter.get("/:bookId/reviews", getReviews);
booksRouter.get("/:bookId/reviews/:reviewId", getReviewById);
booksRouter.put("/:bookId/reviews/:reviewId", authMiddleware, updateReview);
booksRouter.delete("/:bookId/reviews/:reviewId", authMiddleware, deleteReview);

export default booksRouter;