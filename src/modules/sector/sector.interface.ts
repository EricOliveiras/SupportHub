export interface CreateSectorDTO {
    name: string;
}

export interface UpdateSectorDTO extends CreateSectorDTO {
}

export interface SectorResponseDTO {
    id: number;
    name: string;
}

export interface ISectorService {
    create(data: CreateSectorDTO): Promise<SectorResponseDTO>;

    findAll(): Promise<SectorResponseDTO[]>;

    findById(id: number): Promise<SectorResponseDTO>;

    update(id: number, data: UpdateSectorDTO): Promise<SectorResponseDTO>;

    delete(id: number): Promise<void>;
}