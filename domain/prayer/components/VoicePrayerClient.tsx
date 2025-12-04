'use client';

import {useState} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import {VoiceRecorder} from './VoiceRecorder';
import {usePrayer} from '@/domain/prayer/hooks/usePrayer';

export default function VoicePrayerClient() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.startsWith('/en') ? 'en' : 'ko';
    const {submitPrayer} = usePrayer();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleVoiceTranscription = async (text: string) => {
        try {
            setIsNavigating(true);
            await submitPrayer(text, 'voice', locale);
            router.push(`/${locale}/pray/scripture`);
        } catch (error) {
            console.error('Submit error:', error);
            setIsNavigating(false);
        }
    };

    const handleClose = () => {
        router.push(`/${locale}`);
    };

    return (
        <div className="w-full max-w-2xl space-y-4">
            <VoiceRecorder
                onTranscriptionComplete={handleVoiceTranscription}
                onClose={handleClose}
                isNavigating={isNavigating}
                locale={locale}
            />
        </div>
    );
}
