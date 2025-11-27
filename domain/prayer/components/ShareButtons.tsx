'use client';

import {useState} from 'react';
import {Share2, Link as LinkIcon, Check} from 'lucide-react';
import {Button} from '@/shared/components/ui/button';
import type {AIResponse} from '../api/type';

interface ShareButtonsProps {
    response: AIResponse;
}

export function ShareButtons({response}: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const generateShareText = () => {
        const {bibleVerse, guidance} = response;
        return `📖 ${bibleVerse.book} ${bibleVerse.chapter}:${bibleVerse.verse}

"${bibleVerse.text}"

${guidance}

🙏 Pray 앱에서 받은 말씀`;
    };

    const handleCopyLink = async () => {
        try {
            const text = generateShareText();
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Copy failed:', error);
        }
    };

    const handleWebShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: '기도 응답',
                    text: generateShareText(),
                });
            } catch (error) {
                console.error('Share failed:', error);
            }
        } else {
            // Web Share API를 지원하지 않으면 복사로 대체
            await handleCopyLink();
        }
    };

    return (
        <div className="flex gap-2 flex-1">
            <Button
                onClick={handleWebShare}
                variant="default"
                className="flex-1"
            >
                <Share2 className="mr-2 h-4 w-4"/>
                공유하기
            </Button>
            <Button
                onClick={handleCopyLink}
                variant="outline"
                className="flex-1"
            >
                {copied ? (
                    <>
                        <Check className="mr-2 h-4 w-4"/>
                        복사됨
                    </>
                ) : (
                    <>
                        <LinkIcon className="mr-2 h-4 w-4"/>
                        텍스트 복사
                    </>
                )}
            </Button>
        </div>
    );
}

