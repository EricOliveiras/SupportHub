import {Request, Response} from 'express';
import {UserService} from "./user.service";
import {CreateUserDTO, UserResponseDTO} from "./user.interface";

export class UsersController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const {fullName, email, password, roleId, sectorId}: CreateUserDTO = req.body;

        const createUser: UserResponseDTO = await this.userService.create({
            fullName,
            email,
            password,
            roleId,
            sectorId
        });

        return res.status(201).json({
            message: 'User successfully created',
            user: createUser
        });
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        const findUsers = await this.userService.findAll();
        return res.status(200).json({
            users: findUsers
        });
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const user = await this.userService.findById(parseInt(id));
        return res.status(200).json({
            user: user
        });
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const {fullName, roleId, sectorId} = req.body;
        const user = await this.userService.update(parseInt(id), {fullName, roleId, sectorId});
        return res.status(200).json({
            message: 'User successfully updated',
            user: user
        });
    }
}