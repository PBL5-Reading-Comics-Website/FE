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
        <Link to={`/manga-info/${id}`} className="w-full">
            <div className="flex h-auto w-full items-start no-underline text-white text-decoration-none p-2 rounded-xl hover:text-white">
                <img src={coverImage} alt="Manga" className="w-32 h-48 mr-4 rounded-xl" />
                <div className="flex flex-col">
                    <span className="font-bold text-xl">{name}</span>
                    <span className="font-semibold text-lg">{author}</span>
                    <span>Đăng bởi: {updateUser}</span>
                    <span>Lượt xem: {viewNumber}</span>
                    <span>Tình trạng: {status}</span>
                    <span>Cập nhật mới nhất: {updateAt}</span>
                </div>
            </div>
        </Link>
    );
}

export default MangaSearchPageItem;