import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../src/service/userService';

interface ReadHistoryProps {
  className?: string;
  id?: number;
  children?: ReactNode;
}

interface ReadingHistory {
  id: number;
  endAt: string;
  user: any;
  manga: any;
  chapter: any;
}

export function ReadHistoryTab(
  { className = '', children, id }: ReadHistoryProps
) {
  const [readingHistories, setReadingHistories] = useState<ReadingHistory[]>([]);

  useEffect(() => {
    const fetchReadingHistories = async () => {
      try {
        const userId = id || 0;
        const data = await userService.getReadingHistoriesByUserId({ userId });
        console.log(data.data);
        setReadingHistories(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReadingHistories();
  }, []);

  return (
    <div className='pb-5'>
      <h2 className='text-bold my-4'>LỊCH SỬ ĐỌC TRUYỆN</h2>
      {readingHistories.map((history, index) => (
        <div key={index} className={`bg-[#444444] rounded-xl p-4 pr-12 mb-4 last:mb-0 ${className}`}>
          <ReadHistoryItem
            id={history.manga.id}
            imageUrl={history.manga.coverImage}
            mangaName={history.manga.name}
            posterName={history.user.author}
            chapterId={history.chapter.id}
            postTime={history.endAt}
            chapter={history.chapter.name}
          />
        </div>
      ))}
    </div>
  );
}

export default ReadHistoryTab;


interface readHistoryItemProps {
  id?: number;
  imageUrl?: string;
  mangaName?: string;
  chapterId?: number;
  posterName?: string;
  postTime?: string;
  chapter?: string;
}


export function ReadHistoryItem(
  {
    id = 0,
    imageUrl = 'https://st.nhattruyenss.com/data/comics/228/blue-archive-global.jpg',
    mangaName = 'Manga Name',
    chapterId = 0,
    posterName = 'Poster Name',
    postTime = '10 minutes ago',
    chapter = 'Chapter 1' }: readHistoryItemProps) {
  return (
    <div className="w-full h-18 flex items-center pb-2">
      <img src={imageUrl} alt="Manga" className="w-20 h-24 mr-4" />
      <div className="flex flex-col justify-between mr-4">
        <Link to={`/manga-info/${id}`}>
          <span className="text-bold text-xl" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mangaName}</span>
        </Link>
        <span>{posterName}</span>
      </div>
      <div className="flex flex-grow items-end justify-center">
        <Link to={`/read-manga/${chapterId}`}>
          <span>{chapter}</span>
        </Link>
      </div>
      <div className="flex items-center">
        <span className="ml-auto">{postTime}</span>
      </div>
    </div>
  );
}
