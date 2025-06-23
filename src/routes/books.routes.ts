import { Router } from "express";
import { createBook, getBooks, getBookById, updateBook, deleteBook } from "../controllers/books.controller";

const booksRouter = Router();

booksRouter.post("/create", createBook);
booksRouter.get("/get-all", getBooks);
booksRouter.get("/get-by-id/:id", getBookById);
booksRouter.put("/update/:id", updateBook);
booksRouter.delete("/delete/:id", deleteBook);

export default booksRouter;