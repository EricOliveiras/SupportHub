import {UserRepository} from "../user/user.repository";
import {HttpException} from "../../errors/http.exception";
import {AuthUserRequestDTO, AuthUserResponseDTO} from "../user/user.interface";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";
import {jwtSecret} from "../../config/vars";

export class AuthenticateService {
    constructor(private readonly repository: UserRepository) {}

    public async login({email, password}: AuthUserRequestDTO): Promise<AuthUserResponseDTO> {
        const user = await this.repository.findByEmail(email);

        if (!user || !await compare(password, user.password)) {
            throw new HttpException(401, "unauthorized");
        }

        const permissions = user.User_Role.map((i) => {
            return i.Role.Permission_Role.map((i) => i.Permission.name);
        }).flat(1);

        const token = sign(
            {userId: user.id, permissions: permissions},
            jwtSecret,
            {expiresIn: '7d'},
        );

        return {
            token: token,
        };
    }
}