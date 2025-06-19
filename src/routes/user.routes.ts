import { Router } from "express";
import { userRegisterValidator } from "../validators";
import { validate } from "../middilewares/validator.middleware";
import { register } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/register', userRegisterValidator(), validate, register)
export default userRouter;