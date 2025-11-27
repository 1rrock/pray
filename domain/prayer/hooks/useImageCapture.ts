import { useCallback, useState } from 'react';
// @ts-ignore - dom-to-image-more has no type definitions
import domtoimage from 'dom-to-image-more';

interface UseImageCaptureOptions {
  filename?: string;
  backgroundColor?: string;
  scale?: number;
}

export function useImageCapture(options?: UseImageCaptureOptions) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * HTML 요소를 이미지로 캡처하여 다운로드
   */
  const captureAndDownload = useCallback(
    async (elementId: string) => {
      try {
        setIsCapturing(true);
        setError(null);

        const element = document.getElementById(elementId);
        if (!element) {
          throw new Error('캡처할 요소를 찾을 수 없습니다.');
        }

        // dom-to-image-more로 PNG blob 생성
        const blob = await domtoimage.toBlob(element, {
          bgcolor: options?.backgroundColor || '#fffef0',
          width: element.scrollWidth,
          height: element.scrollHeight,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
          },
          // 고해상도를 위한 픽셀 비율
          quality: 1,
        });

        if (!blob) {
          throw new Error('이미지 생성에 실패했습니다.');
        }

        // 다운로드 링크 생성
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = options?.filename || `기도응답_${new Date().getTime()}.png`;

        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setIsCapturing(false);
      } catch (err) {
        console.error('Image capture error:', err);
        setError(err instanceof Error ? err.message : '이미지 저장에 실패했습니다.');
        setIsCapturing(false);
      }
    },
    [options]
  );

  /**
   * HTML 요소를 이미지로 캡처하여 Blob 반환 (공유용)
   */
  const captureToBlob = useCallback(
    async (elementId: string): Promise<Blob | null> => {
      try {
        setIsCapturing(true);
        setError(null);

        const element = document.getElementById(elementId);
        if (!element) {
          throw new Error('캡처할 요소를 찾을 수 없습니다.');
        }

        // 캡처 전 모든 outline 제거
        const allElements = element.querySelectorAll('*');
        const originalOutlines: Map<Element, string> = new Map();

        allElements.forEach(el => {
          const htmlEl = el as HTMLElement;
          const computedStyle = window.getComputedStyle(el);
          originalOutlines.set(el, computedStyle.outline);
          htmlEl.style.outline = 'none';
        });

        // dom-to-image-more로 PNG blob 생성
        const blob = await domtoimage.toBlob(element, {
          bgcolor: options?.backgroundColor || '#fffef0',
          width: element.scrollWidth,
          height: element.scrollHeight,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
          },
          quality: 1,
        });

        // outline 복원
        allElements.forEach(el => {
          const htmlEl = el as HTMLElement;
          const originalOutline = originalOutlines.get(el);
          if (originalOutline) {
            htmlEl.style.outline = originalOutline;
          }
        });

        setIsCapturing(false);
        return blob;
      } catch (err) {
        console.error('Image capture error:', err);
        setError(err instanceof Error ? err.message : '이미지 생성에 실패했습니다.');
        setIsCapturing(false);
        return null;
      }
    },
    [options]
  );

  return {
    captureAndDownload,
    captureToBlob,
    isCapturing,
    error,
  };
}

