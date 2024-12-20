import express from "express";
import cors from "cors";
import { errorMiddleware } from "../middlewares/errorMiddleware";
import { userRouter } from "../modules/user/user.route";
import { authRouter } from "../modules/auth/authenticate.route";
import { sectorRouter } from "../modules/sector/sector.route";
import { ticketRouter } from "../modules/ticket/ticket.route";
import { setupSwagger } from "./swagger/swagger";
import { ticketTypeRouter } from "../modules/ticketType/ticketType.route";
import { frontURL } from "./vars";

export const app = express();

app.use(express.json());

app.use(
  cors({
    origin: frontURL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

setupSwagger(app);

app.use(authRouter);
app.use(userRouter);
app.use(sectorRouter);
app.use(ticketRouter);
app.use(ticketTypeRouter);

app.use(errorMiddleware);