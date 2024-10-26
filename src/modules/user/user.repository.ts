import {CreateUserDTO, UpdateUserDTO} from "./user.interface";
import {prisma} from "../../config/prisma";
import {User} from "@prisma/client";

export class UserRepository {
    public async create(data: CreateUserDTO): Promise<User> {
        return prisma.user.create({
            data: data
        });
    }

    public async findAll(): Promise<User[]> {
        return prisma.user.findMany({
            include: {
                Ticket: true,
                Sector: true
            }
        });
    }

    public async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {email},
            include: {
                Sector: true,
                User_Role: {
                    select: {
                        Role: {
                            select: {
                                Permission_Role: {
                                    select: {
                                        Permission: {
                                            select: {
                                                id: true,
                                                name: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                Ticket: true
            }
        });
    }

    public async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                Sector: true,
                Ticket: true,
            }
        });
    }

    public async findByName(fullName: string): Promise<User | null> {
        return prisma.user.findFirst({where: {fullName}});
    }

    public async update(id: number, data: UpdateUserDTO): Promise<User> {
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