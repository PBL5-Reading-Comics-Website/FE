"use client";
import {
  IconBookmarkFilled,
  IconEye,
  IconHeart, IconHeartFilled,
  IconMessageCircle
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mangaService } from "../../src/service/mangaService";
import { userService } from "../../src/service/userService";
import ErrorPage from "../error/errorPage";
import TagList from "../tag/tagList";
import CommentList from "../ui/commentList";
import Header from "../util/header";
import ChapterList from "./chapter/chapterList";

interface MangaData {
  id: number;
  coverImage: string;
  name: string;
  author: string;
  artist: string;
  publishAt: string;
  publisher: string;
  status: string;
  viewNumber: number;
  favouriteNumber: number;
  commentNumber: number;
  tags: string[];
  description: string;
  chapters: {
    id: number;
    name: string;
    number: number;
    data: any;
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
      updateUser: any;
      tags: any[];
    }
  }[];
}



interface MangaInfoScreenProps {
  defaultImageUrl?: string;
  defaultMangaName?: string;
  defaultAuthor?: string;
  defaultArtist?: string;
  defaultPublicationDate?: string;
  defaultPublisher?: string;
  defaultStatus?: string;
  defaultViews?: number;
  defaultFavorites?: number;
  defaultComments?: number;
  defaultTags?: string[];
  defaultDescription?: string;
}

export function MangaInfoScreen() {
  const { id } = useParams();
  const [manga, setManga] = useState<MangaData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id || parseInt(id) === 0) {
      return;
    }

    const fetchManga = async () => {
      try {
        const data = await mangaService.getMangaById(parseInt(id));
        console.log(data.data)
        if (data && data.data.tags) {
          const tags = data.data.tags.map((tag: { name: string; }) => tag.name);
          const chapters = data.data.chapters;
          setManga({ ...data.data.manga, tags, chapters });
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchManga();
  }, [id]);
  const publishDate = manga?.publishAt ? new Date(manga.publishAt) : null;
  const formattedDate = publishDate ? `${publishDate.getDate()}-${publishDate.getMonth() + 1}-${publishDate.getFullYear()}` : '';
  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="relative">
      <div className="w-full h-full">
        <Header />
      </div>
      <div className="h-72 w-full bg-center bg-cover relative z-10" style={{ backgroundImage: `url(${manga?.coverImage})` }}>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>
      <div className="absolute flex top-0 w-full z-20">
        <div className="w-1/3 h-fit flex flex-col justify-center items-center">
          <img src={manga?.coverImage} className="w-5/6 mt-24 mr-0 ml-auto" alt="" />
          <button className="font-saira mt-3 mr-0 flex items-center justify-center pl-16 ml-auto hover:border-[#b8382f] hover:border-2 bg-[#ED741B] text-[#2E2E2E] w-5/6 h-16 text-lg font-bold" type="submit">
            <h3 className="w-2/3 text-center" onClick={async () => {
              if (manga?.id) {
                try {
                  const response = await userService.likeManga(manga.id);
                  if (response.status == "success") {
                    alert("Thích truyện thành công");
                    window.location.reload();
                  }
                } catch (error) {
                  console.error(error);
                }
              }
            }}>THÍCH TRUYỆN</h3>
            <IconHeartFilled size={30} className="mr-10 ml-auto" />
          </button>
          <button className="font-saira mt-3 mr-0 flex items-center justify-center pl-16 ml-auto bg-[#1BBBED] hover:border-2 text-[#2E2E2E] w-5/6 h-16 text-lg font-bold" type="submit">
            <h3 className="w-2/3 text-center">THEO DÕI</h3>
            <IconBookmarkFilled size={30} className="mr-10 ml-auto" />
          </button>
          <div className="flex h-fit w-5/6 text-lg justify-between ml-auto mr-0 mt-3">
            <table className="w-full">
              <tbody>
                <tr className="flex">
                  <td className="w-1/2"><h3>Tình trạng</h3></td>
                  <td className="w-1/2 text-right"><h3>{manga?.status ?? '\u00A0'}</h3></td>
                </tr>
                <tr className="flex">
                  <td className="w-1/2"><h3>NXB</h3></td>
                  <td className="w-1/2 text-right"><h3>{manga?.publisher ?? '\u00A0'}</h3></td>
                </tr>
                <tr className="flex">
                  <td className="w-1/2"><h3>Tác giả</h3></td>
                  <td className="w-1/2 text-right"><h3>{manga?.author ?? '\u00A0'}</h3></td>
                </tr>
                <tr className="flex">
                  <td className="w-1/2"><h3>Họa sĩ</h3></td>
                  <td className="w-1/2 text-right"><h3>{manga?.artist ?? '\u00A0'}</h3></td>
                </tr>
                <tr className="flex">
                  <td className="w-1/2"><h3>Ngày xuất bản</h3></td>
                  <td className="w-1/2 text-right"><h3>{formattedDate ?? '\u00A0'}</h3></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col justify-start">
          <div className="w-full h-72 flex flex-col justify-end items-start text-white pl-8 pb-5">
            <h1 className="text-3xl font-bold">{manga?.name}</h1>
            <h1 className="h-16"></h1>
            <h1 className="text-2xl font-light">{manga?.author}</h1>
          </div>
          <div className="h-fit w-full pl-8 pr-8 pt-3">
            <div className="flex w-fit items-center">
              <IconEye size={40} />
              <h1 className="h-full text-center text-2xl font-semibold">{manga?.viewNumber ?? '0'}</h1>
              <IconMessageCircle size={40} className="ml-20" />
              <h1 className="h-full text-center text-2xl font-semibold">{manga?.commentNumber ?? '0'}</h1>
              <IconHeart size={40} className="ml-20" />
              <h1 className="h-full text-center text-2xl font-semibold">{manga?.favouriteNumber ?? '0'}</h1>
            </div>
            <h1 className="text-2xl font-light mt-3">Thể loại</h1>
            <div className="w-full border-t pt-2 border-white">
              <TagList tags={manga?.tags ?? []} onTagClick={function (tag: string): void {
                throw new Error("Function not implemented.");
              }} />
            </div>
            <h3 className="pt-3 mb-10">{manga?.description}</h3>
            <div className="w-full h-full bg-[#5F5F5F] flex flex-col items-center justify-start rounded-lg p-3">
              <h1 className="text-2xl font-semibold pb-3">Danh sách chương</h1>
              <ChapterList chapters={manga?.chapters ?? []} />
              <h1 className="text-2xl font-semibold py-3">Bình luận</h1>
              <CommentList mangaId={manga?.id ?? 0}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MangaInfoScreen;