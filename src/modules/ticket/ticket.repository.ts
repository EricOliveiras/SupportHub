import { Ticket, TicketType } from "@prisma/client";
import { prisma as db } from "../../config/prisma";
import { CreateTicketDTO, UpdateTicketDTO } from "./ticket.interface";

export class TicketRepository {
  public async create(ticket: CreateTicketDTO): Promise<Ticket> {
    return db.ticket.create({
      data: {
        userId: ticket.userId,
        requester: ticket.requester as string,
        problemDescription: ticket.problemDescription,
        sectorId: ticket.sectorId,
        ticketTypeId: ticket.ticketTypeId,
      },
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
          },
        },
        TicketType: true,
      },
    });
  }

  public async findById(id: number): Promise<Ticket | null> {
    return db.ticket.findUnique({
      where: {
        id: id,
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
          },
        },
        TicketType: true,
      },
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
          },
        },
        TicketType: true,
      },
    });
  }

  public findByUserId(id: number): Promise<Ticket[]> {
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
          },
        },
        TicketType: true,
      },
    });
  }

  public async assignedTicket(
    userId: number,
    ticketId: number
  ): Promise<Ticket> {
    return db.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        assignedToId: userId,
      },
    });
  }

  public async update(id: number, ticket: UpdateTicketDTO): Promise<Ticket> {
    return db.ticket.update({
      where: {
        id: id,
      },
      data: ticket,
    });
  }

  public async delete(id: number): Promise<void> {
    await db.ticket.delete({ where: { id: id } });
  }

  public async getTotalTickets(): Promise<number> {
    const count = await db.ticket.count();
    return count;
  }

  public async getTicketsByType(): Promise<{ type: string; count: number }[]> {
    const ticketCounts = await db.ticket.groupBy({
      by: ["ticketTypeId"],
      _count: {
        ticketTypeId: true,
      },
    });

    const ticketTypeIds = ticketCounts
      .map((item) => item.ticketTypeId)
      .filter((id): id is number => id !== null);

    const ticketTypes = await db.ticketType.findMany({
      where: {
        id: {
          in: ticketTypeIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const ticketTypeMap = new Map(
      ticketTypes.map((type) => [type.id, type.name])
    );

    return ticketCounts
      .map((item) => {
        const typeName =
          ticketTypeMap.get(item.ticketTypeId as number) || "Outro";
        return {
          type: typeName,
          count: item._count.ticketTypeId,
        };
      })
      .filter((item) => item.count > 0);
  }

  public async getTicketsBySector(): Promise<
    { sectorId: number; name: string; count: number }[]
  > {
    const counts = await db.ticket.groupBy({
      by: ["sectorId"],
      _count: {
        sectorId: true,
      },
    });

    const sectorIds = counts
      .map((item) => item.sectorId)
      .filter((id): id is number => id !== null);

    const sectors = await db.sector.findMany({
      where: {
        id: {
          in: sectorIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const sectorMap = new Map<number, string>();
    sectors.forEach((sector) => {
      sectorMap.set(sector.id, sector.name);
    });

    return counts
      .filter((item) => item.sectorId !== null)
      .map((item) => ({
        sectorId: item.sectorId as number,
        name: sectorMap.get(item.sectorId as number) || "Desconhecido",
        count: item._count.sectorId,
      }));
  }
}
