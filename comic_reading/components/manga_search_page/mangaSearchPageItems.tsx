import { Link } from 'react-router-dom';

interface Manga {
    id: number;
    name: string;
    publishingCompany: string;
    author: string;
    artist: string;
    coverImage: string;
    status: string;
    readingStatus: string;
    viewNumber: number;
    favouriteNumber: number;
    commentNumber: number;
    publishAt: string;
    updateAt: string;
    updateUser: string | null;
    tags: string[];
}

export function MangaSearchPageItem({
    id,
    coverImage,
    name,
    author,
    updateUser,
    updateAt,
    viewNumber,
    status
}: Manga) {
    return (
        <Link to={`/manga-info/${id}`} className="w-full h-auto flex flex-col items-start no-underline text-white text-decoration-none p-4 rounded-xl hover:text-white">
            <div className="w-full flex items-center mb-4">
                <img src={coverImage} alt="Manga" className="w-32 h-48 mr-4 rounded-xl" />
                <div className="flex flex-col justify-between">
                    <span className="text-bold text-xl">{name}</span>
                    <span>{author}</span>
                </div>
                <div className="w-px bg-orange-500 mr-4"></div>
                <div className="flex flex-col justify-between ml-auto">
                    <span>Posted by: {updateUser}</span>
                    <span>Views: {viewNumber}</span>
                    <span>Status: {status}</span>
                    <span>Updated at: {updateAt}</span>
                </div>
            </div>
        </Link>
    );
}

export default MangaSearchPageItem;