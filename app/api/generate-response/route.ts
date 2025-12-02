import {NextRequest, NextResponse} from 'next/server';
import OpenAI from 'openai';
import { aiRateLimit } from '@/shared/lib/rateLimit';

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    // Rate limiting 체크 - 1분당 3회로 제한
    const rateLimitResponse = await aiRateLimit(request);
    if (rateLimitResponse) {
        return rateLimitResponse;
    }

    try {
        const {prayerText, recipientName} = await request.json();

        if (!prayerText || typeof prayerText !== 'string') {
            return NextResponse.json(
                {error: '기도 텍스트가 필요합니다.'},
                {status: 400}
            );
        }

        // 환경변수에서 시스템 프롬프트 가져오기
        const systemPrompt = process.env.OPENAI_SYSTEM_PROMPT;

        if (!systemPrompt) {
            throw new Error('OPENAI_SYSTEM_PROMPT 환경변수가 설정되지 않았습니다.');
        }

        // 사용자 메시지 구성
        let userMessage = `저의 기도를 들어주세요:\n\n${prayerText}`;

        // 이름이 있으면 프롬프트에 추가
        if (recipientName && recipientName.trim()) {
            userMessage = `"${recipientName}"에게 전하는 말씀을 부탁드립니다.\n\n기도 내용:\n${prayerText}`;
        }

        // OpenAI API 호출
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt,
                },
                {
                    role: 'user',
                    content: userMessage,
                },
            ],
            temperature: 0.7,
            response_format: {type: 'json_object'},
        });

        const responseText = completion.choices[0]?.message?.content;

        if (!responseText) {
            throw new Error('OpenAI 응답이 비어있습니다.');
        }

        // JSON 파싱
        const parsed = JSON.parse(responseText);

        // 응답 형식 검증
        if (
            !parsed.book ||
            !parsed.chapter ||
            !parsed.verse ||
            !parsed.verseText ||
            !parsed.guidance
        ) {
            throw new Error('OpenAI 응답 형식이 올바르지 않습니다.');
        }

        // 응답 생성
        const response = {
            response: {
                bibleVerse: {
                    book: parsed.book,
                    chapter: Number(parsed.chapter),
                    verse: Number(parsed.verse),
                    text: parsed.verseText,
                },
                guidance: parsed.guidance,
                timestamp: new Date().toISOString(),
            },
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Generate response error:', error);
        return NextResponse.json(
            {
                error: 'AI 응답 생성 중 오류가 발생했습니다.',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            {status: 500}
        );
    }
}

