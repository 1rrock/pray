import { NextRequest, NextResponse } from 'next/server';
import { savePrayer } from '@/shared/lib/prayerStorage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      today,
      book,
      chapter,
      verse,
      text,
      guidance,
      prayer,
      recipientName,
    } = body;

    // 필수 필드 검증
    if (!book || !chapter || !verse || !text || !guidance || !prayer) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 기도 저장 및 짧은 ID 생성
    const id = await savePrayer({
      today: today || new Date().toLocaleDateString('ko-KR'),
      book,
      chapter: Number(chapter),
      verse: Number(verse),
      text,
      guidance,
      prayer,
      recipientName,
    });

    // 짧은 URL 반환
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://a-men.vercel.app';
    const shortUrl = `${baseUrl}/s/${id}`;

    return NextResponse.json({
      id,
      shortUrl,
      success: true
    });
  } catch (error) {
    console.error('Save prayer error:', error);
    return NextResponse.json(
      { error: '저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
