import express from 'express';
import cors from 'cors';
import { env } from '@/config/env';
import authRoutes from '@/auth/auth.router';
import { ensureAuth, AuthenticatedRequest } from '@/middlewares/ensureAuth';
import { ensureRole } from '@/middlewares/ensureRole';
import { Roles } from '@/modules/users/user.model';
import { asyncHandler } from '@/utils/asyncHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

// Example protected route
app.get('/protected', ensureAuth, (req: AuthenticatedRequest, res: express.Response) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Example admin-only route
app.get(
  '/admin',
  ensureAuth,
  ensureRole([Roles.ADMIN]),
  (req: AuthenticatedRequest, res) => {
    res.json({ message: 'This is an admin-only route', user: req.user });
  }
);

app.get(
  '/technician-area',
  ensureAuth,
  ensureRole([Roles.ADMIN, Roles.TECHNICIAN]),
  (req: AuthenticatedRequest, res) => {
    res.json({ message: 'This is for technicians and admins', user: req.user });
  }
);



app.get('/', (req, res) => {
  res.send('Hello from 6ticket API!');
});

const port = env.PORT;

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});