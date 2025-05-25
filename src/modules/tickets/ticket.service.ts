import { PrismaClient } from '@prisma/client';
import { Ticket } from './ticket.schema';

const prisma = new PrismaClient();

export const createTicket = async (ticketData: Ticket, userId: string) => {
  return await prisma.ticket.create({
    data: {
      ...ticketData,
      createdById: userId,
    },
  });
};