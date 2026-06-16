import { Router } from 'express';
import { User } from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  const users = await User.find().populate('team').sort({ lastName: 1 }).lean();
  res.json(users);
});

export default usersRouter;