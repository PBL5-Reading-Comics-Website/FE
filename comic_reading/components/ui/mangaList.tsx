import React, { ReactNode } from 'react';

interface MangaListProps {
    className?: string;
    children?: ReactNode;
}

function MangaList({ className = '', children }: MangaListProps) {
    return (
        <div className={`bg-[#444444] rounded-3xl p-8 h-[5h] ${className}`}>
            {children}
        </div>
    );
}

export default MangaList;