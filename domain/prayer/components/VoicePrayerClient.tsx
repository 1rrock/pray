'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {VoiceRecorder} from './VoiceRecorder';
import {usePrayer} from '@/domain/prayer/hooks/usePrayer';
import {usePrayerStore} from '@/domain/prayer/store/prayerStore';
import {Card, CardContent} from '@/shared/components/ui/card';

export default function VoicePrayerClient() {
    const router = useRouter();
    const {submitPrayer} = usePrayer();
    // const {recipientName, setRecipientName} = usePrayerStore();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleVoiceTranscription = async (text: string) => {
        try {
            setIsNavigating(true);
            await submitPrayer(text, 'voice');
            router.push('/pray/scripture');
        } catch (error) {
            console.error('Submit error:', error);
            setIsNavigating(false);
        }
    };

    const handleClose = () => {
        router.push('/');
    };

    // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setRecipientName(e.target.value);
    // };

    return (
        <div className="w-full max-w-2xl space-y-4">
            {/*<Card className="border-2 border-amber-200 dark:border-amber-800 bg-white/90 dark:bg-amber-950/90">*/}
            {/*    <CardContent className="pt-6 space-y-2">*/}
            {/*        <label htmlFor="voice-recipient-name" className="text-sm font-medium text-amber-800 dark:text-amber-200">*/}
            {/*            계시를 받으실 분의 이름 (선택)*/}
            {/*        </label>*/}
            {/*        <input*/}
            {/*            id="voice-recipient-name"*/}
            {/*            type="text"*/}
            {/*            value={recipientName}*/}
            {/*            onChange={handleNameChange}*/}
            {/*            placeholder="예: 김철수, 베드로, 마리아"*/}
            {/*            className="w-full px-4 py-3 border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500 bg-white/80 dark:bg-amber-950/80 text-amber-900 dark:text-amber-100 placeholder:text-amber-500/60 dark:placeholder:text-amber-500/60 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-500/20"*/}
            {/*        />*/}
            {/*        <p className="text-xs text-amber-600 dark:text-amber-400">*/}
            {/*            입력하시면 &quot;{recipientName || '000'}에게 전하는 계시록&quot;으로 응답받습니다*/}
            {/*        </p>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}

            <VoiceRecorder
                onTranscriptionComplete={handleVoiceTranscription}
                onClose={handleClose}
                isNavigating={isNavigating}
            />
        </div>
    );
}
