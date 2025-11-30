import VoicePrayerClient from '@/domain/prayer/components/VoicePrayerClient';

export default function VoicePrayerPage() {
    return (
        <div className="h-dvh flex justify-center p-4 overflow-y-auto">
            <main className="w-full max-w-2xl">
                {/* Client interactive recorder */}
                <VoicePrayerClient/>
            </main>
        </div>
    );
}
