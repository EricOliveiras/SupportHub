import {
    CreateUserDTO,
    IUserService, UpdateUserDTO, UserResponseDTO, UserWithoutPasswordDTO,
} from "./user.interface";
import {HttpException} from "../../errors/http.exception";
import {saltRounds} from "../../config/vars";
import {hash} from "bcryptjs";
import {UserRepository} from "./user.repository";

export class UserService implements IUserService {
    constructor(private readonly userRepository: UserRepository) {
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
            isAdmin: user.isAdmin,
        });

        await this.userRepository.addRole(createdUser.id, user.roleId);

        const {id, fullName, password, email, isActive, sectorId, roleId, createdAt, updatedAt, isAdmin} = createdUser;

        return {
            id,
            fullName,
            password,
            email,
            isActive,
            sectorId,
            roleId,
            isAdmin,
            createdAt,
            updatedAt
        };
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

    public async update(id: number, {fullName, password, sectorId, roleId, isActive}: UpdateUserDTO): Promise<UserResponseDTO> {
        const findUser = await this.userRepository.findById(id);

        if (!findUser) {
            throw new HttpException(404, "user not found");
        }

        const newPassword = password ? await hash(password, saltRounds) : findUser.password;

        return await this.userRepository.update(id, {
            fullName: fullName ? fullName.toLowerCase() : findUser.fullName,
            password: newPassword,
            sectorId: sectorId,
            roleId: roleId,
            isActive: isActive
        });
    }

    public async delete(id: number): Promise<void> {
        const findUser = await this.userRepository.findById(id);

        if (!findUser) {
            throw new HttpException(404, "user not found");
        }

        await this.userRepository.delete(id);
    }
}