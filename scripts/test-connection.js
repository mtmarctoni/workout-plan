const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Load environment variables
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
    
    return true;
  }
  
  return false;
}

async function testConnection() {
  console.log('🔍 Testing database connection...');
  
  loadEnvFile();
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found');
    process.exit(1);
  }
  
  // Set SSL bypass for WebContainer
  process.env.OPENSSL_CONF = '/dev/null';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  try {
    console.log('🔗 Attempting to connect...');
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    console.log('📊 Testing query...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query test successful:', result);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('P1001')) {
      console.log('💡 This is a connection error. Check your DATABASE_URL and network.');
    } else if (error.message.includes('SSL')) {
      console.log('💡 SSL error detected. This is common in WebContainer environments.');
    }
    
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();