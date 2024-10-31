import {Request, Response} from 'express';
import {UserService} from "./user.service";
import {CreateUserDTO, UserResponseDTO} from "./user.interface";

export class UsersController {
    constructor(private readonly userService: UserService) {}

    public async create(req: Request, res: Response): Promise<Response> {
        const {fullName, email, password, roleId, sectorId, isAdmin}: CreateUserDTO = req.body;

        const createUser: UserResponseDTO = await this.userService.create({
            fullName,
            email,
            password,
            roleId,
            sectorId,
            isAdmin
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

    public async me(req: Request, res: Response): Promise<Response> {
        const id = req.user?.userId;
        const user = await this.userService.findById(id as number);
        return res.status(200).json({
            user: user
        });
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const {fullName, roleId, sectorId, password, isActive} = req.body;
        const user = await this.userService.update(parseInt(id), {fullName, roleId, sectorId, password, isActive});
        return res.status(200).json({
            message: 'User successfully updated',
            user: user
        });
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        await this.userService.delete(parseInt(id));
        return res.status(200).json({
            message: 'User successfully deleted',
        });
    }
}