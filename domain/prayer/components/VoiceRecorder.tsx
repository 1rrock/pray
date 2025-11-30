'use client';

import React, {useState, useRef, useCallback, useEffect} from 'react';
import {Mic, Send, Sparkles, ArrowLeft} from 'lucide-react';
import {motion} from 'framer-motion';
import {Button} from '@/shared/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/shared/components/ui/card';
import {usePrayerStore} from '../store/prayerStore';
import {useSpeechToTextMutation} from '../api/query';
import {ERROR_MESSAGES, LIMITS} from '../api/constant';

interface VoiceRecorderProps {
    onTranscriptionComplete: (text: string) => void;
    onClose?: () => void;
    isNavigating?: boolean;
}

export function VoiceRecorder({onTranscriptionComplete, onClose, isNavigating = false}: VoiceRecorderProps) {
    const {isRecording, setRecording, setError} = usePrayerStore();
    const [recordingTime, setRecordingTime] = useState(0);
    const [submissionStarted, setSubmissionStarted] = useState(false); // <-- new
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // useMutation 사용
    const speechToTextMutation = useSpeechToTextMutation();
    const isProcessing = speechToTextMutation.isPending;

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            // set submission flag immediately to prevent UI flash while onstop runs
            setSubmissionStarted(true);
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    }, [isRecording, setRecording]);

    useEffect(() => {
        if (isRecording) {
            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => {
                    if (prev >= LIMITS.MAX_RECORDING_TIME) {
                        stopRecording();
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
            // Reset submission flag when new recording starts
            setSubmissionStarted(false);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            setRecordingTime(0);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRecording]);

    const startRecording = useCallback(async () => {
        try {
            // 브라우저 호환성 체크
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                const isHttps = window.location.protocol === 'https:';

                if (!isLocalhost && !isHttps) {
                    alert('🔒 보안 오류\n\n음성 녹음은 보안상의 이유로 HTTPS 또는 localhost에서만 사용할 수 있습니다.\n\n해결 방법:\n1. localhost:3000 으로 접속하거나\n2. HTTPS를 사용해주세요.\n\n대신 "글로 기도하기"를 사용해주세요.');
                    setError('음성 녹음은 HTTPS 또는 localhost에서만 사용 가능합니다.');
                } else {
                    alert('이 브라우저는 음성 녹음을 지원하지 않습니다.\n\nChrome, Safari, Firefox 등 최신 브라우저를 사용해주세요.');
                    setError('브라우저가 음성 녹음을 지원하지 않습니다.');
                }
                if (onClose) onClose();
                return;
            }

            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, {
                    type: 'audio/webm',
                });

                try {
                    // indicate submission has started to keep UI in processing state
                    setSubmissionStarted(true);

                    // useMutation 사용
                    const transcription = await speechToTextMutation.mutateAsync(audioBlob);
                    onTranscriptionComplete(transcription);
                } catch (error) {
                    console.error('Transcription error:', error);
                    setError(ERROR_MESSAGES.STT_ERROR);
                    // reset submission flag on error so UI returns to recording state
                    setSubmissionStarted(false);
                }

                stream.getTracks().forEach((track) => track.stop());
            };

            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error('Microphone error:', error);
            const err = error as { name?: string; message?: string };
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                alert('🎤 마이크 권한 거부\n\n마이크 권한이 거부되었습니다.\n브라우저 설정에서 마이크 권한을 허용해주세요.');
                setError('마이크 권한이 필요합니다.');
            } else if (err.name === 'NotFoundError') {
                alert('🎤 마이크 없음\n\n마이크를 찾을 수 없습니다.\n마이크가 연결되어 있는지 확인해주세요.');
                setError('마이크를 찾을 수 없습니다.');
            } else {
                alert('마이크 접근 중 오류가 발생했습니다.\n\n' + (err.message || '알 수 없는 오류'));
                setError(ERROR_MESSAGES.MICROPHONE_ERROR);
            }
            if (onClose) onClose();
        }
    }, [setRecording, setError, onTranscriptionComplete, onClose, speechToTextMutation]);

    // removed auto-start useEffect to avoid starting recording on mount
    // NOTE: Recording now starts only when the user presses the Start button.

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleClose = () => {
        if (isRecording) {
            stopRecording();
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <Card
            className="border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-b from-white to-amber-50 dark:from-amber-950 dark:to-amber-900 shadow-2xl relative"
            role="region"
            aria-label="음성 기도 녹음">
            <CardHeader className="text-center space-y-2">
                <div className="flex justify-center mb-2">
                    <div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 via-amber-300 to-yellow-400 dark:from-yellow-600 dark:via-amber-600 dark:to-yellow-700 flex items-center justify-center border-2 border-amber-400 dark:border-amber-500"
                        role="img"
                        aria-label="반짝이는 별 아이콘">
                        <Sparkles className="w-8 h-8 text-amber-900 dark:text-amber-100" aria-hidden="true"/>
                    </div>
                </div>
                <CardTitle className="text-2xl text-amber-900 dark:text-amber-100">
                    하나님께 기도를 올려주세요
                </CardTitle>
                <CardDescription className="text-amber-700 dark:text-amber-300">
                    하나님의 계시로 응답하실 것입니다
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* 마이크 아이콘 */}
                <div className="flex justify-center" role="status" aria-live="polite" aria-label={isRecording ? "녹음 중" : "녹음 대기"}>
                    <motion.div
                        animate={isRecording ? {scale: [1, 1.1, 1]} : {}}
                        transition={{repeat: Infinity, duration: 1.5}}
                        className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-200 to-yellow-300 dark:from-amber-800/40 dark:to-yellow-800/40 flex items-center justify-center border-4 border-amber-300 dark:border-amber-700 shadow-lg"
                        role="img"
                        aria-label="마이크 아이콘">
                        <Mic className="w-20 h-20 text-amber-900 dark:text-amber-200" aria-hidden="true"/>
                    </motion.div>
                </div>

                {/* 안내 메시지 */}
                <div className="text-center space-y-3">
                    {(isProcessing || isNavigating || submissionStarted) ? (
                        <div className="space-y-2">
                            <motion.div
                                animate={{rotate: 360}}
                                transition={{duration: 1, repeat: Infinity, ease: "linear"}}
                                className="w-8 h-8 border-3 border-amber-700 dark:border-amber-300 border-t-transparent rounded-full mx-auto"
                            />
                            <p className="text-amber-800 dark:text-amber-200 font-medium text-lg">
                                하나님의 계시를 받는 중...
                            </p>
                        </div>
                    ) : (
                        <div
                            className="bg-amber-100/50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                            <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed italic">
                                &quot;하나님, 요즘 힘든 일들이 많아서 지쳐있습니다. 힘과 용기를 주세요.&quot;
                            </p>
                            <p className="text-amber-600 dark:text-amber-400 text-xs mt-2">
                                위와 같이 자유롭게 말씀해주세요
                            </p>
                        </div>
                    )}
                </div>

                {/* 녹음 시간 */}
                {isRecording && !isProcessing && !isNavigating && !submissionStarted && (
                    <div
                        className="text-center space-y-2 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800"
                        role="timer"
                        aria-live="polite"
                        aria-atomic="true">
                        <p className="text-4xl font-bold text-amber-700 dark:text-amber-300 tabular-nums" aria-label={`녹음 시간 ${formatTime(recordingTime)}`}>
                            {formatTime(recordingTime)}
                        </p>
                        <p className="text-sm text-amber-600 dark:text-amber-400">
                            최대 {formatTime(LIMITS.MAX_RECORDING_TIME)}
                        </p>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex-col gap-3">
                {/* Start recording button when idle */}
                {!isRecording && !isProcessing && !isNavigating && !submissionStarted && (
                    <Button
                        onClick={startRecording}
                        size="lg"
                        className="w-full h-14 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:via-amber-600 hover:to-yellow-700 text-amber-900 font-semibold shadow-lg text-base"
                        type="button"
                        aria-label="녹음 시작"
                    >
                        <Mic className="mr-2 h-5 w-5" aria-hidden="true"/>
                        녹음 시작
                    </Button>
                )}

                {/* 올리기(녹음 중지 및 제출) 버튼 */}
                {isRecording && !isProcessing && !isNavigating && !submissionStarted && (
                    <Button
                        onClick={stopRecording}
                        size="lg"
                        className="w-full h-14 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:via-amber-600 hover:to-yellow-700 text-amber-900 font-semibold shadow-lg text-base"
                        type="button"
                        aria-label="녹음 완료하고 기도 올리기"
                    >
                        <Send className="mr-2 h-5 w-5" aria-hidden="true"/>
                        하나님의 계시 받기
                    </Button>
                )}

                <button
                    type="button"
                    onClick={handleClose}
                    className="text-sm text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 py-2 flex items-center gap-2 font-medium transition-colors"
                    aria-label="음성 녹음 취소하고 처음으로 돌아가기"
                >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true"/>
                    처음으로
                </button>
            </CardFooter>
        </Card>
    );
}
