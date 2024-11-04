import { Ticket, TicketType } from "@prisma/client";
import { prisma as db } from "../../config/prisma";
import { TicketTypeDTO } from "./ticketType.interface";

export class TicketTypeRepository {
  public async create(ticketType: TicketTypeDTO): Promise<TicketType> {
    return db.ticketType.create({
      data: ticketType,
    });
  }

  public async findAll(): Promise<TicketType[]> {
    return db.ticketType.findMany();
  }

  public async findById(id: number): Promise<TicketType | null> {
    return db.ticketType.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async update(
    id: number,
    ticketType: TicketTypeDTO
  ): Promise<TicketType> {
    return db.ticketType.update({
      where: {
        id: id,
      },
      data: ticketType,
    });
  }

  public async delete(id: number): Promise<void> {
    await db.ticketType.delete({
      where: {
        id: id,
      },
    });
  }

  public async findByName(name: string): Promise<TicketType | null> {
    return db.ticketType.findUnique({
      where: {
        name: name,
      },
    });
  }

  public async findTicketsByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<Ticket[]> {
    return db.ticket.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        TicketType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
