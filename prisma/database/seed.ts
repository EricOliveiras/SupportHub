import { PrismaClient } from '@prisma/client';
import { saltRounds } from '../../src/config/vars';
import {permission_role, permissions, roles, sectors} from './data';
import {hash} from "bcryptjs";

const prisma = new PrismaClient();

const main = async () => {
    console.log('> Seeding database...');

    try {
        await prisma.role.createMany({
            data: roles,
            skipDuplicates: true,
        });

        await prisma.permission.createMany({
            data: permissions,
            skipDuplicates: true,
        });

        await prisma.permission_Role.createMany({
            data: permission_role,
            skipDuplicates: true,
        });

        await prisma.sector.createMany({
            data: sectors,
            skipDuplicates: true
        });

        const admin = await prisma.user.upsert({
            where: {
                email: 'admin@example.com'
            },
            update: {},
            create: {
                fullName: 'admin',
                email: 'admin@example.com',
                password: await hash('admin', saltRounds),
                roleId: 1,
                sectorId: 2,
                isAdmin: true
            },
        });

        await prisma.user_Role.createMany({
            data: {
                role_id: admin.roleId,
                user_id: admin.id
            },
            skipDuplicates: true
        });
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

main();