import {prisma as db} from "../../config/prisma";
import {Sector} from "@prisma/client";
import {CreateSectorDTO, UpdateSectorDTO} from "./sector.interface";

export class SectorRepository {
    public async create(sector: CreateSectorDTO): Promise<Sector> {
        return db.sector.create({
            data: {
                name: sector.name
            }
        });
    }

    public async findAll(): Promise<Sector[]> {
        return db.sector.findMany({
            include: {
                users: true,
                tickets: true,
            }
        });
    }

    public async findById(id: number): Promise<Sector | null> {
        return db.sector.findUnique({
            where: {id},
            include: {
                users: true,
                tickets: true,
            }
        });
    }

    public async findByName(name: string): Promise<Sector | null> {
        return db.sector.findUnique({
            where: {
                name: name
            },
        });
    }

    public async update(id: number, sector: UpdateSectorDTO): Promise<Sector> {
        return db.sector.update({
            where: {
                id: id
            },
            data: sector
        })
    }

    public async delete(id: number): Promise<void> {
        await db.sector.delete({
            where: {
                id: id
            }
        });
    }
}