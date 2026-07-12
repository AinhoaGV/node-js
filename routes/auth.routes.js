import {Router} from 'express';
import registerUserSchema from '../schemas/registerUser.schema.js';
import todoValidator from '../middlewares/todo.validator.middleware.js';
import { loginController, registerController } from '../controllers/auth.controller.js';
import loginSchema from '../schemas/login.schema.js';
import adminAuthMiddleare from '../middlewares/admin.auth.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import rateLimit from "express-rate-limit";

export const authRouter = Router();
const authRateLimit = rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 10,
    });
authRouter.post(
    "/login",
    authRateLimit,
    todoValidator(loginSchema),
    loginController
);
authRouter.post(
    "/register",
    authMiddleware,
    adminAuthMiddleare,
    todoValidator(registerUserSchema),
    registerController
);
