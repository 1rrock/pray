# 🙏 Pray - 기도와 함께하는 하나님의 말씀

텍스트 또는 음성으로 기도를 입력하면 AI가 관련 성경 구절과 영적 지도를 제공하는 웹 애플리케이션입니다.

## ✨ 주요 기능

- 📝 **텍스트 기도 입력**: 최대 500자까지 기도문 작성
- 🎤 **음성 기도 입력**: 최대 2분까지 음성 녹음 및 자동 변환 (Google Speech-to-Text)
- 📖 **성경 구절 응답**: OpenAI GPT-4가 기도에 맞는 성경 구절 제시
- 💬 **영적 지도**: 따뜻하고 위로가 되는 메시지 제공
- 🔗 **공유 기능**: 카카오톡, 링크 복사 등으로 응답 공유
- ⚠️ **위기 감지**: 위기 키워드 감지 시 상담 전화번호 안내
- 💰 **Google AdSense**: 광고 수익화 지원

## 🛠 기술 스택

- **Frontend**: Next.js 16.0.4, React 19.2.0, TypeScript
- **UI**: shadcn/ui, Tailwind CSS 4
- **상태 관리**: Zustand
- **애니메이션**: Framer Motion
- **AI**: OpenAI GPT-4
- **STT**: Google Cloud Speech-to-Text API
- **광고**: Google AdSense (예정)
- **보안**: IP 기반 Rate Limiting (API 비용 절감)

## 🔒 API Rate Limiting

API 비용을 절감하고 남용을 방지하기 위해 rate limiting이 구현되어 있습니다:

- **AI 응답 생성**: 1분당 3회
- **음성 인식**: 1분당 5회

자세한 내용은 [RATE_LIMITING.md](./RATE_LIMITING.md)를 참고하세요.

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example`을 참고하여 `.env` 파일을 생성하고 필요한 API 키를 설정합니다:

```env
# OpenAI API Key (필수)
OPENAI_API_KEY="your-openai-api-key"

# OpenAI System Prompt (필수)
OPENAI_SYSTEM_PROMPT="당신은 따뜻하고 지혜로운 영적 상담자입니다..."

# Google Cloud Speech-to-Text (필수)
GOOGLE_APPLICATION_CREDENTIALS="./google-credentials.json"
```

**중요**: `OPENAI_SYSTEM_PROMPT`는 AI의 응답 형식과 스타일을 정의합니다. `.env.example`의 기본값을 사용하거나 필요에 따라 수정할 수 있습니다.

**Google Cloud 설정**: `GOOGLE_CLOUD_SETUP.md` 파일을 참고하여 Speech-to-Text API를 설정하세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 프로덕션 빌드

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
pray/
├── app/                          # Next.js 앱 디렉토리
│   ├── api/                      # API 라우트
│   │   ├── speech-to-text/       # Google STT API
│   │   └── generate-response/    # OpenAI API
│   ├── page.tsx                  # 메인 페이지
│   ├── layout.tsx                # 레이아웃
│   └── globals.css               # 글로벌 스타일
├── domain/prayer/                # 기도 도메인 로직
│   ├── api/                      # API 호출 및 타입
│   ├── hooks/                    # 커스텀 훅
│   ├── store/                    # Zustand 스토어
│   └── components/               # 도메인 컴포넌트
│       ├── PrayerInput.tsx       # 기도 입력 폼
│       ├── VoiceRecorder.tsx     # 음성 녹음
│       ├── ResponseDisplay.tsx   # 응답 표시
│       ├── ShareButtons.tsx      # 공유 버튼
│       └── AdInterstitial.tsx    # 전면 광고
├── shared/                       # 공유 리소스
│   ├── components/ui/            # shadcn/ui 컴포넌트
│   └── lib/                      # 유틸리티
└── specs/                        # 기능 명세서
```

## 🔑 API 키 발급

### OpenAI API

1. [OpenAI Platform](https://platform.openai.com/)에 가입
2. API Keys 섹션에서 새 키 생성
3. `.env` 파일에 `OPENAI_API_KEY` 추가

### Google Cloud Speech-to-Text

자세한 설정 방법은 `GOOGLE_CLOUD_SETUP.md` 파일을 참고하세요.

## 📝 사용 방법

1. **기도 입력**: 텍스트로 직접 입력하거나 음성 녹음 버튼을 눌러 기도하세요
2. **광고 시청**: 30초 광고를 시청하는 동안 AI가 응답을 생성합니다 (15초 후 건너뛰기 가능)
3. **응답 확인**: 관련 성경 구절과 영적 지도 메시지를 확인하세요
4. **공유**: 받은 말씀을 카카오톡이나 링크 복사로 공유하세요
5. **새 기도**: "새로운 기도 시작하기" 버튼을 눌러 다시 기도하세요

## ⚠️ 제한 사항

- 텍스트 기도: 최대 500자
- 음성 기도: 최대 2분
- API 요청: 1분당 3-5회 (비용 절감)
- 한국어만 지원 (초기 버전)

## 🚀 향후 계획

- [ ] Google AdSense 실제 통합
- [ ] 카카오 공유 SDK 통합
- [ ] 기도 이력 저장 기능 (로컬/클라우드)
- [ ] 다국어 지원 (영어, 중국어 등)
- [ ] 모바일 앱 (React Native)
- [ ] 푸시 알림 (일일 말씀)

## 📄 라이선스

MIT License

## 🙏 기여

이슈 및 풀 리퀘스트를 환영합니다!


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
