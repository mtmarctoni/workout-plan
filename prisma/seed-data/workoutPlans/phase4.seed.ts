import { Prisma } from '@prisma/client';

export const phase4WorkoutPlans: Prisma.WorkoutPlanCreateInput[] = [
  // Day 1: Max Power & Speed
  {
    id: 'p4w1d1',
    user: { connect: { id: 'user1' } },
    name: 'Max Power & Speed',
    description: 'Very explosive plyometrics, sprints, and bounds for peak power.',
    phase: 4,
    week: 1,
    day: 1,
    estimatedDuration: 55,
    difficulty: 'HIGH',
    focus: 'Max Power & Speed',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex4' } }, orderIndex: 1, sets: 4, reps: '5', restSeconds: 150 },
        { exercise: { connect: { id: 'ex9' } }, orderIndex: 2, sets: 4, reps: '10/side', restSeconds: 120 },
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 3, sets: 6, reps: '20s sprint / 60s rest', restSeconds: 60 },
      ],
    },
  },
  // Day 2: Peak HIIT & Agility
  {
    id: 'p4w1d2',
    user: { connect: { id: 'user1' } },
    name: 'Peak HIIT & Agility',
    description: 'Short, intense intervals and reaction drills for game readiness.',
    phase: 4,
    week: 1,
    day: 2,
    estimatedDuration: 45,
    difficulty: 'HIGH',
    focus: 'HIIT & Agility',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 8, reps: '30s shuttle / 40s rest', restSeconds: 40 },
        { exercise: { connect: { id: 'ex9' } }, orderIndex: 2, sets: 4, reps: '12/side', restSeconds: 90 },
      ],
    },
  },
  // Day 3: Max Throwing & Core Power
  {
    id: 'p4w1d3',
    user: { connect: { id: 'user1' } },
    name: 'Max Throwing & Core Power',
    description: 'Heavy medicine ball throws, band push-press, plyometric push-ups.',
    phase: 4,
    week: 1,
    day: 3,
    estimatedDuration: 50,
    difficulty: 'HIGH',
    focus: 'Throwing & Core Power',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex1' } }, orderIndex: 1, sets: 4, reps: '8', restSeconds: 120 },
        { exercise: { connect: { id: 'ex6' } }, orderIndex: 2, sets: 4, reps: '8', restSeconds: 90 },
        { exercise: { connect: { id: 'ex11' } }, orderIndex: 3, sets: 4, reps: '12/side', restSeconds: 60 },
      ],
    },
  },
  // Day 4: Mobility & Active Recovery
  {
    id: 'p4w1d4',
    user: { connect: { id: 'user1' } },
    name: 'Mobility & Active Recovery',
    description: 'Yoga, stretching, and joint stability for recovery and readiness.',
    phase: 4,
    week: 1,
    day: 4,
    estimatedDuration: 35,
    difficulty: 'LOW',
    focus: 'Mobility & Recovery',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex10' } }, orderIndex: 1, sets: 2, reps: '10/side', restSeconds: 30 },
        { exercise: { connect: { id: 'ex12' } }, orderIndex: 2, sets: 1, reps: '1 flow', restSeconds: 0 },
      ],
    },
  },
  // Day 5: Game Simulation Circuit
  {
    id: 'p4w1d5',
    user: { connect: { id: 'user1' } },
    name: 'Game Simulation Circuit',
    description: 'Circuit: sprints, jumps, throws, and agility to mimic match demands.',
    phase: 4,
    week: 1,
    day: 5,
    estimatedDuration: 60,
    difficulty: 'HIGH',
    focus: 'Game Simulation',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 4, reps: '30s sprint / 60s rest', restSeconds: 60 },
        { exercise: { connect: { id: 'ex4' } }, orderIndex: 2, sets: 4, reps: '6', restSeconds: 120 },
        { exercise: { connect: { id: 'ex1' } }, orderIndex: 3, sets: 4, reps: '8', restSeconds: 90 },
        { exercise: { connect: { id: 'ex9' } }, orderIndex: 4, sets: 4, reps: '10/side', restSeconds: 90 },
      ],
    },
  },
  // Day 6: Maintenance Endurance
  {
    id: 'p4w1d6',
    user: { connect: { id: 'user1' } },
    name: 'Maintenance Endurance',
    description: 'Shorter, easy run or intervals to maintain aerobic base.',
    phase: 4,
    week: 1,
    day: 6,
    estimatedDuration: 35,
    difficulty: 'MEDIUM',
    focus: 'Maintenance Endurance',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 1, reps: '25min easy run', restSeconds: 0 },
      ],
    },
  },
  // Day 1: Max Power & Speed (progression)
  {
    id: 'p4w2d1',
    user: { connect: { id: 'user1' } },
    name: 'Max Power & Speed Progression',
    description: 'Maintain peak explosiveness with slightly reduced volume.',
    phase: 4,
    week: 2,
    day: 1,
    estimatedDuration: 50,
    difficulty: 'HIGH',
    focus: 'Max Power & Speed',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex4' } }, orderIndex: 1, sets: 3, reps: '5', restSeconds: 150 },
        { exercise: { connect: { id: 'ex9' } }, orderIndex: 2, sets: 3, reps: '10/side', restSeconds: 120 },
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 3, sets: 5, reps: '20s sprint / 60s rest', restSeconds: 60 },
      ],
    },
  },
  // Day 2: Peak HIIT & Agility (progression)
  {
    id: 'p4w2d2',
    user: { connect: { id: 'user1' } },
    name: 'Peak HIIT & Agility Progression',
    description: 'Short, intense intervals and reaction drills for game sharpness.',
    phase: 4,
    week: 2,
    day: 2,
    estimatedDuration: 40,
    difficulty: 'HIGH',
    focus: 'HIIT & Agility',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 7, reps: '30s shuttle / 40s rest', restSeconds: 40 },
        { exercise: { connect: { id: 'ex9' } }, orderIndex: 2, sets: 3, reps: '12/side', restSeconds: 90 },
      ],
    },
  },
  // Day 3: Max Throwing & Core Power (progression)
  {
    id: 'p4w2d3',
    user: { connect: { id: 'user1' } },
    name: 'Max Throwing & Core Power Progression',
    description: 'Maintain high intensity with slightly less volume.',
    phase: 4,
    week: 2,
    day: 3,
    estimatedDuration: 45,
    difficulty: 'HIGH',
    focus: 'Throwing & Core Power',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex1' } }, orderIndex: 1, sets: 3, reps: '8', restSeconds: 120 },
        { exercise: { connect: { id: 'ex6' } }, orderIndex: 2, sets: 3, reps: '8', restSeconds: 90 },
        { exercise: { connect: { id: 'ex11' } }, orderIndex: 3, sets: 3, reps: '12/side', restSeconds: 60 },
      ],
    },
  },
  // Day 4: Mobility & Active Recovery (progression)
  {
    id: 'p4w2d4',
    user: { connect: { id: 'user1' } },
    name: 'Mobility & Active Recovery Progression',
    description: 'Yoga, stretching, and joint stability for recovery and readiness.',
    phase: 4,
    week: 2,
    day: 4,
    estimatedDuration: 30,
    difficulty: 'LOW',
    focus: 'Mobility & Recovery',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex10' } }, orderIndex: 1, sets: 2, reps: '10/side', restSeconds: 30 },
        { exercise: { connect: { id: 'ex12' } }, orderIndex: 2, sets: 1, reps: '1 flow', restSeconds: 0 },
      ],
    },
  },
  // Day 5: Game Simulation Circuit (progression)
  {
    id: 'p4w2d5',
    user: { connect: { id: 'user1' } },
    name: 'Game Simulation Circuit Progression',
    description: 'Circuit: sprints, jumps, throws, and agility with slightly less volume.',
    phase: 4,
    week: 2,
    day: 5,
    estimatedDuration: 55,
    difficulty: 'HIGH',
    focus: 'Game Simulation',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 3, reps: '30s sprint / 60s rest', restSeconds: 60 },
        { exercise: { connect: { id: 'ex4' } }, orderIndex: 2, sets: 3, reps: '6', restSeconds: 120 },
        { exercise: { connect: { id: 'ex1' } }, orderIndex: 3, sets: 3, reps: '8', restSeconds: 90 },
        { exercise: { connect: { id: 'ex9' } }, orderIndex: 4, sets: 3, reps: '10/side', restSeconds: 90 },
      ],
    },
  },
  // Day 6: Maintenance Endurance (progression)
  {
    id: 'p4w2d6',
    user: { connect: { id: 'user1' } },
    name: 'Maintenance Endurance Progression',
    description: 'Short, easy run or intervals to maintain aerobic base.',
    phase: 4,
    week: 2,
    day: 6,
    estimatedDuration: 30,
    difficulty: 'MEDIUM',
    focus: 'Maintenance Endurance',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 1, reps: '20min easy run', restSeconds: 0 },
      ],
    },
  },
  // Day 1: Max Power & Speed (taper)
  {
    id: 'p4w3d1',
    user: { connect: { id: 'user1' } },
    name: 'Max Power & Speed Taper',
    description: 'Short, sharp plyometrics and sprints to stay explosive while reducing fatigue.',
    phase: 4,
    week: 3,
    day: 1,
    estimatedDuration: 40,
    difficulty: 'MEDIUM',
    focus: 'Max Power & Speed',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex4' } }, orderIndex: 1, sets: 2, reps: '5', restSeconds: 150 },
        { exercise: { connect: { id: 'ex9' } }, orderIndex: 2, sets: 2, reps: '8/side', restSeconds: 120 },
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 3, sets: 3, reps: '15s sprint / 60s rest', restSeconds: 60 },
      ],
    },
  },
  // Day 2: Peak HIIT & Agility (taper)
  {
    id: 'p4w3d2',
    user: { connect: { id: 'user1' } },
    name: 'HIIT & Agility Taper',
    description: 'Short, crisp intervals and light agility to stay sharp.',
    phase: 4,
    week: 3,
    day: 2,
    estimatedDuration: 30,
    difficulty: 'MEDIUM',
    focus: 'HIIT & Agility',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 4, reps: '20s shuttle / 40s rest', restSeconds: 40 },
        { exercise: { connect: { id: 'ex9' } }, orderIndex: 2, sets: 2, reps: '8/side', restSeconds: 90 },
      ],
    },
  },
  // Day 3: Max Throwing & Core Power (taper)
  {
    id: 'p4w3d3',
    user: { connect: { id: 'user1' } },
    name: 'Throwing & Core Power Taper',
    description: 'Low-volume, high-quality throws and core work.',
    phase: 4,
    week: 3,
    day: 3,
    estimatedDuration: 30,
    difficulty: 'MEDIUM',
    focus: 'Throwing & Core Power',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex1' } }, orderIndex: 1, sets: 2, reps: '6', restSeconds: 120 },
        { exercise: { connect: { id: 'ex6' } }, orderIndex: 2, sets: 2, reps: '6', restSeconds: 90 },
        { exercise: { connect: { id: 'ex11' } }, orderIndex: 3, sets: 2, reps: '8/side', restSeconds: 60 },
      ],
    },
  },
  // Day 4: Mobility & Active Recovery (taper)
  {
    id: 'p4w3d4',
    user: { connect: { id: 'user1' } },
    name: 'Mobility & Recovery Taper',
    description: 'Light yoga and stretching for full recovery.',
    phase: 4,
    week: 3,
    day: 4,
    estimatedDuration: 25,
    difficulty: 'LOW',
    focus: 'Mobility & Recovery',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex10' } }, orderIndex: 1, sets: 1, reps: '8/side', restSeconds: 30 },
        { exercise: { connect: { id: 'ex12' } }, orderIndex: 2, sets: 1, reps: '1 flow', restSeconds: 0 },
      ],
    },
  },
  // Day 5: Game Simulation Circuit (taper)
  {
    id: 'p4w3d5',
    user: { connect: { id: 'user1' } },
    name: 'Game Simulation Circuit Taper',
    description: 'Short, game-like circuit to keep movement patterns sharp.',
    phase: 4,
    week: 3,
    day: 5,
    estimatedDuration: 35,
    difficulty: 'MEDIUM',
    focus: 'Game Simulation',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 2, reps: '20s sprint / 60s rest', restSeconds: 60 },
        { exercise: { connect: { id: 'ex4' } }, orderIndex: 2, sets: 2, reps: '4', restSeconds: 120 },
        { exercise: { connect: { id: 'ex1' } }, orderIndex: 3, sets: 2, reps: '6', restSeconds: 90 },
        { exercise: { connect: { id: 'ex9' } }, orderIndex: 4, sets: 2, reps: '8/side', restSeconds: 90 },
      ],
    },
  },
  // Day 6: Maintenance Endurance (taper)
  {
    id: 'p4w3d6',
    user: { connect: { id: 'user1' } },
    name: 'Maintenance Endurance Taper',
    description: 'Short, easy run to maintain aerobic base and promote recovery.',
    phase: 4,
    week: 3,
    day: 6,
    estimatedDuration: 20,
    difficulty: 'LOW',
    focus: 'Maintenance Endurance',
    exercises: {
      create: [
        { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 1, reps: '10min easy run', restSeconds: 0 },
      ],
    },
  },


];
