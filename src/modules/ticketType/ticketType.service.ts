import {
  ITicketTypeService,
  CreateTicketTypeDTO,
  UpdateTicketTypeDTO,
  TicketTypeResponseDTO,
} from "./ticketType.interface";
import { TicketTypeRepository } from "./ticketType.repository";
import { HttpException } from "../../errors/http.exception";
import { TicketResponseDTO } from "../ticket/ticket.interface";

export class TicketTypeService implements ITicketTypeService {
  constructor(private readonly ticketTypeRepository: TicketTypeRepository) {}

  public async create(
    ticketType: CreateTicketTypeDTO
  ): Promise<TicketTypeResponseDTO> {
    const existingTicketType = await this.ticketTypeRepository.findByName(
      ticketType.name
    );
    if (existingTicketType) {
      throw new HttpException(400, "ticket type already exists");
    }

    return await this.ticketTypeRepository.create(ticketType);
  }

  public async findAll(): Promise<TicketTypeResponseDTO[]> {
    return await this.ticketTypeRepository.findAll();
  }

  public async findById(id: number): Promise<TicketTypeResponseDTO> {
    const ticketType = await this.ticketTypeRepository.findById(id);
    if (!ticketType) {
      throw new HttpException(404, "ticket type not found");
    }
    return ticketType;
  }

  public async update(
    id: number,
    data: UpdateTicketTypeDTO
  ): Promise<TicketTypeResponseDTO> {
    const ticketType = await this.ticketTypeRepository.findById(id);
    if (!ticketType) {
      throw new HttpException(404, "ticket type not found");
    }

    return await this.ticketTypeRepository.update(id, data);
  }

  public async delete(id: number): Promise<void> {
    const ticketType = await this.ticketTypeRepository.findById(id);
    if (!ticketType) {
      throw new HttpException(404, "ticket type not found");
    }
    await this.ticketTypeRepository.delete(id);
  }

  public async getTicketsByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<TicketResponseDTO[]> {
    return await this.ticketTypeRepository.findTicketsByDateRange(
      startDate,
      endDate
    );
  }
}
