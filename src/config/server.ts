import express from 'express';
import {errorMiddleware} from "../middlewares/errorMiddleware";
import {userRouter} from "../modules/user/user.route";

export const app = express();

app.use(express.json());

app.use(userRouter);

app.use(errorMiddleware);