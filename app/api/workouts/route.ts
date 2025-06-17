import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const phase = searchParams.get('phase');
    const week = searchParams.get('week');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const where: any = { userId };

    if (phase) {
      where.phase = parseInt(phase);
    }

    if (week) {
      where.week = parseInt(week);
    }

    const workoutPlans = await prisma.workoutPlan.findMany({
      where,
      include: {
        exercises: {
          include: {
            exercise: true,
          },
          orderBy: { orderIndex: 'asc' },
        },
      },
      orderBy: [
        { phase: 'asc' },
        { week: 'asc' },
        { day: 'asc' },
      ],
    });

    return NextResponse.json(workoutPlans);
  } catch (error) {
    console.error('Error fetching workout plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workout plans' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const workoutPlan = await prisma.workoutPlan.create({
      data: {
        userId: body.userId,
        name: body.name,
        description: body.description,
        phase: body.phase,
        week: body.week,
        day: body.day,
        estimatedDuration: body.estimatedDuration,
        difficulty: body.difficulty,
        focus: body.focus,
      },
    });

    return NextResponse.json(workoutPlan, { status: 201 });
  } catch (error) {
    console.error('Error creating workout plan:', error);
    return NextResponse.json(
      { error: 'Failed to create workout plan' },
      { status: 500 }
    );
  }
}