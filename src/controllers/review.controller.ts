import { Request, Response } from "express";
import { Review } from "../models/review.model";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { Book } from "../models/books.model"

const createReview = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const { rating, review } = req.body;
        const user = req.user;
        const book = await Book.findById(bookId);
        if (!book) {
            throw new ApiError(404, "Book not found", "Book not found");
        }
        const newReview = await Review.create({ book: bookId, user: user._id, rating, review });

        if (!newReview) {
            throw new ApiError(400, "Failed to create review", 'Failed to create review');
        }

        res.status(201).json(new ApiResponse(201, "Review created successfully", newReview));
    } catch (error) {
        console.log(`Error in createReview: ${error}`);
        throw new ApiError(500, "Error in createReview", error);
    }
}

const getReviews = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const reviews = await Review.find({ book: bookId }).populate("user", "username email");
        if (!reviews) {
            throw new ApiError(404, "No reviews found", "No reviews found");
        }
        res.status(200).json(new ApiResponse(200, "Reviews fetched successfully", reviews));
    } catch (error) {
        console.log(`Error in getReviews: ${error}`);
        throw new ApiError(500, "Error in getReviews", error);
    }
}

const getReviewById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            throw new ApiError(404, "Review not found", "Review not found");
        }
        res.status(200).json(new ApiResponse(200, "Review fetched successfully", review));
    } catch (error) {
        console.log(`Error in getReviewById: ${error}`);
        throw new ApiError(500, "Error in getReviewById", error);
    }
}

const updateReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { rating, review } = req.body;
        const updatedReview = await Review.findByIdAndUpdate(id, { rating, review }, { new: true });

        if (!updatedReview) {
            throw new ApiError(404, "Review not found", "Review not found");
        }
        res.status(200).json(new ApiResponse(200, "Review updated successfully", review));
    } catch (error) {
        console.log(`Error in updateReview: ${error}`);
        throw new ApiError(500, "Error in updateReview", error);
    }
}

const deleteReview = async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.params;
        const user = req.user;
        const review = await Review.findOne({ _id: reviewId, user: user._id });
        if (!review) {
            throw new ApiError(404, "Review not found", "Review not found");
        }
        await Review.findByIdAndDelete(reviewId);
        res.status(200).json(new ApiResponse(200, "Review deleted successfully", review));
    } catch (error) {
        console.log(`Error in deleteReview: ${error}`);
        throw new ApiError(500, "Error in deleteReview", error);
    }
}


export { createReview, getReviews, getReviewById, updateReview, deleteReview };