// Database setup script that works around OpenSSL issues
const { execSync } = require('child_process');

console.log('🔧 Setting up database...');

try {
  // Try to push schema directly without SSL verification
  console.log('📤 Pushing schema to database...');
  execSync('npx prisma db push --accept-data-loss --skip-generate', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING: '1',
      OPENSSL_CONF: '/dev/null'
    }
  });
  
  console.log('✅ Schema pushed successfully!');
  
  // Generate Prisma client
  console.log('🔄 Generating Prisma client...');
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING: '1',
      OPENSSL_CONF: '/dev/null'
    }
  });
  
  console.log('✅ Prisma client generated!');
  
  console.log('🎉 Database setup complete!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Run: npm run db:seed (to add sample data)');
  console.log('2. Start your app: npm run dev');
  
} catch (error) {
  console.error('❌ Database setup failed:', error.message);
  console.log('');
  console.log('🔧 Troubleshooting:');
  console.log('1. Check your DATABASE_URL in .env file');
  console.log('2. Ensure your Neon database is accessible');
  console.log('3. Try running: npm run db:reset');
  process.exit(1);
}