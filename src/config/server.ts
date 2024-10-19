import express from 'express';
import cors from 'cors';
import {errorMiddleware} from "../middlewares/errorMiddleware";
import {userRouter} from "../modules/user/user.route";
import {authRouter} from "../modules/auth/authenticate.route";
import {sectorRouter} from "../modules/sector/sector.route";
import {ticketRouter} from "../modules/ticket/ticket.route";
import {setupSwagger} from "./swagger/swagger";

export const app = express();

app.use(express.json());

app.use(cors());

setupSwagger(app);

app.use(authRouter);
app.use(userRouter);
app.use(sectorRouter);
app.use(ticketRouter);

app.use(errorMiddleware);