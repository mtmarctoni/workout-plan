import { users } from './users.seed.js';
import { userProfiles } from './userProfiles.seed.js';
import { exercises } from './exercises.seed.js';
import { phase1WorkoutPlans } from './workoutPlans/phase1.seed.js';
import { phase2WorkoutPlans } from './workoutPlans/phase2.seed.js';
import { phase3WorkoutPlans } from './workoutPlans/phase3.seed.js';
import { phase4WorkoutPlans } from './workoutPlans/phase4.seed.js';

export const seedData = {
  users,
  userProfiles,
  exercises,
  workoutPlans: [
    ...phase1WorkoutPlans,
    ...phase2WorkoutPlans,
    ...phase3WorkoutPlans,
    ...phase4WorkoutPlans,
  ],
};
