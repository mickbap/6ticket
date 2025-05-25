import jwt from 'jsonwebtoken';
import { env } from '@/config/env';

interface JwtPayload {
  userId: string;
  role: string;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}