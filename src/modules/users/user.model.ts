import { User as PrismaUser, Role as PrismaRole } from '@prisma/client';

export type User = PrismaUser;
export type Role = PrismaRole;

export const Roles: Record<PrismaRole, PrismaRole> = {
  ADMIN: 'ADMIN',
  TECHNICIAN: 'TECHNICIAN',
};