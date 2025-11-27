import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  interval: number; // 시간 윈도우 (밀리초)
  uniqueTokenPerInterval: number; // 시간 윈도우당 최대 요청 수
}

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

// 메모리 기반 rate limit 저장소
const rateLimitMap = new Map<string, RateLimitInfo>();

// 주기적으로 만료된 항목 정리 (5분마다)
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Rate limiter - IP 주소 기반으로 요청 제한
 */
export function rateLimit(config: RateLimitConfig) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    // IP 주소 가져오기
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const now = Date.now();
    const rateLimitInfo = rateLimitMap.get(ip);

    if (!rateLimitInfo) {
      // 첫 번째 요청
      rateLimitMap.set(ip, {
        count: 1,
        resetTime: now + config.interval,
      });
      return null; // 통과
    }

    if (now > rateLimitInfo.resetTime) {
      // 시간 윈도우가 지나서 리셋
      rateLimitMap.set(ip, {
        count: 1,
        resetTime: now + config.interval,
      });
      return null; // 통과
    }

    if (rateLimitInfo.count >= config.uniqueTokenPerInterval) {
      // 제한 초과
      const retryAfter = Math.ceil((rateLimitInfo.resetTime - now) / 1000);

      return NextResponse.json(
        {
          error: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.',
          retryAfter: `${retryAfter}초 후 다시 시도해주세요.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': config.uniqueTokenPerInterval.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitInfo.resetTime.toString(),
          }
        }
      );
    }

    // 카운트 증가
    rateLimitInfo.count += 1;
    rateLimitMap.set(ip, rateLimitInfo);

    return null; // 통과
  };
}

/**
 * 프리셋 rate limiters
 */

// 일반 API - 1분당 10회
export const standardRateLimit = rateLimit({
  interval: 60 * 1000, // 1분
  uniqueTokenPerInterval: 10,
});

// AI API (비용 발생) - 1분당 3회
export const aiRateLimit = rateLimit({
  interval: 60 * 1000, // 1분
  uniqueTokenPerInterval: 3,
});

// 음성 인식 API - 1분당 5회
export const speechRateLimit = rateLimit({
  interval: 60 * 1000, // 1분
  uniqueTokenPerInterval: 5,
});

// 엄격한 제한 - 5분당 5회
export const strictRateLimit = rateLimit({
  interval: 5 * 60 * 1000, // 5분
  uniqueTokenPerInterval: 5,
});

