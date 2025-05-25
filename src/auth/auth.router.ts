import { Router, Request, Response } from 'express';
import { registerUser, loginUser, registerSchema, loginSchema } from './auth.service';

const router = Router();

const registerHandler = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const user = await registerUser(validatedData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    if (error.message === 'User already exists with this email') {
      res.status(409).json({ message: error.message });
      return;
    }
    if (error.errors) {
      res.status(400).json({ message: 'Validation failed', errors: error.format() });
      return;
    }
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

router.post('/register', registerHandler);

const loginHandler = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await loginUser(validatedData);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === 'Invalid email or password') {
      res.status(401).json({ message: error.message });
      return;
    }
    if (error.errors) {
      res.status(400).json({ message: 'Validation failed', errors: error.format() });
      return;
    }
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

router.post('/login', loginHandler);


export default router;