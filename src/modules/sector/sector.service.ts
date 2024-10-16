import {CreateSectorDTO, ISectorService, SectorResponseDTO, UpdateSectorDTO} from "./sector.interface";
import {SectorRepository} from "./sector.repository";
import {HttpException} from "../../errors/http.exception";

export class SectorService implements ISectorService {
    constructor(private readonly sectorRepository: SectorRepository) {
    }

    public async create(data: CreateSectorDTO): Promise<SectorResponseDTO> {
        const checkIfSectorExist = await this.sectorRepository.findByName(data.name.toUpperCase());

        if (checkIfSectorExist) {
            throw new HttpException(400, "sector already exists");
        }

        return await this.sectorRepository.create({
            name: data.name.toUpperCase()
        })
    }

    public async findAll(): Promise<SectorResponseDTO[]> {
        return await this.sectorRepository.findAll();
    }

    public async findById(id: number): Promise<SectorResponseDTO> {
        const sector = await this.sectorRepository.findById(id);

        if (!sector) {
            throw new HttpException(404, "sector not found");
        }

        return sector;
    }

    public async update(id: number, data: UpdateSectorDTO): Promise<SectorResponseDTO> {
        const checkIfSectorExist = await this.sectorRepository.findById(id);

        if (!checkIfSectorExist) {
            throw new HttpException(404, "sector not found");
        }

        const existingSector = await this.sectorRepository.findByName(data.name.toUpperCase());
        if (existingSector && existingSector.id !== id) {
            throw new HttpException(409, "sector name already in use");
        }

        return await this.sectorRepository.update(id, {
            name: data.name.toUpperCase()
        });
    }

    public async delete(id: number): Promise<void> {
        const checkIfSectorExist = await this.sectorRepository.findById(id);

        if (!checkIfSectorExist) {
            throw new HttpException(404, "sector not found");
        }

        await this.sectorRepository.delete(id);
    }
}