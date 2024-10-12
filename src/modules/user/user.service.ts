import {
    CreateUserDTO,
    IUserService, UpdateUserDTO, UserResponseDTO, UserWithoutPasswordDTO,
} from "./user.interface";
import {HttpException} from "../../errors/http.exception";
import {saltRounds} from "../../config/vars";
import {hash} from "bcryptjs";
import {UserRepository} from "./user.repository";
import {prisma} from "../../config/prisma";

export class UserService implements IUserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async create(user: CreateUserDTO): Promise<UserResponseDTO> {
        const checkIfUserAlreadyExist = await this.userRepository.findByEmail(user.email);

        if (checkIfUserAlreadyExist) {
            throw new HttpException(400, "user already exists");
        }

        const hashPassword = await hash(user.password, saltRounds);

        const createdUser = await this.userRepository.create({
            fullName: user.fullName.toLowerCase(),
            email: user.email,
            password: hashPassword,
            roleId: user.roleId,
            sectorId: user.sectorId,
        });

        await this.userRepository.addRole(createdUser.id, user.roleId);

        return createdUser;
    }

    public async findAll(): Promise<UserWithoutPasswordDTO[]> {
        const users = await this.userRepository.findAll();

        const usersWithoutPassword = users.map(user => {
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword;
        });

        return usersWithoutPassword as UserWithoutPasswordDTO[];
    }


    public async findById(id: number): Promise<UserResponseDTO | null> {
        const findUser = await this.userRepository.findById(id);

        if (!findUser) {
            throw new HttpException(404, "user not found");
        }

        return findUser;
    }

    public async update(id: number, {fullName, sectorId, roleId}: UpdateUserDTO): Promise<UserResponseDTO> {
        const findUser = await this.userRepository.findById(id);

        if (!findUser) {
            throw new HttpException(404, "user not found");
        }

        return await this.userRepository.update(id, {
            fullName: fullName ? fullName.toLowerCase() : findUser.fullName,
            sectorId: sectorId,
            roleId: roleId,
        });
    }
}