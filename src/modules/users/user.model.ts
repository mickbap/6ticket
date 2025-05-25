import { User as PrismaUser } from '@prisma/client';

export type User = PrismaUser;

export type Role = 'ADMIN' | 'TECHNICIAN';

export const Roles: Record<Role, Role> = {
  ADMIN: 'ADMIN',
  TECHNICIAN: 'TECHNICIAN',
};
