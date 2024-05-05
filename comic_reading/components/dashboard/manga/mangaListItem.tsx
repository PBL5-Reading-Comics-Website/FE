
interface MangaListItemProps {
    imageUrl?: string;
    mangaName?: string;
    posterName?: string;
    postTime?: string;
}

export function MangaListItem({ 
    imageUrl = 'https://example.com/image.jpg', 
    mangaName = 'Manga Name', 
    posterName = 'Poster Name', 
    postTime = '10 minutes ago' 
}: MangaListItemProps) {
    return (
        <div className="w-full h-18 flex items-center pb-2">
            <img src={imageUrl} alt="Manga" className="w-20 h-24 mr-4" />
            <div className="flex flex-col justify-between">
                <span className="text-bold text-xl">{mangaName}</span>
                <span>{posterName}</span>
            </div>
            <span className="ml-auto">{postTime}</span>
        </div>
    );
}

export default MangaListItem;