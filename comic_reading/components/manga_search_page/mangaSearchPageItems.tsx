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
    function timeSince(date: string) {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + " năm";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " tháng";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 7) {
            const dateObj = new Date(date);
            const day = ("0" + dateObj.getDate()).slice(-2);
            const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
            const year = dateObj.getFullYear();
            return `${day}-${month}-${year}`;
        } else if (interval > 1) {
            return interval + " ngày";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " giờ";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " phút";
        }
        return Math.floor(seconds) + " giây";
    }
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
                    <span>Cập nhật mới nhất: {timeSince(updateAt)}</span>
                </div>
            </div>
        </Link>
    );
}

export default MangaSearchPageItem;