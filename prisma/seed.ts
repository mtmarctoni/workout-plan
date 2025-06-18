// Import the seed function from your seed script
import { seedDatabase } from '../scripts/seed-db.js';

// Execute the seed function
seedDatabase()
  .then(() => {
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed to seed database:');
    console.error(error);
    process.exit(1);
  });
