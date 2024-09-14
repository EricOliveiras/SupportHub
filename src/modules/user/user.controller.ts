import {Request, Response} from 'express';
import {UserService} from "./user.service";
import {CreateUser, UserResponse} from "./user.interface";

export class UsersController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const {fullName, email, password, roleId}: CreateUser = req.body;

        const createUser: UserResponse = await this.userService.create({
            fullName,
            email,
            password,
            roleId,
        });

        return res.status(201).json({
            error: false,
            message: 'User successfully created',
            user: createUser
        });
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        const findUsers = await this.userService.findAll();
        return res.status(200).json({
            error: false,
            users: findUsers
        });
    }
}