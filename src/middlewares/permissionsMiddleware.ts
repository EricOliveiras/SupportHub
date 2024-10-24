import { HttpException } from '../errors/http.exception';
import { Request, Response, NextFunction } from 'express';

const availableFeatures = [
    'create:user',
    'read:user',
    'read:user:list',
    'read:me',
    'update:user',
    'delete:user',
    'create:ticket',
    'read:ticket',
    'read:ticket:list',
    'ticket:assignedTo',
    'update:ticket',
    'delete:ticket',
    'create:sector',
    'read:sector',
    'read:sector:list',
    'update:sector',
    'delete:sector'
] as const;

type AvailableFeatures = typeof availableFeatures[number];

/**
 * Middleware that only allow users that have the given permissions to access the next function:
 *
 * @example
 * // You can pass one permission
 * router.delete('/user', canRequest('delete:user'), deleteUser)
 *
 * // You can pass many permissions, the user must have all of them
 * router.put('/user', canRequest('read:account', 'update:account'), updateAccount)
 *
 * @param permissions
 */

export const canRequest = (...permissions: AvailableFeatures[]) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const user = request.user;

        if (!user) {
            throw new Error(
                'You must use the "ensureAuthenticated" Middleware before using "canRequest"',
            );
        }

        permissions.forEach((permission) => {
            if (!user?.permissions.includes(permission)) {
                throw new HttpException(
                    403,
                    `You don't have permission to ${permission}`,
                );
            }
        });

        return next();
    };
};