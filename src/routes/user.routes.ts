import { Router } from "express";
import { userRegisterValidator, userLoginValidator } from "../validators";
import { validate } from "../middilewares/validator.middleware";
import { register, login, logout, changePassword, getUser } from "../controllers/user.controller";
import { authMiddleware } from "../middilewares/auth.middleware";

const userRouter = Router();

userRouter.post('/register', userRegisterValidator(), validate, register)
userRouter.post('/login', userLoginValidator(), validate, login)
userRouter.post('/logout', logout)
userRouter.post('/change-password', authMiddleware, changePassword)
userRouter.get('/me', authMiddleware, getUser)

export default userRouter;  