import {Router} from "express";
import {UserRepositoryPrisma} from "./user.repository";
import {UserService} from "./user.service";
import {UsersController} from "./user.controller";

export const userRouter = Router();

const userRepository = new UserRepositoryPrisma();
const userService = new UserService(userRepository);
const userController = new UsersController(userService);

userRouter.post("/users", userController.create.bind(userController));
userRouter.get("/users", userController.findAll.bind(userController));
userRouter.get("/", (req, res)=> {
    res.send("Hello World!");
})