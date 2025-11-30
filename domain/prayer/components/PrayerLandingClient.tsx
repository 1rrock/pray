'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PrayerInput } from './PrayerInput';

export default function PrayerLandingClient() {
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
                <PrayerInput />
            </motion.div>
        </AnimatePresence>
    );
}
