import { useMutation } from '@tanstack/react-query';
import { speechToText, generateResponse } from './fetch';
import type { GenerateResponseResponse } from './type';

/**
 * 음성을 텍스트로 변환하는 mutation
 */
export function useSpeechToTextMutation() {
  return useMutation({
    mutationFn: async (audioBlob: Blob) => {
      return await speechToText(audioBlob);
    },
    onError: (error) => {
      console.error('Speech to text mutation error:', error);
    },
  });
}

/**
 * 기도 텍스트로 AI 응답 생성하는 mutation
 */
export function useGenerateResponseMutation() {
  return useMutation<GenerateResponseResponse, Error, { prayerText: string; recipientName?: string; locale?: 'ko' | 'en' }>({
    mutationFn: async ({ prayerText, recipientName, locale }) => {
      return await generateResponse(prayerText, recipientName, locale);
    },
    onError: (error) => {
      console.error('Generate response mutation error:', error);
    },
  });
}

