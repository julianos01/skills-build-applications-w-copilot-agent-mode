import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    color: { type: String, required: true },
    memberCount: { type: Number, required: true, default: 0 },
    totalPoints: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);