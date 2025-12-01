'use client';

import React from 'react';
import {ChevronDown} from 'lucide-react';

interface CollapsibleSectionProps {
    title: string;
    icon?: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function CollapsibleSection({title, icon, children, defaultOpen = false}: CollapsibleSectionProps) {
    return (
        <details className="max-w-2xl mx-auto group" open={defaultOpen}>
            <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 hover:shadow-lg transition-all border border-amber-100 dark:border-amber-900/30">
                    <h2 className="text-base font-semibold text-amber-900 dark:text-amber-100">
                        {icon && <span className="mr-2">{icon}</span>}
                        {title}
                    </h2>
                    <ChevronDown className="w-5 h-5 text-amber-600 dark:text-amber-400 transition-transform group-open:rotate-180" />
                </div>
            </summary>
            <div className="mt-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-5 border border-amber-100 dark:border-amber-900/30">
                {children}
            </div>
        </details>
    );
}



