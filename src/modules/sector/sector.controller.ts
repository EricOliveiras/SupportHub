import {SectorService} from "./sector.service";
import {Request, Response} from "express";
import {CreateSectorDTO} from "./sector.interface";

export class SectorController {
    constructor(private readonly sectorService: SectorService) {
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const {name}: CreateSectorDTO = req.body;

        const createdSector = await this.sectorService.create({
            name: name
        });

        return res.status(201).json({
            message: "sector successfully created",
            sector: createdSector
        });
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        const sectors = await this.sectorService.findAll();
        return res.status(200).json({
            sectors: sectors
        });
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const sector = await this.sectorService.findById(parseInt(id));
        return res.status(200).json({
            sector: sector
        });
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const {name} = req.body;
        const sector = await this.sectorService.update(parseInt(id), {name});
        return res.status(200).json({
            sector: sector
        });
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        await this.sectorService.delete(parseInt(id));
        return res.status(200).json({
            message: "sector successfully deleted"
        });
    }
}