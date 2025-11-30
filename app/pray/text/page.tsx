import React from 'react';
import TextPrayerClient from '@/domain/prayer/components/TextPrayerClient';

export default function TextPrayerPage() {
    return (
        <div className="h-dvh flex justify-center p-4 overflow-y-auto">
            {/* Client interactive form */}
            <TextPrayerClient />
        </div>
    );
}
