import React from "react";

interface MangaHorizontalListItemProps {
    imageUrl?: string;
    mangaName?: string;
}

export function MangaHorizontalListItem({ 
    imageUrl = 'https://example.com/image.jpg', 
    mangaName = 'Manga Name', 
}: MangaHorizontalListItemProps) {
    return (
        <div className="flex flex-col items-center">
            <img src={imageUrl} alt={mangaName} className="object-cover w-40 h-60 rounded border border-gray-300 overflow-hidden" />
            <p className="text-center text-lg mt-2">{mangaName}</p>
        </div>
    );
}

export default MangaHorizontalListItem;