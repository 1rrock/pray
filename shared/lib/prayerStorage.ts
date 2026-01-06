import { kv } from '@vercel/kv';

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
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    throw new Error('Vercel KV is not configured. Please set up KV database in Vercel dashboard.');
  }

  const id = generateUUID();
  const prayer: SharedPrayer = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
  };

  try {
    await kv.set(`prayer:${id}`, JSON.stringify(prayer), { ex: 24 * 60 * 60 });
    return id;
  } catch (error) {
    console.error('KV set error:', error);
    throw new Error('Failed to save prayer to database');
  }
}

export async function getPrayer(id: string): Promise<SharedPrayer | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    throw new Error('Vercel KV is not configured. Please set up KV database in Vercel dashboard.');
  }

  try {
    const data = await kv.get<string>(`prayer:${id}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('KV get error:', error);
    return null;
  }
}
