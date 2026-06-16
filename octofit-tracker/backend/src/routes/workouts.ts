import { Router } from 'express';
import { Workout } from '../models/Workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  const workouts = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();
  res.json(workouts);
});

export default workoutsRouter;