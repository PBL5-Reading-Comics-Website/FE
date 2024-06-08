import { Link } from "react-router-dom";

interface MangaHorizontalListItemProps {
    id?: string;
    imageUrl?: string;
    mangaName?: string;
}

export function MangaHorizontalListItem({ 
    id = "0",
    imageUrl = 'https://example.com/image.jpg', 
    mangaName = 'Manga Name', 
    
}: MangaHorizontalListItemProps) {
    const maxLength = 40; 

    const shortenedMangaName = mangaName.length > maxLength ? 
        `${mangaName.substring(0, maxLength)}...` :
        mangaName;
    return (
        <Link to={`/manga-info/${id}`}>
        <div className="flex flex-col items-center">
            <img src={imageUrl} alt={mangaName} className="object-cover w-40 h-60 rounded border border-gray-300 overflow-hidden" />
            <p className="text-center text-orange-500 text-lg mt-2">{shortenedMangaName}</p>
        </div>
        </Link>
    );
}

export default MangaHorizontalListItem;