import { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mangaService } from "../../src/service/mangaService";
import { ImageService } from "../../utils/imageService.tsx";
import CommentList from '../ui/commentList.tsx';
import Header from "../util/header";

const ChapterImage = lazy(() => import("../util/chapterImage.tsx"));

interface Image {
  id: number;
  name: string;
  imageUrl: string;
  imageId: string;
  chapter: {
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
      tags: any[];
    };
  };
}

function ChapterScreen() {
  const chapterId = useParams();
  const navigate = useNavigate();
  const [chapterImages, setChapterImages] = useState<string[]>([]);
  const [mangaName, setMangaName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [chapterNumber, setChapterNumber] = useState(0);
  const [numberOfChapter, setNumberOfChapter] = useState(0);
  const [mangaId, setMangaId] = useState(0);
  const [commentChange, setCommentChange] = useState(false);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        let id = chapterId.id;
        const response = await mangaService.getChapterById(id ?? '1');
        setMangaName(response.data.chapter.manga.name);
        setChapterName(response.data.chapter.name);
        setChapterNumber(response.data.chapter.number);
        const imageUrls = response.data.images.map((image: Image) => image.name);
        setChapterImages(imageUrls);
        const numberOfChapter = await mangaService.getMangaById(response.data.chapter.manga.id);
        setNumberOfChapter(numberOfChapter.data.chapters.length);
        setMangaId(response.data.chapter.manga.id);
        setCommentChange(!commentChange); 
      } catch (error) {
        console.error('Failed to fetch chapter:', error);
      }
    };
    fetchChapter();
  }, [chapterId]);

  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChapterIndex = event.target.selectedIndex;
    const newChapterId = Number(chapterId.id ?? '') + selectedChapterIndex - (chapterNumber - 1); 
    navigate(`/read-manga/${newChapterId}`);
  };

  const handlePreviousChapter = () => {
    if (chapterNumber > 1) {
      let id = Number(chapterId.id ?? '');
      navigate(`/read-manga/${id - 1}`);
    }
  };

  const handleNextChapter = () => {
    if (chapterNumber < numberOfChapter) {
      let id = Number(chapterId.id ?? '');
      navigate(`/read-manga/${id + 1}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="flex flex-col items-center ">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{mangaName}</h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Chương: {chapterNumber}: {chapterName}</h2>
        <div className="flex items-center justify-center my-4">
          <button
            onClick={handlePreviousChapter}
            className="px-4 py-2 bg-orange-500 hover:border-red-500 rounded-full text-white mr-2 w-34"
            hidden={chapterNumber === 1}
          >
            Chương trước
          </button>
          <select
            onChange={handleChapterChange}
            className="border-2 border-neutral-700 bg-white text-black rounded-full px-3 py-2 mr-2"
            value={chapterNumber}
          >
            {Array.from({ length: numberOfChapter }, (_, i) => i + 1).map(chapter => (
              <option key={chapter} value={chapter}>Chương {chapter}</option>
            ))}
          </select>
          <button
            onClick={handleNextChapter}
            className="px-4 py-2 bg-orange-500 hover:border-red-500 rounded-full text-white w-34"
            hidden={chapterNumber === numberOfChapter}
          >
            Chương sau
          </button>
        </div>
        <div className='w-3/6'>
          <Suspense fallback={<div>Đang load...</div>}>
            {chapterImages.map((imageName, index) => {
              const imageId = ImageService.makeImageId(mangaName, chapterName, imageName);
              return (
                <ChapterImage imageId={imageId} key={index} />
              );
            })}
          </Suspense>
        </div>
        <div className="flex items-center justify-center my-4">
          <button
            onClick={handlePreviousChapter}
            className="px-4 py-2 bg-orange-500 hover:border-red-500 rounded-full text-white mr-2 w-34"
            hidden={chapterNumber === 1}
          >
            Chương trước
          </button>
          <select
            onChange={handleChapterChange}
            className="border-2 border-neutral-700 bg-white text-black rounded-full px-3 py-2 mr-2"
            value={chapterNumber}
          >
            {Array.from({ length: numberOfChapter }, (_, i) => i + 1).map(chapter => (
              <option key={chapter} value={chapter}>Chương {chapter}</option>
            ))}
          </select>
          <button
            onClick={handleNextChapter}
            className="px-4 py-2 bg-orange-500 hover:border-red-500 rounded-full text-white w-34"
            hidden={chapterNumber === numberOfChapter}
          >
            Chương sau
          </button>
        </div>
      </div>
      <div className="w-3/5 bg-[#5F5F5F] flex flex-col items-center justify-start rounded-lg p-3">
        <h2 className='text-bold text-4xl m-2'>Bình luận</h2>
        <CommentList mangaId={mangaId} chapterChange={commentChange} /> {/* Pass mangaId to CommentList */}
      </div>
    </div>
  );
}

export default ChapterScreen;