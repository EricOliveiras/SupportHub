import {Router} from "express";
import {TicketRepository} from "./ticket.repository";
import {TicketService} from "./ticket.service";
import {UserRepository} from "../user/user.repository";
import {TicketController} from "./ticket.controller";
import {authenticated} from "../../middlewares/authMiddlware";
import {canRequest} from "../../middlewares/permissionsMiddleware";
import {UserService} from "../user/user.service";
import {SectorRepository} from "../sector/sector.repository";

export const ticketRouter = Router();

const ticketRepository = new TicketRepository();
const userRepository = new UserRepository();
const sectorRepository = new SectorRepository();
const ticketService = new TicketService(ticketRepository, userRepository, sectorRepository);
const ticketController = new TicketController(ticketService);

ticketRouter.post("/tickets",
    authenticated,
    canRequest("create:ticket"),
    ticketController.create.bind(ticketController)
);
ticketRouter.get("/tickets",
    authenticated,
    canRequest("read:ticket:list"),
    ticketController.findAll.bind(ticketController)
);
ticketRouter.get("/tickets/:id",
    authenticated,
    canRequest("read:ticket"),
    ticketController.findById.bind(ticketController)
);
ticketRouter.put("/tickets/update/:id",
    authenticated,
    canRequest("update:ticket"),
    ticketController.update.bind(ticketController)
);
ticketRouter.delete("/tickets/delete/:id",
    authenticated,
    canRequest("delete:ticket"),
    ticketController.delete.bind(ticketController)
);