import { NextRequest, NextResponse } from 'next/server';
import { getPrayer } from '@/shared/lib/prayerStorage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const prayer = await getPrayer(id);

    if (!prayer) {
      return NextResponse.json(
        { error: '기도를 찾을 수 없습니다. 링크가 만료되었거나 잘못되었습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(prayer);
  } catch (error) {
    console.error('Get prayer error:', error);
    return NextResponse.json(
      { error: '불러오기 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
