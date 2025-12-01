import React from 'react';

interface PageHeaderProps {
    title: string;
    description: string;
}

export function PageHeader({title, description}: PageHeaderProps) {
    return (
        <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-100 mb-3">
                {title}
            </h1>
            <p className="text-base text-amber-700 dark:text-amber-300 max-w-2xl mx-auto">
                {description}
            </p>
        </header>
    );
}

