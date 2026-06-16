import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate('user').sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

export default leaderboardRouter;