import React, { ReactNode } from 'react';

interface ReadHistoryProps {
    className?: string;
    children?: ReactNode;
}


export function ReadHistoryTab(
    { className = '', children }: ReadHistoryProps
) {
    return (
        <div>
          <h2 className='text-bold my-4'>LỊCH SỬ ĐỌC TRUYỆN</h2>
          {React.Children.map(children, (child, index) => (
            <div key={index} className={`bg-[#444444] rounded-xl p-4 pr-12 mb-4 last:mb-0 ${className}`}>
              {child}
            </div>
          ))}
        </div>
      );
}

export default ReadHistoryTab;


interface readHistoryItemProps {
    imageUrl?: string;
    mangaName?: string;
    posterName?: string;
    postTime?: string;
    chapter?: string;
}


export function ReadHistoryItem(
    { imageUrl = 'https://st.nhattruyenss.com/data/comics/228/blue-archive-global.jpg', 
      mangaName = 'Manga Name', 
      posterName = 'Poster Name', 
      postTime = '10 minutes ago',
      chapter = 'Chapter 1' }: readHistoryItemProps) { 
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
          <span className="ml-auto">{postTime}</span>
        </div>
      </div>
    );
  }
