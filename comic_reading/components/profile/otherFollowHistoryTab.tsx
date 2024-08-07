import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../src/service/userService';
import React from 'react';

interface FollowHistoryProps {
    id?: number;
    className?: string;
    children?: ReactNode;
}

interface FollowHistory {
    id: number;
    user: any;
    manga: any;
}

export function OtherFollowHistoryTab(
    { className = '', children, id }: FollowHistoryProps
) {
    const [followHistories, setFollowHistories] = useState<FollowHistory[]>([]);

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
        <div className=''>
            <h2 className='text-bold my-4'>LỊCH SỬ THEO DÕI</h2>
            {followHistories.map((history, index) => (
                <div className={`bg-[#444444] rounded-xl p-4 pr-12 ${className} w-3/4`}>
                    <FollowHistoryItem
                        key={index}
                        id={history.manga.id}
                        imageUrl={history.manga.coverImage}
                        mangaName={history.manga.name}
                        posterName={history.user.author}
                        deleteFollowing={() => deleteFollowing(followHistories[index].id)}
                    />
                </div>
            ))}
        </div>
    );
}

export default OtherFollowHistoryTab;


interface FollowHistoryItemProps {
    id?: number;
    imageUrl?: string;
    mangaName?: string;
    posterName?: string;
    chapter?: string;
    deleteFollowing?: () => Promise<void>;
}


export function FollowHistoryItem(
    {
        id = 1,
        imageUrl = 'https://st.nhattruyenss.com/data/comics/228/blue-archive-global.jpg',
        mangaName = 'Manga Name',
        posterName = 'Poster Name',
        chapter = 'Chapter 1',
        deleteFollowing }: FollowHistoryItemProps) {
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
        </div>
    );
}
