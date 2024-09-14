import {User} from "@prisma/client";

export interface CreateUser {
    fullName: string;
    email: string;
    password: string;
    roleId: number;
}

export interface UserResponse {
    fullName: string;
    email: string;
    password?: string;
    roleId: number;
}

export interface UpdateUser extends CreateUser {
}

export interface UserRepository {
    create(data: CreateUser): Promise<User>;

    update(id: number, data: UpdateUser): Promise<User>;

    findById(id: number): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;

    findAll(): Promise<User[]>;

    findByName(fullName: string): Promise<User | null>;

    addRole(id: number, roleId: number): Promise<void>;
}
