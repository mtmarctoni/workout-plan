import { Prisma } from '@prisma/client';

export const phase3WorkoutPlans: Prisma.WorkoutPlanCreateInput[] = [
    // Day 1: Sport Strength & Jump
    {
        id: 'p3w1d1',
        user: { connect: { id: 'user1' } },
        name: 'Sport Strength & Jump',
        description: 'Lower body strength with explosive bounds and depth jumps.',
        phase: 3,
        week: 1,
        day: 1,
        estimatedDuration: 60,
        difficulty: 'HIGH',
        focus: 'Lower Strength & Power',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex3' } }, orderIndex: 1, sets: 4, reps: '10', restSeconds: 90 },
                { exercise: { connect: { id: 'ex4' } }, orderIndex: 2, sets: 5, reps: '8', restSeconds: 120 },
                { exercise: { connect: { id: 'ex9' } }, orderIndex: 3, sets: 5, reps: '12/side', restSeconds: 90 },
            ],
        },
    },
    // Day 2: Game-Style HIIT
    {
        id: 'p3w1d2',
        user: { connect: { id: 'user1' } },
        name: 'Game-Style HIIT',
        description: 'Handball-specific shuttle runs for match conditioning.',
        phase: 3,
        week: 1,
        day: 2,
        estimatedDuration: 45,
        difficulty: 'HIGH',
        focus: 'Endurance',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 12, reps: '30s shuttle / 60s rest', restSeconds: 60 },
            ],
        },
    },
    // Day 3: Throwing & Rotational Power
    {
        id: 'p3w1d3',
        user: { connect: { id: 'user1' } },
        name: 'Throwing & Rotational Power',
        description: 'Medicine ball throws, push-press, and core rotation for handball throws.',
        phase: 3,
        week: 1,
        day: 3,
        estimatedDuration: 60,
        difficulty: 'MEDIUM',
        focus: 'Upper Power',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex1' } }, orderIndex: 1, sets: 5, reps: '10', restSeconds: 90 },
                { exercise: { connect: { id: 'ex6' } }, orderIndex: 2, sets: 5, reps: '8', restSeconds: 90 },
                { exercise: { connect: { id: 'ex11' } }, orderIndex: 3, sets: 4, reps: '12/side', restSeconds: 60 },
            ],
        },
    },
    // Day 4: Mobility & Recovery
    {
        id: 'p3w1d4',
        user: { connect: { id: 'user1' } },
        name: 'Mobility & Recovery',
        description: 'Hip and shoulder mobility, stability, and yoga flow.',
        phase: 3,
        week: 1,
        day: 4,
        estimatedDuration: 40,
        difficulty: 'LOW',
        focus: 'Mobility',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex10' } }, orderIndex: 1, sets: 3, reps: '10/side', restSeconds: 30 },
                { exercise: { connect: { id: 'ex12' } }, orderIndex: 2, sets: 1, reps: '1 flow', restSeconds: 0 },
            ],
        },
    },
    // Day 5: Defensive Agility & Core
    {
        id: 'p3w1d5',
        user: { connect: { id: 'user1' } },
        name: 'Defensive Agility & Core',
        description: 'Lateral bounds, agility, and rotational core work for defense.',
        phase: 3,
        week: 1,
        day: 5,
        estimatedDuration: 55,
        difficulty: 'MEDIUM',
        focus: 'Agility & Core',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex9' } }, orderIndex: 1, sets: 5, reps: '15/side', restSeconds: 90 },
                { exercise: { connect: { id: 'ex11' } }, orderIndex: 2, sets: 4, reps: '15/side', restSeconds: 60 },
            ],
        },
    },
    // Day 6: Mixed Endurance
    {
        id: 'p3w1d6',
        user: { connect: { id: 'user1' } },
        name: 'Mixed Endurance',
        description: 'Interval and tempo running for sport-specific stamina.',
        phase: 3,
        week: 1,
        day: 6,
        estimatedDuration: 60,
        difficulty: 'HIGH',
        focus: 'Endurance',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 1, reps: '40min fartlek run', restSeconds: 0 },
            ],
        },
    },
    // Day 1: Sport Strength & Jump (progression)
    {
        id: 'p3w2d1',
        user: { connect: { id: 'user1' } },
        name: 'Sport Strength & Jump Progression',
        description: 'Increased volume for lower body strength and explosive bounds.',
        phase: 3,
        week: 2,
        day: 1,
        estimatedDuration: 65,
        difficulty: 'HIGH',
        focus: 'Lower Strength & Power',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex3' } }, orderIndex: 1, sets: 5, reps: '10', restSeconds: 90 },
                { exercise: { connect: { id: 'ex4' } }, orderIndex: 2, sets: 6, reps: '8', restSeconds: 120 },
                { exercise: { connect: { id: 'ex9' } }, orderIndex: 3, sets: 6, reps: '14/side', restSeconds: 90 },
            ],
        },
    },
    // Day 2: Game-Style HIIT (progression)
    {
        id: 'p3w2d2',
        user: { connect: { id: 'user1' } },
        name: 'Game-Style HIIT Progression',
        description: 'More intervals and shorter rest for match conditioning.',
        phase: 3,
        week: 2,
        day: 2,
        estimatedDuration: 50,
        difficulty: 'HIGH',
        focus: 'Endurance',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 14, reps: '30s shuttle / 50s rest', restSeconds: 50 },
            ],
        },
    },
    // Day 3: Throwing & Rotational Power (progression)
    {
        id: 'p3w2d3',
        user: { connect: { id: 'user1' } },
        name: 'Throwing & Rotational Power Progression',
        description: 'Higher reps and sets for upper body and core rotation.',
        phase: 3,
        week: 2,
        day: 3,
        estimatedDuration: 65,
        difficulty: 'MEDIUM',
        focus: 'Upper Power',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex1' } }, orderIndex: 1, sets: 6, reps: '12', restSeconds: 90 },
                { exercise: { connect: { id: 'ex6' } }, orderIndex: 2, sets: 6, reps: '10', restSeconds: 90 },
                { exercise: { connect: { id: 'ex11' } }, orderIndex: 3, sets: 5, reps: '14/side', restSeconds: 60 },
            ],
        },
    },
    // Day 4: Mobility & Recovery (progression)
    {
        id: 'p3w2d4',
        user: { connect: { id: 'user1' } },
        name: 'Mobility & Recovery Progression',
        description: 'More sets for hip and shoulder mobility and yoga flow.',
        phase: 3,
        week: 2,
        day: 4,
        estimatedDuration: 45,
        difficulty: 'LOW',
        focus: 'Mobility',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex10' } }, orderIndex: 1, sets: 4, reps: '12/side', restSeconds: 30 },
                { exercise: { connect: { id: 'ex12' } }, orderIndex: 2, sets: 1, reps: '1 flow', restSeconds: 0 },
            ],
        },
    },
    // Day 5: Defensive Agility & Core (progression)
    {
        id: 'p3w2d5',
        user: { connect: { id: 'user1' } },
        name: 'Defensive Agility & Core Progression',
        description: 'More volume for lateral bounds and core work.',
        phase: 3,
        week: 2,
        day: 5,
        estimatedDuration: 60,
        difficulty: 'MEDIUM',
        focus: 'Agility & Core',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex9' } }, orderIndex: 1, sets: 6, reps: '16/side', restSeconds: 90 },
                { exercise: { connect: { id: 'ex11' } }, orderIndex: 2, sets: 5, reps: '16/side', restSeconds: 60 },
            ],
        },
    },
    // Day 6: Mixed Endurance (progression)
    {
        id: 'p3w2d6',
        user: { connect: { id: 'user1' } },
        name: 'Mixed Endurance Progression',
        description: 'Longer fartlek run for sport-specific stamina.',
        phase: 3,
        week: 2,
        day: 6,
        estimatedDuration: 65,
        difficulty: 'HIGH',
        focus: 'Endurance',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 1, reps: '45min fartlek run', restSeconds: 0 },
            ],
        },
    },
    // Day 1: Sport Strength & Jump (peak)
    {
        id: 'p3w3d1',
        user: { connect: { id: 'user1' } },
        name: 'Sport Strength & Jump Peak',
        description: 'Peak volume for lower body strength and explosive bounds.',
        phase: 3,
        week: 3,
        day: 1,
        estimatedDuration: 70,
        difficulty: 'HIGH',
        focus: 'Lower Strength & Power',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex3' } }, orderIndex: 1, sets: 6, reps: '12', restSeconds: 90 },
                { exercise: { connect: { id: 'ex4' } }, orderIndex: 2, sets: 7, reps: '10', restSeconds: 120 },
                { exercise: { connect: { id: 'ex9' } }, orderIndex: 3, sets: 7, reps: '16/side', restSeconds: 90 },
            ],
        },
    },
    // Day 2: Game-Style HIIT (peak)
    {
        id: 'p3w3d2',
        user: { connect: { id: 'user1' } },
        name: 'Game-Style HIIT Peak',
        description: 'Highest intensity and interval count for match conditioning.',
        phase: 3,
        week: 3,
        day: 2,
        estimatedDuration: 55,
        difficulty: 'HIGH',
        focus: 'Endurance',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 16, reps: '30s shuttle / 40s rest', restSeconds: 40 },
            ],
        },
    },
    // Day 3: Throwing & Rotational Power (peak)
    {
        id: 'p3w3d3',
        user: { connect: { id: 'user1' } },
        name: 'Throwing & Rotational Power Peak',
        description: 'Peak sets and reps for upper body and core rotation.',
        phase: 3,
        week: 3,
        day: 3,
        estimatedDuration: 70,
        difficulty: 'MEDIUM',
        focus: 'Upper Power',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex1' } }, orderIndex: 1, sets: 7, reps: '14', restSeconds: 90 },
                { exercise: { connect: { id: 'ex6' } }, orderIndex: 2, sets: 7, reps: '12', restSeconds: 90 },
                { exercise: { connect: { id: 'ex11' } }, orderIndex: 3, sets: 6, reps: '16/side', restSeconds: 60 },
            ],
        },
    },
    // Day 4: Mobility & Recovery (peak)
    {
        id: 'p3w3d4',
        user: { connect: { id: 'user1' } },
        name: 'Mobility & Recovery Peak',
        description: 'Peak sets for hip and shoulder mobility and yoga flow.',
        phase: 3,
        week: 3,
        day: 4,
        estimatedDuration: 50,
        difficulty: 'LOW',
        focus: 'Mobility',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex10' } }, orderIndex: 1, sets: 5, reps: '14/side', restSeconds: 30 },
                { exercise: { connect: { id: 'ex12' } }, orderIndex: 2, sets: 1, reps: '1 flow', restSeconds: 0 },
            ],
        },
    },
    // Day 5: Defensive Agility & Core (peak)
    {
        id: 'p3w3d5',
        user: { connect: { id: 'user1' } },
        name: 'Defensive Agility & Core Peak',
        description: 'Peak volume for lateral bounds and core work.',
        phase: 3,
        week: 3,
        day: 5,
        estimatedDuration: 65,
        difficulty: 'MEDIUM',
        focus: 'Agility & Core',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex9' } }, orderIndex: 1, sets: 7, reps: '18/side', restSeconds: 90 },
                { exercise: { connect: { id: 'ex11' } }, orderIndex: 2, sets: 6, reps: '18/side', restSeconds: 60 },
            ],
        },
    },
    // Day 6: Mixed Endurance (peak)
    {
        id: 'p3w3d6',
        user: { connect: { id: 'user1' } },
        name: 'Mixed Endurance Peak',
        description: 'Longest fartlek run for sport-specific stamina.',
        phase: 3,
        week: 3,
        day: 6,
        estimatedDuration: 70,
        difficulty: 'HIGH',
        focus: 'Endurance',
        exercises: {
            create: [
                { exercise: { connect: { id: 'ex8' } }, orderIndex: 1, sets: 1, reps: '50min fartlek run', restSeconds: 0 },
            ],
        },
    },


];
