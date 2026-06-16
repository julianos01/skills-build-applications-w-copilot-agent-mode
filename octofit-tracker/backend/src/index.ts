import express from 'express';
import mongoose from 'mongoose';
import { apiBaseUrl, PORT } from './config/apiUrl';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const app = express();
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB at 27017');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  app.listen(PORT, () => {
    console.log(`Backend running on ${apiBaseUrl}`);
  });
};

void start();