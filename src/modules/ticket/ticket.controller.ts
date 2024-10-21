import {Request, Response} from "express";
import {TicketService} from "./ticket.service";
import {CreateTicketDTO, UpdateTicketDTO} from "./ticket.interface";

export class TicketController {
    constructor(private readonly ticketService: TicketService) {
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const userId = req.user?.userId as number;
        const {problemDescription} = req.body;
        const ticket = await this.ticketService.create({
            userId,
            problemDescription,
        });

        return res.status(201).json({
            message: "ticket successfully created",
            ticket: ticket
        });
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        const tickets = await this.ticketService.findAll();
        return res.status(200).json({
            tickets: tickets
        });
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const ticket = await this.ticketService.findById(parseInt(id));
        return res.status(200).json({
            ticket: ticket
        });
    }

    public async assignedTicket(req: Request, res: Response): Promise<Response> {
        const userId = req.user?.userId as number;
        const {id} = req.params;
        const ticket = await this.ticketService.assignedTicket(userId, parseInt(id));
        return res.status(200).json({
            ticket: ticket
        });
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const {problemDescription}: UpdateTicketDTO = req.body;
        const ticket = await this.ticketService.update(
            parseInt(id),
            {problemDescription}
        );
        return res.status(200).json({
            ticket: ticket
        });
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        await this.ticketService.delete(parseInt(id));
        return res.status(200).json({
            message: "ticket deleted successfully",
        })
    }
}