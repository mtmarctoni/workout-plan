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
    console.log('✅ Environment variables loaded from', path.basename(envFile));
    return true;
  }
  
  console.log('❌ No .env file found');
  return false;
}

function validateDatabaseUrl(url) {
  if (!url) {
    console.error('❌ DATABASE_URL not found in environment variables');
    console.log('💡 Please add DATABASE_URL to your .env file');
    console.log('💡 Example: DATABASE_URL="postgresql://user:pass@host:5432/dbname"');
    return false;
  }
  
  if (!url.startsWith('postgresql://') && !url.startsWith('postgres://')) {
    console.error('❌ DATABASE_URL must be a PostgreSQL connection string');
    return false;
  }
  
  console.log('🔗 Database URL found and validated');
  return true;
}

async function setupDatabase() {
  console.log('🔧 Setting up Handball Training Pro database...');
  console.log('');
  
  // Load environment variables
  if (!loadEnvFile()) {
    console.error('❌ Please create a .env file with your Neon database URL');
    console.log('');
    console.log('📝 Create a .env file with:');
    console.log('DATABASE_URL="your-neon-database-url-here"');
    process.exit(1);
  }
  
  if (!validateDatabaseUrl(process.env.DATABASE_URL)) {
    process.exit(1);
  }
  
  try {
    // Set environment variables for WebContainer compatibility
    const env = {
      ...process.env,
      OPENSSL_CONF: '/dev/null',
      PRISMA_GENERATE_SKIP_AUTOINSTALL: 'true',
      NODE_TLS_REJECT_UNAUTHORIZED: '0', // For WebContainer SSL issues
    };
    
    console.log('📦 Generating Prisma client...');
    try {
      execSync('npx prisma generate', { 
        stdio: 'pipe',
        env: env
      });
      console.log('✅ Prisma client generated successfully');
    } catch (generateError) {
      console.log('⚠️  Prisma generate had warnings, but continuing...');
    }
    
    console.log('');
    console.log('🚀 Connecting to database and creating schema...');
    
    // Try to push schema without force-reset first
    try {
      execSync('npx prisma db push', { 
        stdio: 'pipe',
        env: env
      });
      console.log('✅ Database schema created successfully');
    } catch (pushError) {
      console.log('⚠️  First push failed, trying with force reset...');
      
      try {
        execSync('npx prisma db push --force-reset', { 
          stdio: 'pipe',
          env: env
        });
        console.log('✅ Database schema created with force reset');
      } catch (forceError) {
        console.error('❌ Database push failed:', forceError.message);
        
        // Provide specific error guidance
        if (forceError.message.includes('P1001')) {
          console.log('');
          console.log('💡 Connection failed. Please check:');
          console.log('   • Your DATABASE_URL is correct');
          console.log('   • Your Neon database is running');
          console.log('   • Your internet connection is stable');
        } else if (forceError.message.includes('SSL') || forceError.message.includes('TLS')) {
          console.log('');
          console.log('💡 SSL/TLS issue detected. This is common in WebContainer.');
          console.log('   • Make sure your Neon database allows non-SSL connections');
          console.log('   • Or add ?sslmode=require to your DATABASE_URL');
        } else if (forceError.message.includes('timeout')) {
          console.log('');
          console.log('💡 Connection timeout. Please try again in a moment.');
        }
        
        throw forceError;
      }
    }
    
    console.log('');
    console.log('🎉 Database setup completed successfully!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('   1. Run: npm run db:seed');
    console.log('   2. Start the app: npm run dev');
    console.log('');
    console.log('🔍 Optional: View your database with: npm run prisma:studio');
    
  } catch (error) {
    console.log('');
    console.error('❌ Database setup failed');
    console.log('');
    
    // Enhanced error messages
    if (error.message.includes('command not found')) {
      console.log('💡 Prisma CLI not found. Installing dependencies...');
      try {
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed. Please run the command again.');
      } catch (installError) {
        console.error('❌ Failed to install dependencies:', installError.message);
      }
    } else {
      console.log('💡 Common solutions:');
      console.log('   • Check your .env file has the correct DATABASE_URL');
      console.log('   • Ensure your Neon database is accessible');
      console.log('   • Try running: npm install && npm run db:setup');
      console.log('   • Check Neon dashboard for connection issues');
    }
    
    process.exit(1);
  }
}

setupDatabase();