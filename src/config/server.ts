import express from 'express';
import {errorMiddleware} from "../middlewares/errorMiddleware";
import {userRouter} from "../modules/user/user.route";
import {authRouter} from "../modules/auth/authenticate.route";
import {sectorRouter} from "../modules/sector/sector.route";

export const app = express();

app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(sectorRouter);

app.use(errorMiddleware);