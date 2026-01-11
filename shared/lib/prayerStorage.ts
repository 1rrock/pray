import { Redis } from '@upstash/redis';

const PRAYER_TTL_SECONDS = 7 * 24 * 60 * 60;

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set');
  }

  return new Redis({ url, token });
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
  let hash = 5381;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) + hash) + content.charCodeAt(i);
  }
  return Math.abs(hash).toString(36);
}

export async function savePrayer(data: Omit<SharedPrayer, 'id' | 'createdAt'>): Promise<string> {
  const contentHash = generateContentHash(data);
  const redis = getRedis();

  const existingId = await redis.get<string>(`hash:${contentHash}`);
  if (existingId) {
    console.log(`[savePrayer] Found existing prayer for hash: ${contentHash} -> ${existingId}`);
    await redis.expire(`prayer:${existingId}`, PRAYER_TTL_SECONDS);
    await redis.expire(`hash:${contentHash}`, PRAYER_TTL_SECONDS);
    return existingId;
  }

  const id = generateUUID();
  const prayer: SharedPrayer = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
  };

  console.log(`[savePrayer] Saving new prayer ID: ${id}, hash: ${contentHash}`);
  await redis.setex(`prayer:${id}`, PRAYER_TTL_SECONDS, JSON.stringify(prayer));
  await redis.setex(`hash:${contentHash}`, PRAYER_TTL_SECONDS, id);
  console.log(`[savePrayer] Success: ${id}`);

  return id;
}

export async function getPrayer(id: string): Promise<SharedPrayer | null> {
  const redis = getRedis();

  console.log(`[getPrayer] Getting prayer ID: ${id}`);
  const data = await redis.get<string>(`prayer:${id}`);
  console.log(`[getPrayer] Found: ${!!data}`);

  if (!data) return null;

  return typeof data === 'string' ? JSON.parse(data) : data;
}
