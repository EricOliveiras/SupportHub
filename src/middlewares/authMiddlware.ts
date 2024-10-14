import { Response, NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';

import { jwtSecret } from '../config/vars';
import { HttpException } from '../errors/http.exception';

export const authenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new HttpException(400, 'Missing auth header');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = <{ userId: number, permissions: string[] }>verify(token, jwtSecret);

        req.user = {
            userId: payload.userId,
            permissions: payload.permissions
        };

        return next();
    } catch {
        throw new HttpException(401, 'Invalid token');
    }
};