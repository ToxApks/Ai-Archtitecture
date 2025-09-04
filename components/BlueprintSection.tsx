
import React from 'react';

interface BlueprintSectionProps {
    title: string;
    children: React.ReactNode;
}

export const BlueprintSection: React.FC<BlueprintSectionProps> = ({ title, children }) => {
    return (
        <section className="p-6 bg-white dark:bg-brand-dark/50 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700 text-brand-dark dark:text-brand-light">{title}</h3>
            <div>{children}</div>
        </section>
    );
}
