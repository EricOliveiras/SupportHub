import {Router} from "express";
import {UserRepository} from "./user.repository";
import {UserService} from "./user.service";
import {UsersController} from "./user.controller";

export const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UsersController(userService);

userRouter.post("/users", userController.create.bind(userController));
userRouter.get("/users", userController.findAll.bind(userController));
userRouter.get("/users/:id", userController.findById.bind(userController));
userRouter.put("/users/update/:id", userController.update.bind(userController))
