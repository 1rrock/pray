import { NextRequest, NextResponse } from 'next/server';
import { speechRateLimit } from '@/shared/lib/rateLimit';

export async function POST(request: NextRequest) {
  // Rate limiting 체크 - 1분당 5회로 제한
  const rateLimitResponse = await speechRateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

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
    const base64Audio = audioBytes.toString('base64');

    // Google Cloud 인증 정보 파싱
    const credentials = JSON.parse(process.env.GOOGLE_CLOUD_KEY_JSON || '{}');

    // 액세스 토큰 획득
    const accessToken = await getAccessToken(credentials);

    // Google Speech-to-Text REST API 직접 호출
    const response = await fetch(
      'https://speech.googleapis.com/v1/speech:recognize',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          config: {
            encoding: 'WEBM_OPUS',
            sampleRateHertz: 48000,
            languageCode: 'ko-KR',
            enableAutomaticPunctuation: true,
          },
          audio: {
            content: base64Audio,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Speech API error:', errorText);
      throw new Error(`Speech API error: ${response.statusText}`);
    }

    const data = await response.json();

    // 변환된 텍스트 추출
    const transcription = data.results
      ?.map((result: any) => result.alternatives?.[0]?.transcript)
      .join('\n');

    if (!transcription) {
      return NextResponse.json(
        { error: '음성을 인식하지 못했습니다.' },
        { status: 400 }
      );
    }

    const confidence = data.results?.[0]?.alternatives?.[0]?.confidence || 0;

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

// JWT 토큰 생성 및 액세스 토큰 획득
async function getAccessToken(credentials: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const jwt = await createJWT(claim, credentials.private_key);

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`Failed to get access token: ${tokenResponse.statusText}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

// JWT 생성 (Web Crypto API 사용 - Cloudflare Workers 호환)
async function createJWT(claim: any, privateKey: string): Promise<string> {
  const header = { alg: 'RS256', typ: 'JWT' };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaim = base64UrlEncode(JSON.stringify(claim));
  const unsignedToken = `${encodedHeader}.${encodedClaim}`;

  const key = await importPrivateKey(privateKey);
  const signature = await crypto.subtle.sign(
    { name: 'RSASSA-PKCS1-v1_5' },
    key,
    new TextEncoder().encode(unsignedToken)
  );

  return `${unsignedToken}.${base64UrlEncode(signature)}`;
}

function base64UrlEncode(data: string | ArrayBuffer): string {
  const base64 = typeof data === 'string'
    ? btoa(data)
    : btoa(String.fromCharCode(...new Uint8Array(data)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const pemContents = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g, '');
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
  return crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

