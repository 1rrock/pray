import { useCallback } from 'react';
import { usePrayerStore } from '../store/prayerStore';
import { useGenerateResponseMutation } from '../api/query';
import type { InputMethod } from '../api/type';
import { CRISIS_KEYWORDS } from '../api/constant';

export function usePrayer() {
  const {
    currentPrayer,
    response,
    error,
    setPrayer,
    setResponse,
    setError,
    reset,
  } = usePrayerStore();

  // useMutation 사용
  const generateResponseMutation = useGenerateResponseMutation();
  const isLoading = generateResponseMutation.isPending;

  /**
   * 위기 키워드 감지
   */
  const detectCrisis = useCallback((text: string): boolean => {
    return CRISIS_KEYWORDS.some((keyword) => text.includes(keyword));
  }, []);

  /**
   * 기도 제출 및 AI 응답 생성
   */
  const submitPrayer = useCallback(
    async (prayerText: string, method: InputMethod) => {
      try {
        setError(null);

        // 기도 저장
        const prayer = {
          text: prayerText,
          method,
          timestamp: new Date(),
        };
        setPrayer(prayer);

        // AI 응답 생성 (useMutation 사용)
        const { response: aiResponse } = await generateResponseMutation.mutateAsync(prayerText);
        setResponse(aiResponse);

        return { response: aiResponse, hasCrisis: detectCrisis(prayerText) };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : '오류가 발생했습니다.';
        setError(errorMessage);
        throw err;
      }
    },
    [setPrayer, setResponse, setError, detectCrisis, generateResponseMutation]
  );

  /**
   * 새로운 기도 시작 (상태 초기화)
   */
  const startNewPrayer = useCallback(() => {
    reset();
  }, [reset]);

  return {
    currentPrayer,
    response,
    isLoading,
    error,
    submitPrayer,
    startNewPrayer,
    detectCrisis,
  };
}

