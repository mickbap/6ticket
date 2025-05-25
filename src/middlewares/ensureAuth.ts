import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/auth/jwt';
import { findUserById } from '@/modules/users/user.service';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: string;
  };
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token not provided' });
    return;
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    res.status(401).json({ message: 'Token malformatted' });
    return;
  }

  const payload = verifyToken(token);

  if (!payload) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  // ⚠️ Como findUserById é async, o ideal é validar antes ou mockar um usuário por enquanto
  req.user = {
    id: payload.userId,
    role: payload.role,
  };

  next();
}
