import { kv } from '@vercel/kv';

/**
 * Vercel KV 기반 저장소
 * 프로덕션 환경에 적합하며, 메모리 제한 없이 사용 가능
 */

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
  createdAt: string; // KV에 Date 대신 string 저장
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

  await kv.set(`prayer:${id}`, prayer, { ex: 24 * 60 * 60 }); // 24시간 TTL
  return id;
}

// 기도 불러오기
export async function getPrayer(id: string): Promise<SharedPrayer | null> {
  return await kv.get(`prayer:${id}`);
}
