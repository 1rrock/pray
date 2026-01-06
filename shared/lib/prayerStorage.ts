import { createClient } from 'redis';

let redis: ReturnType<typeof createClient> | null = null;

async function getRedis() {
  if (!redis) {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      throw new Error('REDIS_URL environment variable is not set');
    }

    redis = createClient({ url: redisUrl });

    redis.on('error', (err) => {
      console.error('Redis error:', err.message);
    });

    redis.on('connect', () => {
      console.log('Redis connected');
    });

    redis.on('ready', () => {
      console.log('Redis ready');
    });

    await redis.connect();
  }

  if (!redis.isOpen) {
    await redis.connect();
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

  try {
    const client = await getRedis();
    
    console.log(`[savePrayer] Saving prayer ID: ${id}`);
    await client.setEx(`prayer:${id}`, 24 * 60 * 60, JSON.stringify(prayer));
    console.log(`[savePrayer] Success: ${id}`);
    
    return id;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorName = error instanceof Error ? error.name : 'Error';
    
    console.error('[savePrayer] Error:', { name: errorName, message: errorMessage });
    
    throw new Error(`Failed to save prayer: ${errorName} - ${errorMessage}`);
  }
}

export async function getPrayer(id: string): Promise<SharedPrayer | null> {
  try {
    const client = await getRedis();
    
    console.log(`[getPrayer] Getting prayer ID: ${id}`);
    const data = await client.get(`prayer:${id}`);
    console.log(`[getPrayer] Found: ${!!data}`);
    
    return data ? JSON.parse(data) : null;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[getPrayer] Error:', errorMessage);
    return null;
  }
}
