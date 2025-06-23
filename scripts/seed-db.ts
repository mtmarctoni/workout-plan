import { PrismaClient } from '@prisma/client';
import * as fs from 'node:fs';
import * as path from 'node:path';
// import { fileURLToPath } from 'node:url';

// Get the current file's directory in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Load environment variables from .env file
function loadEnvFile(): boolean {
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
  
  console.log('❌ No .env file found');
  return false;
}

export async function seedDatabase() {
  console.log('🌱 Starting database seed...');
  
  // Load environment variables
  loadEnvFile();
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  try {
    // Clear existing data in the correct order to respect foreign key constraints
    console.log('🧹 Clearing existing data...');
    
    // Function to safely clear a table
    const clearTable = async (model: any) => {
      try {
        await model.deleteMany({});
        return true;
      } catch (error: any) {
        // If the table doesn't exist yet, that's fine - we'll create it
        if (error.code === 'P2021' || error.message.includes('does not exist')) {
          console.log(`ℹ️  Table not found, will be created: ${model.name}`);
          return true;
        }
        console.error(`❌ Error clearing table ${model.name}:`, error.message);
        return false;
      }
    };
    
    // Clear data in reverse order of dependencies
    await clearTable(prisma.achievement);
    await clearTable(prisma.progressEntry);
    await clearTable(prisma.workoutExercise);
    await clearTable(prisma.exerciseLog);
    await clearTable(prisma.workoutSession);
    await clearTable(prisma.workoutPlan);
    await clearTable(prisma.exercise);
    await clearTable(prisma.userProfile);
    await clearTable(prisma.user);
    
    console.log('✅ Database cleared or ready for seeding');
    
    // Import seed data
    const { seedData } = await import('../prisma/seed-data');
    
    if (!seedData) {
      throw new Error('Seed data not found');
    }
    
    console.log('🌱 Seeding database with initial data...');
    
    // Seed users and profiles
    console.log('👥 Creating users...');
    for (const user of seedData.users) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: user,
        create: user
      });
    }
    
    // Seed user profiles
    for (const profile of seedData.userProfiles) {
      await prisma.userProfile.upsert({
        where: { id: profile.id },
        update: profile,
        create: profile
      });
    }
    
    // Seed exercises
    console.log('💪 Creating exercises...');
    for (const exercise of seedData.exercises) {
      await prisma.exercise.upsert({
        where: { id: exercise.id },
        update: exercise,
        create: exercise
      });
    }
    
    // Seed workout plans and their exercises
    console.log('📋 Creating workout plans...');
    for (const plan of seedData.workoutPlans) {
      const { exercises, ...planData } = plan as any;
      
      // First create or update the workout plan
      const createdPlan = await prisma.workoutPlan.upsert({
        where: { id: plan.id },
        update: planData,
        create: planData,
      });
      
      // Then create the exercises for this plan
      if (exercises?.create && Array.isArray(exercises.create)) {
        // Delete existing exercises first to avoid duplicates
        try {
          await prisma.workoutExercise.deleteMany({
            where: { workoutPlanId: plan.id }
          });
        } catch (error: any) {
          // If the table doesn't exist yet, that's fine - we'll create it
          if (error.code !== 'P2021' && !error.message.includes('does not exist')) {
            throw error; // Re-throw if it's not a "table doesn't exist" error
          }
        }
        
        // Create new exercises with proper relations
        for (const exercise of exercises.create) {
          const { exercise: exerciseRelation, ...exerciseData } = exercise;
          await prisma.workoutExercise.create({
            data: {
              ...exerciseData,
              workoutPlan: {
                connect: { id: createdPlan.id }
              },
              exercise: {
                connect: { id: exerciseRelation.connect.id }
              }
            }
          });
        }
      }
    }
    
    console.log('✅ Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// If this file is run directly (not imported), execute the seed function
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch(console.error);
}
