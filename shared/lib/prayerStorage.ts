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
      retryStrategy(times) {
        if (times > 3) {
          return null;
        }
        return Math.min(times * 200, 2000);
      },
    });

    redis.on('error', (err) => {
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
    if (client.status !== 'ready') {
      await client.connect();
    }
    await client.set(`prayer:${id}`, JSON.stringify(prayer), 'EX', 24 * 60 * 60);
    return id;
  } catch (error) {
    console.error('Redis save error:', error);
    throw new Error('Failed to save prayer to Redis');
  }
}

export async function getPrayer(id: string): Promise<SharedPrayer | null> {
  const client = getRedis();
  
  try {
    if (client.status !== 'ready') {
      await client.connect();
    }
    const data = await client.get(`prayer:${id}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
}
