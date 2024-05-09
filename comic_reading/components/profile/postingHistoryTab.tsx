import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../src/service/userService';

interface PostingHistoryProps {
    id?: number;
    className?: string;
    children?: ReactNode;
}

interface PostingHistory {
    id: number;
    user: any;
    manga: any;
}

export function PostingHistoryTab(
    { className = '', children, id }: PostingHistoryProps
) {
    const [followHistories, setFollowHistories] = useState<PostingHistory[]>([]);

    useEffect(() => {
        const fetchFollowgHistories = async () => {
            try {
                const userId = id || 0;
                const data = await userService.getFollowingById({ userId });
                console.log(data.data);
                setFollowHistories(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFollowgHistories();
    }, []);
    const deleteFollowing = async (id: number) => {
        try {
            const data = await userService.deleteFollowingById(id);
            console.log(data);
            const newFollowHistories = followHistories.filter(history => history.id !== id);
            setFollowHistories(newFollowHistories);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h2 className='text-bold my-4'>LỊCH SỬ ĐĂNG TRUYỆN</h2>
            <div className={`bg-[#444444] rounded-xl p-4 pr-12 mb-4 last:mb-0 ${className} w-3/4`}>
                {followHistories.map((history, index) => (
                    <PostingHistoryItem
                        key={index}
                        id={history.manga.id}
                        imageUrl={history.manga.coverImage}
                        mangaName={history.manga.name}
                        posterName={history.user.author}
                        deleteFollowing={() => deleteFollowing(followHistories[index].id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default PostingHistoryTab;


interface PostingHistoryItemProps {
    id?: number;
    imageUrl?: string;
    mangaName?: string;
    posterName?: string;
    chapter?: string;
    deleteFollowing?: () => Promise<void>;
}


export function PostingHistoryItem(
    {
        id = 1,
        imageUrl = 'https://st.nhattruyenss.com/data/comics/228/blue-archive-global.jpg',
        mangaName = 'Manga Name',
        posterName = 'Poster Name',
        chapter = 'Chapter 1',
        deleteFollowing }: PostingHistoryItemProps) {
    return (
        <div className="w-full h-18 flex items-center pb-2">
            <img src={imageUrl} alt="Manga" className="w-20 h-24 mr-4" />
            <div className="flex flex-col justify-between mr-4">
                <Link to={`/manga-info/${id}`}>
                    <span className="text-bold text-xl">{mangaName}</span>
                </Link>
                <span>{posterName}</span>
            </div>
            <div className="flex flex-grow items-center justify-center">
                <span>{chapter}</span>
            </div>
            <div className="flex items-center">
                <button className="bg-[#ED741B] text-white font-bold py-2 px-4 rounded mt-4">
                    Đăng truyện
                </button>
            </div>
        </div>
    );
}
