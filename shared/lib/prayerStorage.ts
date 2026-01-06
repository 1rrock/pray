import { createClient } from 'redis';

let redis: ReturnType<typeof createClient> | null = null;

// TTL: 7일 (초 단위) - 30MB Redis 한도 고려
const PRAYER_TTL_SECONDS = 7 * 24 * 60 * 60;

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

export function generateContentHash(data: {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  guidance: string;
  prayer: string;
  recipientName?: string;
}): string {
  const content = `${data.book}:${data.chapter}:${data.verse}:${data.prayer}:${data.recipientName || ''}`;
  // 간단한 해시 생성 (djb2 알고리즘)
  let hash = 5381;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) + hash) + content.charCodeAt(i);
  }
  return Math.abs(hash).toString(36);
}

export async function savePrayer(data: Omit<SharedPrayer, 'id' | 'createdAt'>): Promise<string> {
  const contentHash = generateContentHash(data);
  
  try {
    const client = await getRedis();
    
    const existingId = await client.get(`hash:${contentHash}`);
    if (existingId && typeof existingId === 'string') {
      console.log(`[savePrayer] Found existing prayer for hash: ${contentHash} -> ${existingId}`);
      await client.expire(`prayer:${existingId}`, PRAYER_TTL_SECONDS);
      await client.expire(`hash:${contentHash}`, PRAYER_TTL_SECONDS);
      return existingId;
    }
    
    const id = generateUUID();
    const prayer: SharedPrayer = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
    };
    
    console.log(`[savePrayer] Saving new prayer ID: ${id}, hash: ${contentHash}`);
    await client.setEx(`prayer:${id}`, PRAYER_TTL_SECONDS, JSON.stringify(prayer));
    await client.setEx(`hash:${contentHash}`, PRAYER_TTL_SECONDS, id);
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
    
    return data && typeof data === 'string' ? JSON.parse(data) : null;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[getPrayer] Error:', errorMessage);
    return null;
  }
}
