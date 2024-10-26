import { PrismaClient } from '@prisma/client';
import { saltRounds } from '../../src/config/vars';
import { permission_role, permissions, roles, sectors } from './data';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const main = async () => {
    console.log('> Seeding database...');

    try {
        for (const role of roles) {
            await prisma.role.upsert({
                where: { type: role.type },
                update: {},
                create: role,
            });
        }

        for (const permission of permissions) {
            await prisma.permission.upsert({
                where: { name: permission.name },
                update: {},
                create: permission,
            });
        }

        for (const pr of permission_role) {
            await prisma.permission_Role.upsert({
                where: { role_id_permission_id: { role_id: pr.role_id, permission_id: pr.permission_id } },
                update: {},
                create: pr,
            });
        }

        for (const sector of sectors) {
            await prisma.sector.upsert({
                where: { name: sector.name },
                update: {},
                create: sector,
            });
        }

        const admin = await prisma.user.upsert({
            where: { email: 'admin@example.com' },
            update: {},
            create: {
                fullName: 'admin',
                email: 'admin@example.com',
                password: await hash('admin', saltRounds),
                roleId: 1,
                sectorId: 2,
                isAdmin: true,
            },
        });

        await prisma.user_Role.upsert({
            where: { role_id_user_id: { role_id: admin.roleId, user_id: admin.id } },
            update: {},
            create: {
                role_id: admin.roleId,
                user_id: admin.id,
            },
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