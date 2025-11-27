import { API_ROUTES, ERROR_MESSAGES } from './constant';
import type {
  SpeechToTextResponse,
  GenerateResponseRequest,
  GenerateResponseResponse,
} from './type';

/**
 * 음성을 텍스트로 변환
 */
export async function speechToText(audioBlob: Blob): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    const response = await fetch(API_ROUTES.SPEECH_TO_TEXT, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.STT_ERROR);
    }

    const data: SpeechToTextResponse = await response.json();
    return data.text;
  } catch (error) {
    console.error('Speech to text error:', error);
    throw new Error(ERROR_MESSAGES.STT_ERROR);
  }
}

/**
 * 기도 텍스트를 OpenAI로 전송하여 성경 구절 + 말씀 응답 생성
 */
export async function generateResponse(
  prayerText: string
): Promise<GenerateResponseResponse> {
  try {
    const requestBody: GenerateResponseRequest = { prayerText };

    const response = await fetch(API_ROUTES.GENERATE_RESPONSE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.AI_ERROR);
    }

    const data: GenerateResponseResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Generate response error:', error);
    throw new Error(ERROR_MESSAGES.AI_ERROR);
  }
}

