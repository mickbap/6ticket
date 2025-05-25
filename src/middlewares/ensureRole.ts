import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './ensureAuth';
import { Role } from '@/modules/users/user.model';

export function ensureRole(roles: Role[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!roles.includes(req.user.role as Role)) {
      return res.status(403).json({ message: 'User does not have permission' });
    }

    return next();
  };
}