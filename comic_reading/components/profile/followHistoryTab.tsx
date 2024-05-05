import React, { ReactNode } from 'react';

interface FollowHistoryProps {
  className?: string;
  children?: ReactNode;
}


export function FollowHistoryTab(
  { className = '', children }: FollowHistoryProps
) {
  return (
    <div>
      <h2 className='text-bold my-4'>LỊCH SỬ THEO DÕI</h2>
      {React.Children.map(children, (child, index) => (
        <div key={index} className={`bg-[#444444] rounded-xl p-4 pr-12 mb-4 last:mb-0 ${className}`}>
          {child}
        </div>
      ))}
    </div>
  );
}

export default FollowHistoryTab;


interface FollowHistoryItemProps {
  imageUrl?: string;
  mangaName?: string;
  posterName?: string;
  chapter?: string;
}


export function FollowHistoryItem(
  { imageUrl = 'https://st.nhattruyenss.com/data/comics/228/blue-archive-global.jpg',
    mangaName = 'Manga Name',
    posterName = 'Poster Name',
    chapter = 'Chapter 1' }: FollowHistoryItemProps) {
  return (
    <div className="w-full h-18 flex items-center pb-2">
      <img src={imageUrl} alt="Manga" className="w-20 h-24 mr-4" />
      <div className="flex flex-col justify-between mr-4">
        <span className="text-bold text-xl">{mangaName}</span>
        <span>{posterName}</span>
      </div>
      <div className="flex flex-grow items-center justify-center">
        <span>{chapter}</span>
      </div>
      <div className="flex items-center">
        <button className="bg-[#ED741B] text-white font-bold py-2 px-4 rounded mt-4">
          Bỏ theo dõi
        </button>
      </div>
    </div>
  );
}
