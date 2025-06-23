'use server';

import { prisma } from '@/lib/db';

export async function getExercises() {
  try {
    const exercises = await prisma.exercise.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        type: true,
        level: true,
        equipment: true,
        muscleGroups: true,
        imageUrl: true,
        videoUrl: true,
        instructions: true,
        hasHyperlaxityMod: true,
        hyperlaxityMod: true,
        defaultSets: true,
        defaultReps: true,
      },
      orderBy: {
        name: 'asc',
      },
    });


    return exercises;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw new Error('Failed to fetch exercises');
  }
}
