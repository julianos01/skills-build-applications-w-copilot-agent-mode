import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB at 27017');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
};

void start();