export interface CreateUserDTO {
    fullName: string;
    email: string;
    password: string;
    sectorId: number;
    isAdmin: boolean;
    roleId: number;
}

export interface UserResponseDTO {
    id: number;
    fullName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    roleId: number;
    isActive: boolean;
    isAdmin: boolean;
    sectorId: number | null;
}

export type UserWithoutPasswordDTO = Omit<UserResponseDTO, "password">;

export interface UpdateUserDTO {
    fullName?: string;
    sectorId?: number;
    roleId?: number;
}

export interface AuthUserRequestDTO {
    email: string;
    password: string;
}

export interface AuthUserResponseDTO {
    token: string;
}

export interface IUserService {
    create(data: CreateUserDTO): Promise<UserResponseDTO>;

    update(id: number, data: UpdateUserDTO): Promise<UserResponseDTO>;

    findById(id: number): Promise<UserResponseDTO | null>;

    findAll(): Promise<UserWithoutPasswordDTO[]>;
}
