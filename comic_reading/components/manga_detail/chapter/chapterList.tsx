import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChapterLink from "./chapterLink";

interface ChapterLinkProps {
    name: string;
    chapter: string;
    chapterName: string;
    time: string;
    poster: string;
}

interface Chapter {
    id: number;
    name: string;
    number: number;
    data: null;
    commentNumber: number;
    publishAt: string;
    updateAt: string;
    manga: {
        id: number;
        name: string;
        publishingCompany: string;
        author: string;
        artist: string;
        coverImage: string;
        status: string;
        readingStatus: string;
        viewNumber: number;
        favouriteNumber: number;
        commentNumber: number;
        publishAt: string;
        updateAt: string;
        updateUser: null;
        tags: any[]; // Changed from [] to any[]
    };
}
interface ChapterListProps {
    chapters: Chapter[];
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters }) => {
  return (
    <div className="w-full p-3 pt-0 border-2 flex flex-col rounded-lg">
        <InfiniteScroll
            dataLength={chapters.length}
            next={() => {}}
            hasMore={true}
            loader={<h4></h4>}
            endMessage={
            <p style={{ textAlign: "center"}}>
                <b>...</b>
            </p>
            }
        >
            {chapters.map((chapter, index) => (
            <ChapterLink
                key={index}
                name={chapter.manga.name}
                chapter={chapter.id.toString()}
                chapterName={chapter.name}
                time={chapter.publishAt}
                poster={`Người đăng: ${chapter.manga.author}`}
            />
            ))}
        </InfiniteScroll>
    </div>
  );
}

export default ChapterList;