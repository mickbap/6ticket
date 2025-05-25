import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from './ensureAuth';

export function ensureRole(allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      return;
    }
    next();
  };
}
