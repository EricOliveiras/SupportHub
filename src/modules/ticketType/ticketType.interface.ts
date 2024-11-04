export interface TicketTypeDTO {
  name: string;
}

export interface CreateTicketTypeDTO extends TicketTypeDTO {}

export interface UpdateTicketTypeDTO extends TicketTypeDTO {}

export interface TicketTypeResponseDTO extends TicketTypeDTO {
  id: number;
}

interface TicketBySectorResponse {
  sectorId: number;
  name: string;
  count: number;
}

export interface ITicketTypeService {
  create(ticketType: CreateTicketTypeDTO): Promise<TicketTypeResponseDTO>;
  findAll(): Promise<TicketTypeResponseDTO[]>;
  findById(id: number): Promise<TicketTypeResponseDTO>;
  update(id: number, data: UpdateTicketTypeDTO): Promise<TicketTypeResponseDTO>;
  delete(id: number): Promise<void>;
}
