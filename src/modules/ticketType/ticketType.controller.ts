import { Request, Response } from "express";
import { TicketTypeService } from "./ticketType.service";
import {
  CreateTicketTypeDTO,
  UpdateTicketTypeDTO,
  TicketTypeResponseDTO
} from "./ticketType.interface";
import { TicketService } from "../ticket/ticket.service";

export class TicketTypeController {
  constructor(
    private readonly ticketTypeService: TicketTypeService,
    private readonly ticketService: TicketService
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const { name }: CreateTicketTypeDTO = req.body;
    const ticketType = await this.ticketTypeService.create({ name });

    return res.status(201).json({
      message: "Ticket type successfully created",
      ticketType,
    });
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const ticketTypes = await this.ticketTypeService.findAll();
    return res.status(200).json({
      ticketTypes,
    });
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ticketType = await this.ticketTypeService.findById(parseInt(id));

    if (!ticketType) {
      return res.status(404).json({
        message: "Ticket type not found",
      });
    }

    return res.status(200).json({
      ticketType,
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name }: UpdateTicketTypeDTO = req.body;
    const ticketType = await this.ticketTypeService.update(parseInt(id), {
      name,
    });

    return res.status(200).json({
      ticketType,
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.ticketTypeService.delete(parseInt(id));

    return res.status(200).json({
      message: "Ticket type deleted successfully",
    });
  }

  public async getTicketsByDateRange(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { startDate, endDate } = req.body;

    const tickets = await this.ticketTypeService.getTicketsByDateRange(
      new Date(startDate),
      new Date(endDate)
    );

    return res.status(200).json({
      tickets: tickets,
    });
  }

  public async getTotalTickets(req: Request, res: Response): Promise<Response> {
    const total = await this.ticketService.getTotalTickets();
    return res.status(200).json({ total });
  }

  public async getTicketsByType(
    req: Request,
    res: Response
  ): Promise<Response> {
    const ticketsByType = await this.ticketService.getTicketsByType();
    return res.status(200).json({ ticketsByType });
  }

  public async getTicketsBySector(
    req: Request,
    res: Response
  ): Promise<Response<TicketTypeResponseDTO[]>> {
    const ticketsBySector = await this.ticketService.getTicketsBySector();
    return res.status(200).json({ ticketsBySector });
  }
}
