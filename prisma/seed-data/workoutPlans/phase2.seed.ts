import { Prisma } from '@prisma/client';

export const phase2WorkoutPlans: Prisma.WorkoutPlanCreateInput[] = [
{
    id: 'p2w1d1',
    user: { connect: { id: 'user1' } },
    name: 'Explosive Lower Body',
    description: 'Weighted depth jumps and lateral bounds for power',
    phase: 2,
    week: 1,
    day: 1,
    estimatedDuration: 60,
    difficulty: 'HIGH',
    focus: 'Lower Power',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex4' } }, orderIndex: 1, sets: 5, reps: '5', restSeconds: 120 },
        { exercise: { connect: { id: 'ex9' } }, orderIndex: 2, sets: 5, reps: '10/side', restSeconds: 90 },
      ],
    },
  },
  {
    id: 'p2w1d2',
    user: { connect: { id: 'user1' } },
    name: 'Advanced HIIT',
    description: 'Increase sprint volume and intensity',
    phase: 2,
    week: 1,
    day: 2,
    estimatedDuration: 45,
    difficulty: 'HIGH',
    focus: 'Endurance',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 12, reps: '40s sprint / 80s rest', restSeconds: 80 },
      ],
    },
  },
  {
    id: 'p2w1d3',
    user: { connect: { id: 'user1' } },
    name: 'Rotational Upper Power',
    description: 'Medicine ball throws and push-press for throwing power',
    phase: 2,
    week: 1,
    day: 3,
    estimatedDuration: 60,
    difficulty: 'MEDIUM',
    focus: 'Upper Power',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex1' } }, orderIndex: 1, sets: 5, reps: '8-10', restSeconds: 90 },
        { exercise: { connect: { id: 'ex6' } }, orderIndex: 2, sets: 5, reps: '8', restSeconds: 90 },
        { exercise: { connect: { id: 'ex11' } }, orderIndex: 3, sets: 4, reps: '10/side', restSeconds: 60 },
      ],
    },
  },
  {
    id: 'p2w1d4',
    user: { connect: { id: 'user1' } },
    name: 'Stability and Mobility',
    description: 'Focus on hip and shoulder stability',
    phase: 2,
    week: 1,
    day: 4,
    estimatedDuration: 45,
    difficulty: 'LOW',
    focus: 'Mobility',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex10' } }, orderIndex: 1, sets: 3, reps: '10/side', restSeconds: 30 },
        { exercise: { connect: { id: 'ex5' } }, orderIndex: 2, sets: 3, reps: '10/side', restSeconds: 90 },
      ],
    },
  },
  {
    id: 'p2w1d5',
    user: { connect: { id: 'user1' } },
    name: 'Agility and Core',
    description: 'Lateral bounds and core rotational planks',
    phase: 2,
    week: 1,
    day: 5,
    estimatedDuration: 60,
    difficulty: 'MEDIUM',
    focus: 'Agility',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex9' } }, orderIndex: 1, sets: 5, reps: '10/side', restSeconds: 90 },
        { exercise: { connect: { id: 'ex11' } }, orderIndex: 2, sets: 4, reps: '12/side', restSeconds: 60 },
      ],
    },
  },
  {
    id: 'p2w1d6',
    user: { connect: { id: 'user1' } },
    name: 'Long Intervals',
    description: 'Hill repeats and tempo runs for endurance',
    phase: 2,
    week: 1,
    day: 6,
    estimatedDuration: 60,
    difficulty: 'HIGH',
    focus: 'Endurance',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 1, reps: '60min hill tempo run', restSeconds: 0 },
      ],
    },
  },

  // ========================
// PHASE 2 - WEEK 2 (Power Development)
// ========================

