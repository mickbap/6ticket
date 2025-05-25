import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/auth/jwt';
import { findUserById } from '@/modules/users/user.service';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export async function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Token malformatted' });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const user = await findUserById(payload.userId);

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  req.user = {
    id: user.id,
    role: user.role,
  };

  return next();
}