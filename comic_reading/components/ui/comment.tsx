import React from 'react';
import { IconFlag } from '@tabler/icons-react';

interface CommentProps {
    imgAvatar: string;
    userId: number,
    name: string;
    time: string;
    content: string;
    mangaId: number;
    commentId: number;
    handleOpenReportDialog: (mangaId: number, commentId: number) => void;
    handleToUserProfile: (userId: number) => void
}

export function Comment({
    imgAvatar,
    userId,
    name,
    time,
    content,
    mangaId,
    commentId,
    handleOpenReportDialog,
    handleToUserProfile,
}: CommentProps) {
    const formatDate = (timeString: string) => {
        const date = new Date(timeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return (
        <div className="w-full flex h-fit mt-3">
            <img onClick={() => handleToUserProfile(userId)} className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer" src={imgAvatar}></img>
            <div className="p-3 m-3 mt-0 bg-[#515151] text-white hover:bg rounded-xl w-full h-fit flex flex-col">
                <div className="w-full flex justify-between border-b border-[#FCA565] pb-1">
                    <h1 className="text-base font-semibold">{name}</h1>
                    <div className="flex items-center">
                        <h1 className="mr-4 text-base font-light">{formatDate(time)}</h1>
                        <IconFlag onClick={() => handleOpenReportDialog(mangaId, commentId)} size={20} className="text-gray-400 hover:text-red-600 cursor-pointer" />
                    </div>
                </div>
                <div className=" flex flex-col items-start">
                    <h1 className="text-base font-normal">{content}</h1>
                </div>
            </div>
        </div>
    );
}

export default Comment;