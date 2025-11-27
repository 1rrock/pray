// 기도 관련 타입 정의
export type InputMethod = 'text' | 'voice';

export interface Prayer {
  text: string;
  method: InputMethod;
  timestamp: Date;
}

export interface BibleVerse {
  book: string;      // 성경 책 (예: "요한복음")
  chapter: number;   // 장
  verse: number;     // 절
  text: string;      // 구절 전체 텍스트
}

export interface AIResponse {
  bibleVerse: BibleVerse;
  guidance: string;  // 영적 지도 메시지
  timestamp: Date;
}

export interface SpeechToTextResponse {
  text: string;
  confidence: number;
}

export interface GenerateResponseRequest {
  prayerText: string;
  recipientName?: string;
}

export interface GenerateResponseResponse {
  response: AIResponse;
}

