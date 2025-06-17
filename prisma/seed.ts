import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample exercises
  const exercises = await Promise.all([
    // Upper Body Power
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
        name: 'Plyometric Pull-ups',
        description: 'Build explosive pulling power for defensive movements and ball interception.',
        category: 'UPPER_POWER',
        type: 'POWER',
        level: 'ADVANCED',
        videoUrl: 'https://images.pexels.com/photos/863977/pexels-photo-863977.jpeg',
        instructions: [
          'Hang from pull-up bar with overhand grip',
          'Pull up explosively, aiming to get chest to bar',
          'Release grip briefly at top if possible',
          'Re-grip and control descent slowly'
        ],
        equipment: ['Pull-up Bar'],
        muscleGroups: ['Lats', 'Rhomboids', 'Biceps', 'Core'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Use resistance band assistance, focus on controlled descent',
        defaultSets: 3,
        defaultReps: '5-8',
        defaultRestSeconds: 120,
      },
    }),

    // Core Power
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

    // Lower Body Power
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

    // Agility
    prisma.exercise.create({
      data: {
        name: 'Single-Leg Lateral Bounds',
        description: 'Improve lateral movement and single-leg stability for defensive positioning.',
        category: 'AGILITY',
        type: 'AGILITY',
        level: 'INTERMEDIATE',
        videoUrl: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg',
        instructions: [
          'Stand on one leg with slight knee bend',
          'Bound laterally as far as possible',
          'Land on opposite leg, absorbing impact',
          'Immediately bound back to starting position'
        ],
        equipment: ['Cones'],
        muscleGroups: ['Glutes', 'Quadriceps', 'Calves', 'Core'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Reduce bound distance, focus on stable landing',
        defaultSets: 3,
        defaultReps: '8 each direction',
        defaultRestSeconds: 90,
      },
    }),

    // Core Strength
    prisma.exercise.create({
      data: {
        name: 'Stability Ball Pike Push-ups',
        description: 'Build core stability and shoulder strength for overhead throwing motions.',
        category: 'STRENGTH',
        type: 'STRENGTH',
        level: 'ADVANCED',
        videoUrl: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg',
        instructions: [
          'Start in plank with feet on stability ball',
          'Pike up, bringing hips toward ceiling',
          'Lower into push-up position on ball',
          'Return to pike position and repeat'
        ],
        equipment: ['Stability Ball'],
        muscleGroups: ['Core', 'Shoulders', 'Chest', 'Hip Flexors'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Perform on knees, use smaller range of motion',
        defaultSets: 3,
        defaultReps: '6-10',
        defaultRestSeconds: 90,
      },
    }),

    // Battle Ropes
    prisma.exercise.create({
      data: {
        name: 'Battle Rope Alternating Waves',
        description: 'Develop upper body power endurance and core stability.',
        category: 'UPPER_POWER',
        type: 'POWER',
        level: 'INTERMEDIATE',
        videoUrl: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg',
        instructions: [
          'Hold rope ends with neutral grip',
          'Create alternating waves by rapidly moving arms up and down',
          'Keep core engaged and maintain athletic stance',
          'Focus on speed and power, not just endurance'
        ],
        equipment: ['Battle Ropes'],
        muscleGroups: ['Shoulders', 'Arms', 'Core', 'Legs'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Reduce intensity, focus on shoulder stability',
        defaultSets: 3,
        defaultReps: '30s',
        defaultRestSeconds: 90,
      },
    }),

    // Recovery exercises
    prisma.exercise.create({
      data: {
        name: 'Dynamic Shoulder Circles',
        description: 'Improve shoulder mobility and prepare for throwing movements.',
        category: 'RECOVERY',
        type: 'RECOVERY',
        level: 'BEGINNER',
        videoUrl: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg',
        instructions: [
          'Stand with arms extended to sides',
          'Make small circles forward for 10 reps',
          'Make small circles backward for 10 reps',
          'Increase circle size gradually'
        ],
        equipment: ['None'],
        muscleGroups: ['Shoulders', 'Upper Back'],
        hasHyperlaxityMod: false,
        defaultSets: 2,
        defaultReps: '10 each direction',
        defaultRestSeconds: 30,
      },
    }),
  ]);

  console.log(`✅ Created ${exercises.length} exercises`);

  // Create a sample user with profile
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

  // Create workout plans for Phase 3 (Power Development)
  const workoutPlans = [];
  
  // Week 1 workouts
  for (let day = 1; day <= 5; day++) {
    const workoutPlan = await prisma.workoutPlan.create({
      data: {
        userId: sampleUser.id,
        name: `Power Development - Day ${day}`,
        description: `Phase 3 power development workout focusing on explosive movements`,
        phase: 3,
        week: 1,
        day: day,
        estimatedDuration: 45,
        difficulty: 'HIGH',
        focus: day === 1 ? 'Upper Body Power' : 
               day === 2 ? 'Lower Body Power' : 
               day === 3 ? 'Recovery & Mobility' :
               day === 4 ? 'Explosive Power' : 'Agility & Speed',
      },
    });

    // Add exercises to each workout plan
    const exerciseIds = exercises.map(ex => ex.id);
    const selectedExercises = exerciseIds.slice(0, Math.min(5, exerciseIds.length));
    
    for (let i = 0; i < selectedExercises.length; i++) {
      await prisma.workoutExercise.create({
        data: {
          workoutPlanId: workoutPlan.id,
          exerciseId: selectedExercises[i],
          orderIndex: i + 1,
          sets: exercises[i].defaultSets || 3,
          reps: exercises[i].defaultReps || '8-10',
          restSeconds: exercises[i].defaultRestSeconds || 90,
          progressionType: 'WEIGHT',
          progressionAmount: 2.5,
        },
      });
    }

    workoutPlans.push(workoutPlan);
  }

  console.log(`✅ Created ${workoutPlans.length} workout plans`);

  // Create sample progress entries
  const progressEntries = [];
  for (let week = 1; week <= 8; week++) {
    const entry = await prisma.progressEntry.create({
      data: {
        userId: sampleUser.id,
        phase: week <= 3 ? 1 : week <= 6 ? 2 : 3,
        week: ((week - 1) % 3) + 1,
        verticalJump: 45 + (week * 1.5), // Progressive improvement
        shuttleTime: 4.8 - (week * 0.1),
        pullUps: 8 + week,
        overallScore: 65 + (week * 2.5),
        weight: 75.0 + (week * 0.1),
        energyLevel: Math.floor(Math.random() * 3) + 7, // 7-10
        sleepQuality: Math.floor(Math.random() * 3) + 7,
        motivation: Math.floor(Math.random() * 3) + 8,
        recordedAt: new Date(2024, 0, week * 7), // Weekly entries
      },
    });
    progressEntries.push(entry);
  }

  console.log(`✅ Created ${progressEntries.length} progress entries`);

  // Create sample achievements
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        userId: sampleUser.id,
        title: 'Power Breakthrough',
        description: 'Achieved 20% improvement in vertical jump',
        type: 'PERFORMANCE',
        icon: '🚀',
        metric: 'verticalJump',
        value: 58.0,
        threshold: 54.0,
      },
    }),
    prisma.achievement.create({
      data: {
        userId: sampleUser.id,
        title: 'Consistency Champion',
        description: '15-day workout streak completed',
        type: 'CONSISTENCY',
        icon: '🔥',
        metric: 'workoutStreak',
        value: 15,
        threshold: 14,
      },
    }),
    prisma.achievement.create({
      data: {
        userId: sampleUser.id,
        title: 'Strength Milestone',
        description: 'Doubled initial pull-up performance',
        type: 'PERFORMANCE',
        icon: '💪',
        metric: 'pullUps',
        value: 16,
        threshold: 16,
      },
    }),
  ]);

  console.log(`✅ Created ${achievements.length} achievements`);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });