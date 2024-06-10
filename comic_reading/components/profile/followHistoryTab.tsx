import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../src/service/userService';

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

export function FollowHistoryTab(
  { className = '', children, id }: FollowHistoryProps
) {
  const [followHistories, setFollowHistories] = useState<FollowHistory[]>([]);
  const [isChanged, setIsChanged] = useState(false);

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
  }, [isChanged]);
  const deleteFollowing = async (userId: number, mangaId: number) => {
    try {
      const response = await userService.following({ userId: userId, mangaId: mangaId });
      setIsChanged(!isChanged);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2 className='text-bold my-4'>LỊCH SỬ THEO DÕI</h2>
      {followHistories.map((history, index) => (
        <div key={index} className={`bg-[#444444] rounded-xl p-4 pr-12 mb-4 last:mb-0 ${className} w-3/4`}>
          <FollowHistoryItem
            key={index}
            id={history.manga.id}
            imageUrl={history.manga.coverImage}
            mangaName={history.manga.name}
            posterName={history.user.author}
            deleteFollowing={() => deleteFollowing(followHistories[index].user.id, followHistories[index].manga.id)}
          />
        </div>
      ))}

    </div>

  );
}

export default FollowHistoryTab;


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
    <div className="w-full h-18 flex items-center">
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
        <button className="bg-[#ED741B] text-white font-bold py-2 px-4 rounded mt-4 hover:bg-[#fa854f] transition duration-300 ease-in-out hover:outline-none hover:border-orange-400 hover:ring-2 hover:ring-offset-2 hover:ring-[#f38e4b] shadow-md text-shadow" onClick={() => deleteFollowing && deleteFollowing()}>
          Bỏ theo dõi
        </button>
      </div>
    </div>
  );
}
