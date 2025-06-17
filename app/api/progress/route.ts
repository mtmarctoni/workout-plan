import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const progressEntries = await prisma.progressEntry.findMany({
      where: { userId },
      orderBy: { recordedAt: 'asc' },
    });

    return NextResponse.json(progressEntries);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const progressEntry = await prisma.progressEntry.create({
      data: {
        userId: body.userId,
        phase: body.phase,
        week: body.week,
        verticalJump: body.verticalJump,
        shuttleTime: body.shuttleTime,
        pullUps: body.pullUps,
        overallScore: body.overallScore,
        weight: body.weight,
        bodyFatPercent: body.bodyFatPercent,
        energyLevel: body.energyLevel,
        sleepQuality: body.sleepQuality,
        motivation: body.motivation,
        notes: body.notes,
        recordedAt: body.recordedAt ? new Date(body.recordedAt) : new Date(),
      },
    });

    return NextResponse.json(progressEntry, { status: 201 });
  } catch (error) {
    console.error('Error creating progress entry:', error);
    return NextResponse.json(
      { error: 'Failed to create progress entry' },
      { status: 500 }
    );
  }
}