import { Router } from 'express';
import { Activity } from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').sort({ loggedAt: -1 }).lean();
  res.json(activities);
});

export default activitiesRouter;