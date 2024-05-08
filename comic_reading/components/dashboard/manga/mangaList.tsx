import React, { ReactNode } from 'react';

interface MangaListProps {
    className?: string;
    children?: ReactNode;
}

function MangaList({ className = '', children }: MangaListProps) {
    return (
        <div className={`bg-[#444444] rounded-3xl p-4 pb-0 h-[5h] ${className}`}>
            {children}
        </div>
    );
}

export default MangaList;