import { Router } from 'express';
import { Team } from '../models/Team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  const teams = await Team.find().sort({ totalPoints: -1 }).lean();
  res.json(teams);
});

export default teamsRouter;