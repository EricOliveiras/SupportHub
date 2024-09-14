import {CreateUser, UpdateUser, UserRepository} from "./user.interface";
import {prisma} from "../../config/prisma";
import {User} from "@prisma/client";

export class UserRepositoryPrisma implements UserRepository {
    public async create(data: CreateUser): Promise<User> {
        return prisma.user.create({
            data: data
        });
    }

    public async findAll(): Promise<User[]> {
        return prisma.user.findMany();
    }

    public async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({where: {email}});
    }

    public async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({where: {id}});
    }

    public async findByName(fullName: string): Promise<User | null> {
        return prisma.user.findFirst({where: {fullName}});
    }

    public async update(id: number, data: UpdateUser): Promise<User> {
        return prisma.user.update({
            where: {id: id},
            data: data
        });
    }

    public async addRole(id: number, roleId: number): Promise<void> {
        await prisma.user_Role.create({
            data: {
                user_id: id,
                role_id: roleId
            }
        });
    }
}