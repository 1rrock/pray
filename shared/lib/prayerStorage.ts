import { Redis } from 'ioredis';

/**
 * Redis 기반 저장소
 * 프로덕션 환경에 적합하며, 메모리 제한 없이 사용 가능
 */

let redis: Redis | null = null;

function getRedis(): Redis {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    redis.on('error', (err) => {
      console.error('Redis connection error:', err.message);
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
  createdAt: string; // Redis에 Date 대신 string 저장
}

// ID 생성 (UUID)
export function generateUUID(): string {
  return crypto.randomUUID();
}

// 기도 저장
export async function savePrayer(data: Omit<SharedPrayer, 'id' | 'createdAt'>): Promise<string> {
  const id = generateUUID();
  const prayer: SharedPrayer = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
  };

  await getRedis().set(`prayer:${id}`, JSON.stringify(prayer), 'EX', 24 * 60 * 60); // 24시간 TTL
  return id;
}

// 기도 불러오기
export async function getPrayer(id: string): Promise<SharedPrayer | null> {
  const data = await getRedis().get(`prayer:${id}`);
  return data ? JSON.parse(data) : null;
}
