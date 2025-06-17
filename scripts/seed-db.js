const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  const envLocalPath = path.join(process.cwd(), '.env.local');
  
  const envFile = fs.existsSync(envLocalPath) ? envLocalPath : envPath;
  
  if (fs.existsSync(envFile)) {
    const envContent = fs.readFileSync(envFile, 'utf8');
    
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        process.env[key.trim()] = value.trim();
      }
    });
    
    console.log('✅ Environment variables loaded');
    return true;
  }
  
  return false;
}

async function seedDatabase() {
  console.log('🌱 Starting database seed...');
  
  // Load environment variables
  loadEnvFile();
  
  // Set SSL bypass for WebContainer
  process.env.OPENSSL_CONF = '/dev/null';
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  try {
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await prisma.achievement.deleteMany();
    await prisma.progressEntry.deleteMany();
    await prisma.workoutExercise.deleteMany();
    await prisma.workoutPlan.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.userProfile.deleteMany();
    await prisma.user.deleteMany();

    // Create sample exercises
    console.log('💪 Creating exercises...');
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

    // Create workout plans
    console.log('📋 Creating workout plans...');
    const workoutPlans = [];
    
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
      for (let i = 0; i < Math.min(5, exercises.length); i++) {
        await prisma.workoutExercise.create({
          data: {
            workoutPlanId: workoutPlan.id,
            exerciseId: exercises[i].id,
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
    console.log('📊 Creating progress entries...');
    const progressEntries = [];
    for (let week = 1; week <= 8; week++) {
      const entry = await prisma.progressEntry.create({
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
      progressEntries.push(entry);
    }

    console.log(`✅ Created ${progressEntries.length} progress entries`);

    // Create sample achievements
    console.log('🏆 Creating achievements...');
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
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  });