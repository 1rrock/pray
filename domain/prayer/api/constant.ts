// API 경로
export const API_ROUTES = {
  SPEECH_TO_TEXT: '/api/speech-to-text',
  GENERATE_RESPONSE: '/api/generate-response',
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  STT_ERROR: '음성 인식에 실패했습니다. 다시 시도해주세요.',
  AI_ERROR: 'AI 응답 생성에 실패했습니다. 잠시 후 다시 시도해주세요.',
  MICROPHONE_ERROR: '마이크 권한이 필요합니다.',
  RECORDING_ERROR: '녹음 중 오류가 발생했습니다.',
  TEXT_TOO_LONG: '기도문은 최대 500자까지 입력 가능합니다.',
  RECORDING_TOO_LONG: '음성 녹음은 최대 2분까지 가능합니다.',
} as const;

// 제한 사항
export const LIMITS = {
  MAX_TEXT_LENGTH: 500,
  MAX_RECORDING_TIME: 120, // 초 (2분)
} as const;

// 위기 키워드 (간단한 키워드 기반 감지)
export const CRISIS_KEYWORDS = [
  '자살',
  '죽고 싶',
  '자해',
  '목숨',
  '죽음',
  '살기 싫',
] as const;

// 위기 상담 전화번호
export const CRISIS_RESOURCES = {
  SUICIDE_PREVENTION: {
    name: '자살예방상담전화',
    number: '1393',
  },
  MENTAL_HEALTH: {
    name: '정신건강위기상담전화',
    number: '1577-0199',
  },
  YOUTH_COUNSELING: {
    name: '청소년전화',
    number: '1388',
  },
} as const;

