const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  const envLocalPath = path.join(process.cwd(), '.env.local');
  
  // Try .env.local first, then .env
  const envFile = fs.existsSync(envLocalPath) ? envLocalPath : envPath;
  
  if (fs.existsSync(envFile)) {
    const envContent = fs.readFileSync(envFile, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        envVars[key.trim()] = value.trim();
      }
    });
    
    // Set environment variables
    Object.assign(process.env, envVars);
    console.log('✅ Environment variables loaded from', envFile);
    return true;
  }
  
  console.log('❌ No .env file found');
  return false;
}

async function setupDatabase() {
  console.log('🔧 Setting up database...');
  
  // Load environment variables
  if (!loadEnvFile()) {
    console.error('❌ Please create a .env file with DATABASE_URL');
    process.exit(1);
  }
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }
  
  console.log('🔗 Database URL found:', process.env.DATABASE_URL.substring(0, 30) + '...');
  
  try {
    // Set environment variables for Prisma
    process.env.OPENSSL_CONF = '/dev/null';
    process.env.PRISMA_GENERATE_SKIP_AUTOINSTALL = 'true';
    
    console.log('📦 Generating Prisma client...');
    execSync('npx prisma generate', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        OPENSSL_CONF: '/dev/null'
      }
    });
    
    console.log('🚀 Pushing schema to database...');
    execSync('npx prisma db push --force-reset', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        OPENSSL_CONF: '/dev/null'
      }
    });
    
    console.log('✅ Database setup completed successfully!');
    console.log('🌱 Run "npm run db:seed" to populate with sample data');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('P1001')) {
      console.error('💡 Connection failed. Please check your DATABASE_URL in .env file');
    } else if (error.message.includes('SSL')) {
      console.error('💡 SSL connection issue. Make sure your Neon database allows connections');
    }
    
    process.exit(1);
  }
}

setupDatabase();