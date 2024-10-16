import {Router} from "express";
import {SectorRepository} from "./sector.repository";
import {SectorService} from "./sector.service";
import {SectorController} from "./sector.controller";
import {authenticated} from "../../middlewares/authMiddlware";
import {canRequest} from "../../middlewares/permissionsMiddleware";

export const sectorRouter = Router();

const sectorRepository = new SectorRepository();
const sectorService = new SectorService(sectorRepository);
const sectorController = new SectorController(sectorService);

sectorRouter.post("/sectors",
    authenticated,
    canRequest("create:sector"),
    sectorController.create.bind(sectorController)
);
sectorRouter.get("/sectors",
    authenticated,
    canRequest("read:sector:list"),
    sectorController.findAll.bind(sectorController)
);
sectorRouter.get("/sectors/:id",
    authenticated,
    canRequest("read:sector"),
    sectorController.findById.bind(sectorController)
);
sectorRouter.put("/sectors/update/:id",
    authenticated,
    canRequest("update:sector"),
    sectorController.update.bind(sectorController)
);
sectorRouter.put("/sectors/delete/:id",
    authenticated,
    canRequest("delete:sector"),
    sectorController.delete.bind(sectorController)
);