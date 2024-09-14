import {CreateUser, UserRepository, UserResponse} from "./user.interface";
import {HttpException} from "../../errors/http.exception";
import {saltRounds} from "../../config/vars";
import {hash} from "bcryptjs";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async create(user: CreateUser): Promise<UserResponse> {
        const checkIfUserAlreadyExist = await this.userRepository.findByEmail(user.email);

        if (checkIfUserAlreadyExist) {
            throw new HttpException(400, "user already exists");
        }

        const hashPassword = await hash(user.password, saltRounds);

        const createdUser = await this.userRepository.create({
            fullName: user.fullName,
            email: user.email,
            password: hashPassword,
            roleId: user.roleId,
        });

        await this.userRepository.addRole(createdUser.id, user.roleId);

        return createdUser;
    }

    public async findAll(): Promise<UserResponse[]> {
        const findUsers = await this.userRepository.findAll();

        return findUsers.map(user => {
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword;
        });
    }

    public async findById(id: number): Promise<UserResponse | null> {
        const findUser = await this.userRepository.findById(id);

        if (!findUser) {
            throw new HttpException(404, "user not found");
        }

        return findUser;
    }
}