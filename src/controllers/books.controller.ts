import { Request, Response } from "express";
import { Book } from "../models/books.model";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";

const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, author, description, price, category, isbn } = req.body;
    const book = await Book.create({
      title,
      author,
      description,
      price,
      category,
      isbn,
    });
    res.status(201).json(new ApiResponse(201, "Book created successfully", book));
  } catch (error) {
    console.log("error in createBook ", error);
    throw new ApiError(500, "error in createBook", error);
  }
};

const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await Book.find();
    res.status(200).json(new ApiResponse(200, "Books fetched successfully", books));
  } catch (error) {
    console.log("error in getBooks ", error);
    throw new ApiError(500, "error in getBooks", error);
  }
};

const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(new ApiResponse(200, "Book fetched successfully", book));
  } catch (error) {
    console.log("error in getBookById ", error);
    throw new ApiError(500, "error in getBookById", error);
  }
};

const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, author, description, price, category, isbn } = req.body;
    const book = await Book.findByIdAndUpdate(id, { title, author, description, price, category, isbn }, { new: true });
    res.status(200).json(new ApiResponse(200, "Book updated successfully", book));
  } catch (error) {
    console.log("error in updateBook ", error);
    throw new ApiError(500, "error in updateBook", error);
  }
};

const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, "Book deleted successfully", null));
  } catch (error) {
    console.log("error in deleteBook ", error);
    throw new ApiError(500, "error in deleteBook", error);
  }
};

export { createBook, getBooks, getBookById, updateBook, deleteBook };