// Day 1: Explosive Lower Body
{
  id: 'p2w2d1',
  user: { connect: { id: 'user1' } },
  name: 'Weighted Depth Jumps',
  description: 'Maximal lower body power development',
  phase: 2,
  week: 2,
  day: 1,
  estimatedDuration: 60,
  difficulty: 'HIGH',
  focus: 'Lower Power',
  exercises: {
    create: [
      { exercise: { connect: { id: 'ex4' } }, orderIndex: 1, sets: 6, reps: '6', restSeconds: 150 },
      { exercise: { connect: { id: 'ex9' } }, orderIndex: 2, sets: 6, reps: '12/side', restSeconds: 120 },
      { exercise: { connect: { id: 'ex5' } }, orderIndex: 3, sets: 4, reps: '12/side', restSeconds: 90 },
    ],
  },
},

// Day 2: Advanced HIIT
{
  id: 'p2w2d2',
  user: { connect: { id: 'user1' } },
  name: 'Hill Sprint Intervals',
  description: 'Maximal intensity hill repeats',
  phase: 2,
  week: 2,
  day: 2,
  estimatedDuration: 50,
  difficulty: 'HIGH',
  focus: 'Endurance',
  exercises: {
    create: [
      { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 14, reps: '45s sprint / 75s rest', restSeconds: 75 },
    ],
  },
},

// Day 3: Rotational Power
{
  id: 'p2w2d3',
  user: { connect: { id: 'user1' } },
  name: 'Explosive Throwing Power',
  description: 'Maximal rotational power for throwing',
  phase: 2,
  week: 2,
  day: 3,
  estimatedDuration: 65,
  difficulty: 'HIGH',
  focus: 'Upper Power',
  exercises: {
    create: [
      { exercise: { connect: { id: 'ex1' } }, orderIndex: 1, sets: 5, reps: '10-12', restSeconds: 120 },
      { exercise: { connect: { id: 'ex6' } }, orderIndex: 2, sets: 5, reps: '10', restSeconds: 120 },
      { exercise: { connect: { id: 'ex11' } }, orderIndex: 3, sets: 5, reps: '12/side', restSeconds: 90 },
    ],
  },
},

// Day 4: Stability Focus
{
  id: 'p2w2d4',
  user: { connect: { id: 'user1' } },
  name: 'Joint Stability Session',
  description: 'Prehab for hypermobile joints',
  phase: 2,
  week: 2,
  day: 4,
  estimatedDuration: 40,
  difficulty: 'LOW',
  focus: 'Mobility',
  exercises: {
    create: [
      { exercise: { connect: { id: 'ex10' } }, orderIndex: 1, sets: 3, reps: '12/side', restSeconds: 30 },
      { exercise: { connect: { id: 'ex5' } }, orderIndex: 2, sets: 4, reps: '12/side', restSeconds: 60 },
      { exercise: { connect: { id: 'ex12' } }, orderIndex: 3, sets: 1, reps: '1 flow', restSeconds: 0 },
    ],
  },
},

// Day 5: Agility & Reaction
{
  id: 'p2w2d5',
  user: { connect: { id: 'user1' } },
  name: 'Defensive Agility Drills',
  description: 'Sport-specific lateral movements',
  phase: 2,
  week: 2,
  day: 5,
  estimatedDuration: 60,
  difficulty: 'MEDIUM',
  focus: 'Agility',
  exercises: {
    create: [
      { exercise: { connect: { id: 'ex9' } }, orderIndex: 1, sets: 6, reps: '15/side', restSeconds: 90 },
      { exercise: { connect: { id: 'ex11' } }, orderIndex: 2, sets: 5, reps: '15/side', restSeconds: 60 },
      { exercise: { connect: { id: 'ex4' } }, orderIndex: 3, sets: 4, reps: '8', restSeconds: 120 },
    ],
  },
},

// Day 6: Power Endurance
{
  id: 'p2w2d6',
  user: { connect: { id: 'user1' } },
  name: 'Mixed Intervals',
  description: 'Combination of sprints and tempo runs',
  phase: 2,
  week: 2,
  day: 6,
  estimatedDuration: 70,
  difficulty: 'HIGH',
  focus: 'Endurance',
  exercises: {
    create: [
      { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 1, reps: '30min hill repeats + 20min tempo', restSeconds: 0 },
    ],
  }
}
];