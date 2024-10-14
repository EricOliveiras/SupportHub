import {Router} from "express";
import {UserRepository} from "./user.repository";
import {UserService} from "./user.service";
import {UsersController} from "./user.controller";
import {canRequest} from "../../middlewares/permissionsMiddleware";
import {authenticated} from "../../middlewares/authMiddlware";

export const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UsersController(userService);

userRouter.post("/users",
    authenticated,
    canRequest("create:user"),
    userController.create.bind(userController)
);
userRouter.get("/users",
    authenticated,
    canRequest("read:user:list"),
    userController.findAll.bind(userController)
);
userRouter.get("/users/:id",
    authenticated,
    canRequest("read:user"),
    userController.findById.bind(userController)
);
userRouter.get("/users/profile/me",
    authenticated,
    canRequest("read:me"),
    userController.me.bind(userController)
);
userRouter.put("/users/update/:id",
    authenticated,
    canRequest("update:user"),
    userController.update.bind(userController)
)
