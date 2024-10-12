import { HttpException } from '../errors/http.exception';
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    return res.status(err.status).send({message: err.message});
};