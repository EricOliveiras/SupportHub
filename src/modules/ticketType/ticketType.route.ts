import { Router } from "express";
import { TicketTypeRepository } from "./ticketType.repository";
import { TicketTypeService } from "./ticketType.service";
import { TicketTypeController } from "./ticketType.controller";
import { authenticated } from "../../middlewares/authMiddlware";
import { TicketRepository } from "../ticket/ticket.repository";
import { TicketService } from "../ticket/ticket.service";
import { UserRepository } from "../user/user.repository";
import { SectorRepository } from "../sector/sector.repository";

export const ticketTypeRouter = Router();

const ticketTypeRepository = new TicketTypeRepository();
const ticketRepository = new TicketRepository();
const ticketTypeService = new TicketTypeService(ticketTypeRepository);
const ticketService = new TicketService(
  ticketRepository,
  new UserRepository(),
  new SectorRepository()
);
const ticketTypeController = new TicketTypeController(
  ticketTypeService,
  ticketService
);

ticketTypeRouter.post(
  "/ticket-types",
  authenticated,
  ticketTypeController.create.bind(ticketTypeController)
);
ticketTypeRouter.get(
  "/ticket-types",
  authenticated,
  ticketTypeController.findAll.bind(ticketTypeController)
);
// ticketTypeRouter.get(
//   "/ticket-types/:id",
//   authenticated,
//   ticketTypeController.findById.bind(ticketTypeController)
// );
ticketTypeRouter.put(
  "/ticket-types/update/:id",
  authenticated,
  ticketTypeController.update.bind(ticketTypeController)
);
ticketTypeRouter.delete(
  "/ticket-types/delete/:id",
  authenticated,
  ticketTypeController.delete.bind(ticketTypeController)
);
ticketTypeRouter.post(
  "/ticket-types/date-range",
  authenticated,
  ticketTypeController.getTicketsByDateRange.bind(ticketTypeController)
);
ticketTypeRouter.get(
  "/ticket-types/total",
  authenticated,
  ticketTypeController.getTotalTickets.bind(ticketTypeController)
);
ticketTypeRouter.get(
  "/ticket-types/by-type",
  authenticated,
  ticketTypeController.getTicketsByType.bind(ticketTypeController)
);
ticketTypeRouter.get(
  "/ticket-types/by-sector",
  authenticated,
  ticketTypeController.getTicketsBySector.bind(ticketTypeController)
);
