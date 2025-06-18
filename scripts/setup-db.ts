import { execSync } from 'node:child_process';
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
  
  // Try .env.local first, then .env
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

function validateDatabaseUrl(url: string | undefined): boolean {
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
  console.log('🚀 Setting up database...');
  
  // Load environment variables
  loadEnvFile();
  
  // Validate database URL
  if (!validateDatabaseUrl(process.env.DATABASE_URL)) {
    process.exit(1);
  }
  
  console.log('🔄 Running database migrations...');
  
  try {
    // Run Prisma migrations
    execSync('npx prisma migrate deploy', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        // Set SSL configuration for WebContainers if needed
        OPENSSL_CONF: process.env.OPENSSL_CONF || '/dev/null',
        NODE_TLS_REJECT_UNAUTHORIZED: '0',
      },
    });
    
    console.log('✅ Database migrations applied successfully');
    
    // Generate Prisma Client
    console.log('🔧 Generating Prisma Client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    console.log('✨ Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to set up database:');
    console.error(error);
    process.exit(1);
  }
}

setupDatabase().catch(console.error);
