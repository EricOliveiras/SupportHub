import {Router} from "express";
import {AuthController} from "./authenticate.controller";
import {UserRepository} from "../user/user.repository";
import {AuthenticateService} from "./authenticate.service";

export const authRouter = Router();

const userRepository = new UserRepository();
const authService = new AuthenticateService(userRepository);
const authController = new AuthController(authService);

authRouter.post("/auth/login", authController.login.bind(authController));