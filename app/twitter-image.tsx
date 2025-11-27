import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Gido - 기도 AI, 성경 말씀 응답 서비스';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FED7AA 50%, #FEF3C7 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        {/* Church Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            backgroundColor: 'white',
            borderRadius: '60px',
            marginBottom: 40,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 9h4" />
            <path d="M12 7v5" />
            <path d="M14 22v-4a2 2 0 0 0-4 0v4" />
            <path d="M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22" />
            <path d="m18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: '#78350F',
            marginBottom: 20,
            display: 'flex',
          }}
        >
          Gido
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: '#92400E',
            textAlign: 'center',
            display: 'flex',
          }}
        >
          기도 AI · 성경 말씀 응답 서비스
        </div>

        {/* Bible Verse */}
        <div
          style={{
            fontSize: 24,
            color: '#B45309',
            textAlign: 'center',
            marginTop: 40,
            maxWidth: 900,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', marginBottom: 10 }}>
            &quot;구하라, 그리하면 너희에게 주실 것이요&quot;
          </div>
          <div style={{ display: 'flex', fontSize: 20 }}>
            - 마태복음 7:7 -
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

