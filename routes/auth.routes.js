import {Router} from 'express';
import registerUserSchema from '../schemas/registerUser.schema.js';
import todoValidator from '../middlewares/todo.validator.middleware.js';
import { loginController, registerController } from '../controllers/auth.controller.js';
import loginSchema from '../schemas/login.schema.js';

export const authRouter = Router();

authRouter.post("/login", todoValidator(loginSchema), loginController);
authRouter.post("/register", todoValidator(registerUserSchema), registerController);
