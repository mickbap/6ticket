import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares/ensureAuth';
import { createTicket } from './ticket.service';
import { TicketSchema } from './ticket.schema';

export const createTicketHandler = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const ticketData = TicketSchema.parse(req.body);
    const userId = req.user.id;
    const ticket = await createTicket(ticketData, userId);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: (error as any).message || 'Erro ao criar chamado' });
  }
};
