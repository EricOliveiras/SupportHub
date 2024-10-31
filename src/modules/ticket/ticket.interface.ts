export interface CreateTicketDTO {
    requester?: string;
    problemDescription: string;
    userId: number;
    sectorId?: number;
}

export interface UpdateTicketDTO {
    requester?: string;
    problemDescription?: string;
    notes?: string;
    finished?: boolean;
}

export interface TicketResponseDTO {
    id: number;
    requester: string;
    problemDescription: string;
    finished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITicketService {
    create(data: CreateTicketDTO): Promise<TicketResponseDTO>;

    findAll(): Promise<TicketResponseDTO[]>;

    findById(id: number): Promise<TicketResponseDTO>;

    update(id: number, data: UpdateTicketDTO): Promise<TicketResponseDTO>;

    delete(id: number): Promise<void>;
}