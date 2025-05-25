import { createUser, findUserByEmail } from '@/modules/users/user.service';
import { User, Role } from '@/modules/users/user.model';
import bcrypt from 'bcryptjs';
import { generateToken } from './jwt';
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'TECHNICIAN']).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export async function registerUser(input: RegisterInput): Promise<User> {
  const existingUser = await findUserByEmail(input.email);
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  return createUser({
    name: input.name,
    email: input.email,
    password: input.password,
    role: input.role || 'TECHNICIAN',
  });
}

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export async function loginUser(input: LoginInput): Promise<{ user: Omit<User, 'password'>; token: string }> {
  const user = await findUserByEmail(input.email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken({ userId: user.id, role: user.role });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}