"use client";
import Header from "../util/header.tsx";
import TagList from "../tag/tagList.tsx";
import ChapterLink from "./chapter/chapterLink.tsx";
import {
  IconEye, IconMessageCircle, IconHeart
} from "@tabler/icons-react";

interface MangaInfoScreenProps {
  imageUrl?: string;
  mangaName?: string;
  author?: string;
  views?: number;
  favorites?: number;
  comments?: number;
  tags?: string[];
  description?: string;
}

export function MangaInfoScreen({
  imageUrl = 'https://i0.wp.com/halcyonrealms.com/blogpics/leviuscover02.jpg?resize=750%2C1071&ssl=1',
  mangaName = 'Levius',
  author = 'Haruhisa Nakata',
  views = 100000,
  favorites = 100000,
  comments = 100000,
  tags = ['Action', 'Adventure', 'Drama', 'Sci-fi', 'Shounen', 'Sports', 'Tragedy', 'Martial Arts', 'Military', 'Seinen'],
  description = 'Levius (レビウス) là một bộ truyện tranh Nhật Bản được viết và minh họa bởi Haruhisa Nakata. Câu chuyện lấy bối cảnh một cuộc chiến tranh tàn khốc được tái hiện lại vào thế kỷ 19, nơi tổ chức môn thể thao chiến đấu giống như đấu sĩ được gọi là Metalboxing, với nhiều cơ thể của thí sinh được tăng cường bằng các bộ phận cơ khí.'
}: MangaInfoScreenProps) {

  return (
    <div className="relative">
      <div className="w-full h-full">
        <Header />
      </div>
      <div className="h-72 w-full bg-center bg-cover relative z-10" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>
      <div className="absolute flex top-0 w-full z-20">
        <div className="w-1/3 h-fit flex flex-col justify-center items-center">
          <img src={imageUrl} className="h-80 mt-24 mr-0 ml-auto" alt="" />
        </div>
        <div className="w-full h-fit flex flex-col justify-start">
          <div className="w-full h-72 flex flex-col justify-end items-start text-white pl-8 pb-5">
            <h1 className="text-3xl font-bold">{mangaName}</h1>
            <h1 className="h-16"></h1>
            <h1 className="text-2xl font-light">{author}</h1>
          </div>
          <div className="h-fit w-full pl-8 pr-8 pt-3">
            <div className="flex w-fit items-center">
              <IconEye size={40} />
              <h1 className="h-full text-center text-2xl font-semibold">{views}</h1>
              <IconMessageCircle size={40} className="ml-20" />
              <h1 className="h-full text-center text-2xl font-semibold">{comments}</h1>
              <IconHeart size={40} className="ml-20" />
              <h1 className="h-full text-center text-2xl font-semibold">{favorites}</h1>
            </div>
            <h1 className="text-2xl font-light mt-3">Thể loại</h1>
            <div className="w-full border-t pt-2 border-white">
              <TagList tags={tags} />
            </div>
            <h3 className="pt-3 mb-10">{description}</h3>
            <div className="w-full h-full bg-[#5F5F5F] flex flex-col items-center justify-start rounded-lg p-3 m-3">
              <div className="w-full p-3 pt-0 border-2 flex flex-col rounded-lg">
                <ChapterLink chapter="Chapter 3:Tên chap" time="1 ngày trước" poster="SomeGuy" />
                <ChapterLink chapter="Chapter 2:Tên chap" time="2 ngày trước" poster="SomeGuy" />
                <ChapterLink chapter="Chapter 1:Tên chap" time="3 ngày trước" poster="SomeGuy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MangaInfoScreen;