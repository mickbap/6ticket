import { prisma } from '@/database/prisma';
import { User, Role } from './user.model';
import bcrypt from 'bcryptjs';

export async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const hashedPassword = await bcrypt.hash(data.password, 8);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}