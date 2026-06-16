import { connectDatabase, disconnectDatabase } from '../config/database';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const seed = async () => {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = await Team.insertMany([
    { name: 'Mergington Trailblazers', mascot: 'Lightning', color: '#0d6efd', memberCount: 2, totalPoints: 945 },
    { name: 'OctoFit Sprinters', mascot: 'Comet', color: '#20c997', memberCount: 2, totalPoints: 890 },
    { name: 'Gym Class Heroes', mascot: 'Phoenix', color: '#fd7e14', memberCount: 1, totalPoints: 430 },
  ]);

  const users = await User.insertMany([
    { username: 'mrivera', firstName: 'Maya', lastName: 'Rivera', email: 'maya.rivera@mergington.edu', grade: 10, points: 510, team: teams[0]._id },
    { username: 'jchen', firstName: 'Jordan', lastName: 'Chen', email: 'jordan.chen@mergington.edu', grade: 11, points: 435, team: teams[0]._id },
    { username: 'aparker', firstName: 'Avery', lastName: 'Parker', email: 'avery.parker@mergington.edu', grade: 9, points: 470, team: teams[1]._id },
    { username: 'skhan', firstName: 'Samira', lastName: 'Khan', email: 'samira.khan@mergington.edu', grade: 12, points: 420, team: teams[1]._id },
    { username: 'lbrooks', firstName: 'Leo', lastName: 'Brooks', email: 'leo.brooks@mergington.edu', grade: 10, points: 430, team: teams[2]._id },
  ]);

  await Activity.insertMany([
    { user: users[0]._id, type: 'Running', durationMinutes: 35, distanceMiles: 3.2, caloriesBurned: 310, points: 110, loggedAt: new Date('2026-06-10T15:30:00Z') },
    { user: users[1]._id, type: 'Cycling', durationMinutes: 45, distanceMiles: 8.5, caloriesBurned: 360, points: 125, loggedAt: new Date('2026-06-11T20:00:00Z') },
    { user: users[2]._id, type: 'Strength Training', durationMinutes: 40, caloriesBurned: 240, points: 95, loggedAt: new Date('2026-06-12T18:15:00Z') },
    { user: users[3]._id, type: 'Walking', durationMinutes: 50, distanceMiles: 2.6, caloriesBurned: 210, points: 80, loggedAt: new Date('2026-06-13T13:45:00Z') },
    { user: users[4]._id, type: 'Yoga', durationMinutes: 30, caloriesBurned: 140, points: 70, loggedAt: new Date('2026-06-14T16:20:00Z') },
  ]);

  await Leaderboard.insertMany([
    { user: users[0]._id, rank: 1, points: 510, weeklyMinutes: 145, badge: 'Endurance Captain' },
    { user: users[2]._id, rank: 2, points: 470, weeklyMinutes: 130, badge: 'Power Builder' },
    { user: users[1]._id, rank: 3, points: 435, weeklyMinutes: 120, badge: 'Distance Driver' },
    { user: users[4]._id, rank: 4, points: 430, weeklyMinutes: 115, badge: 'Consistency Star' },
    { user: users[3]._id, rank: 5, points: 420, weeklyMinutes: 110, badge: 'Wellness Leader' },
  ]);

  await Workout.insertMany([
    { title: 'After-School 5K Builder', category: 'Cardio', difficulty: 'Intermediate', durationMinutes: 35, targetGrades: [9, 10, 11, 12], instructions: 'Alternate five minutes of steady jogging with two minutes of brisk walking.' },
    { title: 'Dorm Room Strength Circuit', category: 'Strength', difficulty: 'Beginner', durationMinutes: 25, targetGrades: [9, 10], instructions: 'Complete three rounds of squats, push-ups, lunges, and plank holds.' },
    { title: 'Active Recovery Flow', category: 'Mobility', difficulty: 'Beginner', durationMinutes: 20, targetGrades: [9, 10, 11, 12], instructions: 'Move through gentle stretches for hips, shoulders, hamstrings, and back.' },
    { title: 'Varsity Conditioning Ladder', category: 'Conditioning', difficulty: 'Advanced', durationMinutes: 45, targetGrades: [11, 12], instructions: 'Run sprint ladders with bodyweight exercises between each interval.' },
  ]);

  console.log('Inserted sample users, teams, activities, leaderboard entries, and workouts.');
  await disconnectDatabase();
};

seed().catch(async (error) => {
  console.error(error);
  await disconnectDatabase();
  process.exit(1);
});