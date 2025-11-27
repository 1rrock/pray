import { create } from 'zustand';
import type { Prayer, AIResponse } from '../api/type';

interface PrayerState {
  // 현재 기도
  currentPrayer: Prayer | null;

  // AI 응답
  response: AIResponse | null;

  // 받는 사람 이름
  recipientName: string;

  // 로딩 상태
  isLoading: boolean;
  isRecording: boolean;

  // 에러
  error: string | null;

  // 액션
  setPrayer: (prayer: Prayer) => void;
  setResponse: (response: AIResponse) => void;
  setRecipientName: (name: string) => void;
  setLoading: (isLoading: boolean) => void;
  setRecording: (isRecording: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const usePrayerStore = create<PrayerState>((set) => ({
  currentPrayer: null,
  response: null,
  recipientName: '',
  isLoading: false,
  isRecording: false,
  error: null,

  setPrayer: (prayer) => set({ currentPrayer: prayer }),
  setResponse: (response) => set({ response }),
  setRecipientName: (name) => set({ recipientName: name }),
  setLoading: (isLoading) => set({ isLoading }),
  setRecording: (isRecording) => set({ isRecording }),
  setError: (error) => set({ error }),
  reset: () => set({
    currentPrayer: null,
    response: null,
    recipientName: '',
    isLoading: false,
    isRecording: false,
    error: null,
  }),
}));

