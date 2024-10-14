import {prisma as db} from "../../config/prisma";
import {Sector} from "@prisma/client";

export class SectorRepository {
    public async findAll(): Promise<Sector[]> {
        return db.sector.findMany({
            include: {
                users: true,
                orders: true,
            }
        });
    }

    public async findById(id: number): Promise<Sector | null> {
        return db.sector.findUnique({
            where: {id},
            include: {
                users: true,
                orders: true,
            }
        });
    }
}