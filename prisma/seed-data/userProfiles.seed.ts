import { Prisma } from '@prisma/client';

export const userProfiles: Prisma.UserProfileCreateInput[] = [
{
    id: 'profile1',
    user: { connect: { id: 'user1' } },
    age: 30,
    weight: 75,
    height: 183,
    hasHyperlaxity: false,
    experienceLevel: 'INTERMEDIATE',
    trainingGoals: ['STRENGTH', 'ENDURANCE'],
    availableDays: 6,
    sessionDuration: 60,
    currentPhase: 1,
    currentWeek: 1,
    programStartDate: new Date(),
  },
]