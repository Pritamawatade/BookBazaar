import { Router } from "express";
import { userRegisterValidator, userLoginValidator } from "../validators";
import { validate } from "../middilewares/validator.middleware";
import { register, login, logout } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/register', userRegisterValidator(), validate, register)
userRouter.post('/login', userLoginValidator(), validate, login)
userRouter.post('/logout', logout)
export default userRouter;  