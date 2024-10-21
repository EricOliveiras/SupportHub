import {Ticket} from "@prisma/client";
import {prisma as db} from "../../config/prisma";
import {CreateTicketDTO, UpdateTicketDTO} from "./ticket.interface";

export class TicketRepository {
    public async create(ticket: CreateTicketDTO): Promise<Ticket> {
        return db.ticket.create({
            data: {
                userId: ticket.userId,
                requester: ticket.requester as string,
                problemDescription: ticket.problemDescription,
                sectorId: ticket.sectorId
            }
        });
    }

    public async findAll(): Promise<Ticket[]> {
        return db.ticket.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                Sector: true,
                assignedTo: {
                    select: {
                        id: true,
                        fullName: true,
                    }
                },
            }
        });
    }

    public async findById(id: number): Promise<Ticket | null> {
        return db.ticket.findUnique({
            where: {
                id: id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                Sector: true,
                assignedTo: {
                    select: {
                        id: true,
                        fullName: true,
                    }
                },
            }
        });
    }

    public async findAllBySector(id: number): Promise<Ticket[]> {
        return db.ticket.findMany({
            where: {
                sectorId: id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                Sector: true,
                assignedTo: {
                    select: {
                        id: true,
                        fullName: true,
                    }
                },
            }
        });
    }

    public fundByUserId(id: number): Promise<Ticket[]> {
        return db.ticket.findMany({
            where: {
                userId: id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                Sector: true,
                assignedTo: {
                    select: {
                        id: true,
                        fullName: true,
                    }
                },
            }
        });
    }

    public async assignedTicket(userId: number, ticketId: number): Promise<Ticket> {
        return db.ticket.update({
            where: {
                id: ticketId
            },
            data: {
                assignedToId: userId
            }
        })
    }

    public async update(id: number, ticket: UpdateTicketDTO): Promise<Ticket> {
        return db.ticket.update({
            where: {
                id: id,
            },
            data: ticket
        });
    }

    public async delete(id: number): Promise<void> {
        await db.ticket.delete({where: {id: id}})
    }
}