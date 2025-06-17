import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const equipment = searchParams.get('equipment');
    const search = searchParams.get('search');

    const where: any = {};

    if (category && category !== 'all') {
      where.category = category;
    }

    if (level && level !== 'all') {
      where.level = level;
    }

    if (equipment && equipment !== 'all') {
      if (equipment === 'None') {
        where.equipment = { has: 'None' };
      } else {
        where.equipment = { has: equipment };
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const exercises = await prisma.exercise.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(exercises);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exercises' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const exercise = await prisma.exercise.create({
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        type: body.type,
        level: body.level,
        videoUrl: body.videoUrl,
        imageUrl: body.imageUrl,
        instructions: body.instructions,
        equipment: body.equipment,
        muscleGroups: body.muscleGroups,
        hasHyperlaxityMod: body.hasHyperlaxityMod,
        hyperlaxityMod: body.hyperlaxityMod,
        defaultSets: body.defaultSets,
        defaultReps: body.defaultReps,
        defaultRestSeconds: body.defaultRestSeconds,
        defaultWeight: body.defaultWeight,
      },
    });

    return NextResponse.json(exercise, { status: 201 });
  } catch (error) {
    console.error('Error creating exercise:', error);
    return NextResponse.json(
      { error: 'Failed to create exercise' },
      { status: 500 }
    );
  }
}