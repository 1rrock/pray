'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PrayerInput } from './PrayerInput';
import { type Locale } from '@/i18n/config';

export default function PrayerLandingClient({ lang }: { lang: Locale }) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="input"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
            >
                <PrayerInput lang={lang} />
            </motion.div>
        </AnimatePresence>
    );
}
