import { Link } from 'react-router-dom';

interface MangaListItemProps {
    id?: string;
    imageUrl?: string;
    mangaName?: string;
    posterName?: string;
    postTime?: string;
}

export function MangaListItem({ 
    id = '0',
    imageUrl = 'https://example.com/image.jpg', 
    mangaName = 'Manga Name', 
    posterName = 'Poster Name', 
    postTime = '10 minutes ago' 
}: MangaListItemProps) {
    return (
        <Link to={`/manga-info/${id}`} className="w-full h-18 flex items-center hover:bg-gray-600 bg-neutral-600 no-underline text-white text-decoration-none p-2 mb-4 rounded-xl hover:text-white">
            <img src={imageUrl} alt="Manga" className="w-20 h-24 mr-4" />
            <div className="flex flex-col justify-between">
                <span className="text-bold text-xl">{mangaName}</span>
                <span>{posterName}</span>
            </div>
            <span className="ml-auto">{postTime} trước</span>
        </Link>
    );
}

export default MangaListItem;