// Simplified seeding script
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('🌱 Seeding database...');

  try {
    // Create sample exercises
    const exercises = await Promise.all([
      prisma.exercise.create({
        data: {
          name: 'Medicine Ball Explosive Push-ups',
          description: 'Develop explosive upper body power for throwing and blocking movements.',
          category: 'UPPER_POWER',
          type: 'POWER',
          level: 'INTERMEDIATE',
          videoUrl: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg',
          instructions: [
            'Start in push-up position with hands on medicine ball',
            'Lower chest to ball with control',
            'Explosively push up, releasing hands from ball',
            'Land with hands back on ball, immediately lower for next rep'
          ],
          equipment: ['Medicine Ball', 'Mat'],
          muscleGroups: ['Chest', 'Shoulders', 'Triceps', 'Core'],
          hasHyperlaxityMod: true,
          hyperlaxityMod: 'Reduce range of motion by 20%, focus on controlled eccentric',
          defaultSets: 4,
          defaultReps: '8-10',
          defaultRestSeconds: 90,
        },
      }),
      
      prisma.exercise.create({
        data: {
          name: 'Jump Squats with Pause',
          description: 'Develop explosive leg power for jumping and quick direction changes.',
          category: 'LOWER_POWER',
          type: 'POWER',
          level: 'BEGINNER',
          videoUrl: 'https://images.pexels.com/photos/863975/pexels-photo-863975.jpeg',
          instructions: [
            'Start in squat position, pause for 1 second',
            'Jump explosively upward, reaching for maximum height',
            'Land softly in squat position',
            'Hold bottom position before next rep'
          ],
          equipment: ['None'],
          muscleGroups: ['Quadriceps', 'Glutes', 'Calves', 'Core'],
          hasHyperlaxityMod: true,
          hyperlaxityMod: 'Land softly, hold squat position for 2 seconds',
          defaultSets: 4,
          defaultReps: '8-12',
          defaultRestSeconds: 75,
        },
      }),

      prisma.exercise.create({
        data: {
          name: 'Rotational Medicine Ball Throws',
          description: 'Enhance rotational power for shooting and passing accuracy.',
          category: 'CORE_POWER',
          type: 'POWER',
          level: 'INTERMEDIATE',
          videoUrl: 'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg',
          instructions: [
            'Stand sideways to wall, holding medicine ball',
            'Rotate trunk away from wall, then explosively throw ball',
            'Catch ball on rebound and immediately repeat',
            'Complete all reps one side before switching'
          ],
          equipment: ['Medicine Ball', 'Wall'],
          muscleGroups: ['Obliques', 'Core', 'Shoulders', 'Hips'],
          hasHyperlaxityMod: true,
          hyperlaxityMod: 'Start with lighter ball, focus on core stability',
          defaultSets: 4,
          defaultReps: '6 each side',
          defaultRestSeconds: 60,
        },
      }),
    ]);

    console.log(`✅ Created ${exercises.length} exercises`);

    // Create sample user
    const sampleUser = await prisma.user.create({
      data: {
        email: 'demo@handballpro.com',
        name: 'Alex Rodriguez',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
        profile: {
          create: {
            age: 24,
            weight: 75.0,
            height: 180.0,
            hasHyperlaxity: true,
            experienceLevel: 'INTERMEDIATE',
            trainingGoals: ['POWER', 'AGILITY', 'STRENGTH'],
            availableDays: 5,
            sessionDuration: 45,
            currentPhase: 3,
            currentWeek: 2,
            programStartDate: new Date('2024-01-01'),
          },
        },
      },
    });

    console.log(`✅ Created sample user: ${sampleUser.email}`);

    // Create progress entries
    for (let week = 1; week <= 8; week++) {
      await prisma.progressEntry.create({
        data: {
          userId: sampleUser.id,
          phase: week <= 3 ? 1 : week <= 6 ? 2 : 3,
          week: ((week - 1) % 3) + 1,
          verticalJump: 45 + (week * 1.5),
          shuttleTime: 4.8 - (week * 0.1),
          pullUps: 8 + week,
          overallScore: 65 + (week * 2.5),
          weight: 75.0 + (week * 0.1),
          energyLevel: Math.floor(Math.random() * 3) + 7,
          sleepQuality: Math.floor(Math.random() * 3) + 7,
          motivation: Math.floor(Math.random() * 3) + 8,
          recordedAt: new Date(2024, 0, week * 7),
        },
      });
    }

    console.log('✅ Created progress entries');

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });