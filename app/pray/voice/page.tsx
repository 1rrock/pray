'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { VoiceRecorder } from '@/domain/prayer/components/VoiceRecorder';
import { GoogleAd } from '@/shared/components/GoogleAd';
import { usePrayer } from '@/domain/prayer/hooks/usePrayer';

export default function VoicePrayerPage() {
    const router = useRouter();
    const {submitPrayer} = usePrayer();

    const handleVoiceTranscription = async (text: string) => {
        try {
            await submitPrayer(text, 'voice');
            router.push('/pray/scripture');
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    const handleClose = () => {
        router.push('/');
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:bg-gradient-to-br dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 flex items-center justify-center p-4">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="w-full max-w-2xl space-y-4"
            >
                <VoiceRecorder
                    onTranscriptionComplete={handleVoiceTranscription}
                    onClose={handleClose}
                />

                {/* 하단 광고 */}
                <GoogleAd
                    slot="5375626932"
                />
            </motion.div>
        </div>
    );
}

