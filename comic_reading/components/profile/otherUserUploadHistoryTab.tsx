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
  status?: string;
  id?: number;
}

interface ReadHistoryProps {
  className?: string;
  id?: number;
  children?: ReactNode;
}

export function UploadHistoryItem({ imageUrl, mangaName, status, id, postTime }: UploadHistoryItemProps) {
  const date = new Date(postTime!);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  return (
    <div className="w-full h-18 flex items-center">
      <img src={imageUrl} alt="Manga" className="w-20 h-24 mr-4" />
      <div className="flex flex-col justify-between mr-4">
        <Link to={`/manga-info/${id}`}>
          <span className="text-bold text-xl text-white hover:text-orange-300 line-clamp-2">{mangaName ?? ''}</span>
        </Link>
      </div>
      <div className='mx-auto'>Trạng thái: {status}</div>
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
    <div className='pb-5'>
      <h2 className='text-bold my-4'>LỊCH SỬ ĐĂNG TRUYỆN</h2>
      {uploadHistories.map((manga, index) => (
        <div key={index} className={`bg-[#444444] rounded-xl p-4 pr-12 mb-4 last:mb-0 ${className}`}>
          <UploadHistoryItem
            imageUrl={manga.coverImage}
            mangaName={manga.name}
            status={manga.status}
            id={manga.id}
            postTime={manga.updateAt}
          />
        </div>
      ))}
    </div>
  );
}

export default UploadHistoryTab;