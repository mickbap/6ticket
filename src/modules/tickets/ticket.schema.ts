import { z } from 'zod';

export const TicketSchema = z.object({
  title: z.string().nonempty('Título é obrigatório'),
  description: z.string().nonempty('Descrição é obrigatória'),
  priority: z.enum(['BAIXA', 'MÉDIA', 'ALTA', 'URGENTE']),
  origin: z.enum(['INTERNAL', 'EXTERNAL']),
});

export type Ticket = z.infer<typeof TicketSchema>;