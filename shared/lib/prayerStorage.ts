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
      enableOfflineQueue: true,
      connectTimeout: 10000,
      commandTimeout: 5000,
      retryStrategy(times: number) {
        if (times > 3) {
          console.error(`Redis retry limit reached (${times} attempts)`);
          return null;
        }
        const delay = Math.min(times * 200, 2000);
        console.log(`Redis retry attempt ${times}, waiting ${delay}ms`);
        return delay;
      },
      reconnectOnError(err: Error) {
        const targetErrors = ['READONLY', 'ETIMEDOUT', 'ECONNRESET'];
        if (targetErrors.some(target => err.message.includes(target))) {
          console.log('Reconnecting on error:', err.message);
          return true;
        }
        return false;
      },
    });

    redis.on('error', (err: Error) => {
      console.error('Redis error:', err.message);
    });

    redis.on('connect', () => {
      console.log('Redis connected');
    });

    redis.on('ready', () => {
      console.log('Redis ready');
    });

    redis.on('close', () => {
      console.log('Redis connection closed');
    });

    redis.on('reconnecting', (delay: number) => {
      console.log(`Redis reconnecting in ${delay}ms`);
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
    console.log(`[savePrayer] Starting save for ID: ${id}`);
    console.log(`[savePrayer] Redis status: ${client.status}`);
    
    if (client.status === 'end' || client.status === 'close') {
      console.log('[savePrayer] Redis is closed, reconnecting...');
      await client.connect();
    }
    
    if (client.status !== 'ready') {
      console.log('[savePrayer] Waiting for Redis to be ready...');
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Redis connection timeout'));
        }, 10000);

        if (client.status === 'ready') {
          clearTimeout(timeout);
          resolve();
          return;
        }

        client.once('ready', () => {
          clearTimeout(timeout);
          resolve();
        });

        client.once('error', (err) => {
          clearTimeout(timeout);
          reject(err);
        });
      });
    }
    
    console.log(`[savePrayer] Executing SETEX command for key: prayer:${id}`);
    const result = await (client as any).setex(`prayer:${id}`, 24 * 60 * 60, JSON.stringify(prayer));
    console.log(`[savePrayer] Success! Result: ${result}, ID: ${id}`);
    
    return id;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorName = error instanceof Error ? error.name : 'Error';
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';
    
    console.error('[savePrayer] Error details:', {
      name: errorName,
      message: errorMessage,
      stack: errorStack,
      status: client.status,
      redisUrl: process.env.REDIS_URL ? 'SET' : 'NOT_SET'
    });
    
    throw new Error(`Failed to save prayer: ${errorName} - ${errorMessage}`);
  }
}

export async function getPrayer(id: string): Promise<SharedPrayer | null> {
  const client = getRedis();
  
  try {
    console.log(`[getPrayer] Getting prayer ID: ${id}, Redis status: ${client.status}`);
    
    if (client.status === 'end' || client.status === 'close') {
      console.log('[getPrayer] Redis is closed, reconnecting...');
      await client.connect();
    }
    
    if (client.status !== 'ready') {
      console.log('[getPrayer] Waiting for Redis to be ready...');
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Redis connection timeout'));
        }, 10000);

        if (client.status === 'ready') {
          clearTimeout(timeout);
          resolve();
          return;
        }

        client.once('ready', () => {
          clearTimeout(timeout);
          resolve();
        });

        client.once('error', (err) => {
          clearTimeout(timeout);
          reject(err);
        });
      });
    }
    
    const data = await (client as any).get(`prayer:${id}`);
    console.log(`[getPrayer] Retrieved: ${id}, found: ${!!data}`);
    
    return data ? JSON.parse(data) : null;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[getPrayer] Error:', errorMessage);
    return null;
  }
}
