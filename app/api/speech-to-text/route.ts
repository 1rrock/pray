import { NextRequest, NextResponse } from 'next/server';
import { SpeechClient } from '@google-cloud/speech';

// Google Cloud Speech-to-Text 클라이언트 초기화
// Vercel 환경에서는 GOOGLE_CLOUD_KEY_JSON 환경 변수 사용
let speechClient: SpeechClient;

if (process.env.GOOGLE_CLOUD_KEY_JSON) {
  // JSON 문자열을 파싱하여 인증 정보로 사용
  const credentials = JSON.parse(process.env.GOOGLE_CLOUD_KEY_JSON);
  speechClient = new SpeechClient({
    credentials,
  });
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  // 로컬 개발 환경에서는 파일 경로 사용
  speechClient = new SpeechClient();
} else {
  throw new Error('Google Cloud 인증 정보가 설정되지 않았습니다.');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: '음성 파일이 필요합니다.' },
        { status: 400 }
      );
    }

    // Blob을 Buffer로 변환
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBytes = Buffer.from(arrayBuffer);

    // Google Speech-to-Text API 호출
    const [response] = await speechClient.recognize({
      config: {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 48000,
        languageCode: 'ko-KR',
        enableAutomaticPunctuation: true,
      },
      audio: {
        content: audioBytes.toString('base64'),
      },
    });

    // 변환된 텍스트 추출
    const transcription = response.results
      ?.map((result) => result.alternatives?.[0]?.transcript)
      .join('\n');

    if (!transcription) {
      return NextResponse.json(
        { error: '음성을 인식하지 못했습니다.' },
        { status: 400 }
      );
    }

    const confidence =
      response.results?.[0]?.alternatives?.[0]?.confidence || 0;

    return NextResponse.json({
      text: transcription,
      confidence,
    });
  } catch (error) {
    console.error('Speech-to-text error:', error);
    return NextResponse.json(
      { error: '음성 변환 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

