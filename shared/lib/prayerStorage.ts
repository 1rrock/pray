import { Redis } from 'ioredis';

let redis: Redis | null = null;

function getRedis(): Redis {
  if (!redis) {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      throw new Error('REDIS_URL environment variable is not set');
    }

    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      enableOfflineQueue: false,
      connectTimeout: 10000,
      retryStrategy(times: number) {
        if (times > 3) {
          return null;
        }
        return Math.min(times * 200, 2000);
      },
    });

    redis.on('error', (err: Error) => {
      console.error('Redis connection error:', err.message);
    });

    redis.on('connect', () => {
      console.log('Redis connected successfully');
    });
  }
  return redis;
}

interface SharedPrayer {
  id: string;
  today: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  guidance: string;
  prayer: string;
  recipientName?: string;
  createdAt: string;
}

export function generateUUID(): string {
  return crypto.randomUUID();
}

export async function savePrayer(data: Omit<SharedPrayer, 'id' | 'createdAt'>): Promise<string> {
  const id = generateUUID();
  const prayer: SharedPrayer = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
  };

  const client = getRedis();
  
  try {
    console.log('Redis status before connect:', client.status);
    
    if (client.status !== 'ready') {
      console.log('Attempting to connect to Redis...');
      await client.connect();
      console.log('Redis connected, status:', client.status);
    }
    
    console.log(`Saving prayer with ID: ${id}`);
    const result = await (client as any).setex(`prayer:${id}`, 24 * 60 * 60, JSON.stringify(prayer));
    console.log(`Prayer saved successfully: ${id}, result: ${result}`);
    
    return id;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorName = error instanceof Error ? error.name : 'Error';
    
    console.error('Redis save error details:', {
      name: errorName,
      message: errorMessage,
      status: client.status,
      redisUrl: process.env.REDIS_URL ? 'SET' : 'NOT_SET'
    });
    
    throw new Error(`Failed to save prayer: ${errorName} - ${errorMessage}`);
  }
}

export async function getPrayer(id: string): Promise<SharedPrayer | null> {
  const client = getRedis();
  
  try {
    console.log('Getting prayer, Redis status:', client.status);
    
    if (client.status !== 'ready') {
      console.log('Connecting to Redis for GET operation...');
      await client.connect();
    }
    
    const data = await (client as any).get(`prayer:${id}`);
    console.log(`Prayer retrieved: ${id}, found: ${!!data}`);
    
    return data ? JSON.parse(data) : null;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Redis get error:', errorMessage);
    return null;
  }
}
