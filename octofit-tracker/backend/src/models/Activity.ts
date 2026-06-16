import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceMiles: { type: Number },
    caloriesBurned: { type: Number, required: true },
    points: { type: Number, required: true },
    loggedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);