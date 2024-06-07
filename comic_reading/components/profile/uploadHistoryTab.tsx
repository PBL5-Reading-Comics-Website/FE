import React, { ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { posterService } from '../../src/service/posterService';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

interface ReadingHistory {
  id: number;
  name: string;
  publishingCompany: string;
  author: string;
  artist: string;
  description: string;
  coverImage: string;
  status: string;
  readingStatus: string;
  viewNumber: number;
  favouriteNumber: number;
  commentNumber: number;
  publishAt: string;
  updateAt: string;
  updateUser: number;
  likedUsers: any[];
}

interface UploadHistoryItemProps {
  imageUrl?: string;
  mangaName?: string;
  chapter?: string;
  postTime?: string;
  id?: number;
}

interface ReadHistoryProps {
  className?: string;
  id?: number;
  children?: ReactNode;
}

export function UploadHistoryItem({ imageUrl, mangaName, id, postTime }: UploadHistoryItemProps) {
  const date = new Date(postTime!);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  return (
    <div className="w-full h-18 flex items-center pb-2">
      <img src={imageUrl} alt="Manga" className="w-20 h-24 mr-4" />
      <div className="flex flex-col justify-between mr-4">
        <Link to={`/manga-info/${id}`}>
          <span className="text-bold text-xl" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mangaName}</span>
        </Link>
      </div>
      <div className="flex flex-grow items-end justify-center">
        <Link to={`/posting/${mangaName}`}>
          <button className="bg-[#ED741B] text-white font-bold py-2 px-4 rounded mt-4">
            Đăng chương mới
          </button>
        </Link>
      </div>
      <div className="flex items-center">
        <span className="ml-auto">Cập nhật lần cuối vào:   {formattedDate}</span>
      </div>
    </div>
  );
}

export function UploadHistoryTab({ className = '', children, id }: ReadHistoryProps) {
  const [uploadHistories, setUploadHistories] = useState<ReadingHistory[]>([]);

  useEffect(() => {
    const fetchReadingHistories = async () => {
      try {
        const data = await posterService.getUploadHistories(id!);
        setUploadHistories(data.data);
        console.log(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReadingHistories();
  }, []);

  return (
    <div>
      <h2 className='text-bold my-4'>LỊCH SỬ ĐĂNG TRUYỆN</h2>
      {uploadHistories.map((manga, index) => (
        <div key={index} className={`bg-[#444444] rounded-xl p-4 pr-12 mb-4 last:mb-0 ${className}`}>
          <UploadHistoryItem
            imageUrl={manga.coverImage}
            mangaName={manga.name}
            id={manga.id}
            postTime={manga.updateAt}
          />
        </div>
      ))}
    </div>
  );
}

export default UploadHistoryTab;