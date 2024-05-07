"use client";
import Header from "../util/header";
import TagList from "../tag/tagList";
import ChapterList from "./chapter/chapterList";
import CommentList from "../ui/commentList";
import {
  IconEye, IconMessageCircle, IconHeart, IconHeartFilled, IconBookmarkFilled,
  IconBookmark
} from "@tabler/icons-react";

interface MangaInfoScreenProps {
  imageUrl?: string;
  mangaName?: string;
  author?: string;
  artist?: string;
  publicationDate?: string;
  publisher?: string;
  status?: string;
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
  artist = 'Haruhisa Nakata',
  publicationDate = '2021-10-10',
  publisher = 'Shogakukan',
  status = 'Ongoing',
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
          <img src={imageUrl} className="w-5/6 mt-24 mr-0 ml-auto" alt="" />
          <button className="font-saira mt-3 mr-0 flex items-center justify-center pl-16 ml-auto hover:border-[#b8382f] hover:border-2 bg-[#ED741B] text-[#2E2E2E] w-5/6 h-16 text-lg font-bold" type="submit"> 
            <h3 className="w-2/3 text-center">THÍCH TRUYỆN</h3>
            <IconHeartFilled size={30} className="mr-10 ml-auto" />
          </button>
          <button className="font-saira mt-3 mr-0 flex items-center justify-center pl-16 ml-auto bg-[#1BBBED] hover:border-2 text-[#2E2E2E] w-5/6 h-16 text-lg font-bold" type="submit"> 
            <h3 className="w-2/3 text-center">THEO DÕI</h3>
            <IconBookmarkFilled size={30} className="mr-10 ml-auto" />
          </button>
          <div className="flex h-fit w-5/6 text-lg justify-between ml-auto mr-0 mt-3">
            <div className="flex flex-col">
              <h3>Tình trạng</h3>
              <h3>NXB</h3>
              <h3>Tác giả</h3>
              <h3>Họa sĩ</h3>
              <h3>Ngày xuất bản</h3>
            </div>
            <div className="flex flex-col mr-0 ml-auto items-end">
              <h3>{status}</h3>
              <h3>{publisher}</h3>
              <h3>{author}</h3>
              <h3>{artist}</h3>
              <h3>{publicationDate}</h3>
            </div>
          </div>
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
            <div className="w-full h-full bg-[#5F5F5F] flex flex-col items-center justify-start rounded-lg p-3">
              <h1 className="text-2xl font-semibold pb-3">Danh sách chương</h1>
              <ChapterList name={mangaName}/>
              <h1 className="text-2xl font-semibold py-3">Bình luận</h1>
              <CommentList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MangaInfoScreen;