import {CreateTicketDTO, ITicketService, TicketResponseDTO, UpdateTicketDTO} from "./ticket.interface";
import {TicketRepository} from "./ticket.repository";
import {UserRepository} from "../user/user.repository";
import {HttpException} from "../../errors/http.exception";
import {SectorRepository} from "../sector/sector.repository";

export class TicketService implements ITicketService {
    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly userRepository: UserRepository,
        private readonly sectorRepository: SectorRepository
    ) {
    }

    public async create(ticket: CreateTicketDTO): Promise<TicketResponseDTO> {
        const checkIfUserExist = await this.userRepository.findById(ticket.userId);
        if (!checkIfUserExist) {
            throw new HttpException(400, "user id not exists");
        }

        const { id, fullName, sectorId } = checkIfUserExist;
        const checkIfSectorExist = await this.sectorRepository.findById(sectorId as number);
        if (!checkIfSectorExist) {
            throw new HttpException(400, "sector id not exists");
        }

        return await this.ticketRepository.create({
            requester: fullName.toLowerCase(),
            problemDescription: ticket.problemDescription.toLowerCase(),
            userId: id,
            sectorId: sectorId as number,
        });
    }

    public async findAll(): Promise<TicketResponseDTO[]> {
        return await this.ticketRepository.findAll();
    }

    public async findById(id: number): Promise<TicketResponseDTO> {
        const ticket = await this.ticketRepository.findById(id);

        if (!ticket) {
            throw new HttpException(404, "ticket not found");
        }

        return ticket;
    }

    public async delete(id: number): Promise<void> {
        const ticket = await this.ticketRepository.findById(id);

        if (!ticket) {
            throw new HttpException(404, "ticket not found");
        }

        await this.ticketRepository.delete(id);
    }

    public async update(id: number, data: UpdateTicketDTO): Promise<TicketResponseDTO> {
        const ticket = await this.ticketRepository.findById(id);

        if (!ticket) {
            throw new HttpException(404, "ticket not found");
        }

        return await this.ticketRepository.update(id, data);
    }
}