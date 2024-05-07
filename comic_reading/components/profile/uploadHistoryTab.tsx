import React, { ReactNode } from 'react';

interface UploadHistoryProps {
    className?: string;
    children?: ReactNode;
}


export function UploadHistoryTab(
    { className = '', children }: UploadHistoryProps
) {
    return (
        <div className='bg-[#6A6A6A] rounded-xl p-4 mb-10'>
          {React.Children.map(children, (child, index) => (
            <div key={index} className={`bg-[#444444] rounded-xl p-4 pr-12 mb-4 last:mb-0 ${className}`}>
              {child}
            </div>
          ))}
        </div>
      );
}

export default UploadHistoryTab;


interface UploadHistoryItemProps {
    imageUrl?: string;
    mangaName?: string;
    posterName?: string;
    postTime?: string;
    chapter?: string;
}


export function UploadHistoryItem(
    { imageUrl = 'https://st.nhattruyenss.com/data/comics/228/blue-archive-global.jpg', 
      mangaName = 'Manga Name',
      chapter = 'Chapter 1' }: UploadHistoryItemProps) {  
    return (
      <div className="w-full flex items-center">
        <img src={imageUrl} alt="Manga" className="w-20 h-24 mr-4" />
        <div className="flex w-full items-center justify-center">
          <div className='flex items-center justify-between w-1/2'>
            <span className="text-bold text-xl">{mangaName}</span>
            <span>{chapter}</span>
          </div>
        </div>
      </div>
    );
  }
