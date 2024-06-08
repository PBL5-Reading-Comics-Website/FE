import { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mangaService } from "../../src/service/mangaService";
import { ImageService } from "../../utils/imageService.tsx";
import CommentList from '../ui/commentList.tsx';
import Header from "../util/header";

const ChapterImage = lazy(() => import("../util/chapterImage.tsx"));

function ChapterScreen() {
  const { id: chapterIdParam } = useParams();
  const navigate = useNavigate();

  const [mangaName, setMangaName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [mangaId, setMangaId] = useState(0);
  const [chapterNumber, setChapterNumber] = useState(0);
  const [chapters, setChapters] = useState<any[]>([]);
  const [chapterImages, setChapterImages] = useState<string[]>([]);
  const [commentChange, setCommentChange] = useState(false);

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const chapterId = chapterIdParam ?? '1';
        const chapterResponse = await mangaService.getChapterById(chapterId);

        // Update chapter details and images
        setMangaName(chapterResponse.data.chapter.manga.name);
        setChapterName(chapterResponse.data.chapter.name);
        setChapterNumber(chapterResponse.data.chapter.number);
        setChapterImages(chapterResponse.data.images.map((image: { name: any; }) => image.name));
        setMangaId(chapterResponse.data.chapter.manga.id);

        // Fetch and sort all chapters
        const chaptersResponse = await mangaService.getChaptersByMangaId({
          id: chapterResponse.data.chapter.manga.id,
          sortField: 'number',
          sortOrder: 'ASC',
          page: 0,
          size: 100
        });
        setChapters(chaptersResponse.data);
        setCommentChange(!commentChange);
      } catch (error) {
        console.error('Failed to fetch chapter data:', error);
      }
    };
    fetchChapterData();
  }, [chapterIdParam]);

  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newChapterNumber = parseInt(event.target.value, 10);
    const selectedChapter = chapters.find(chapter => chapter.number === newChapterNumber);

    if (selectedChapter) {
      navigate(`/read-manga/${selectedChapter.id}`);
      setChapterNumber(newChapterNumber);
      setChapterName(selectedChapter.name);
    }
  };

  const handlePreviousChapter = () => {
    const currentChapterIndex = chapters.findIndex(chapter => chapter.number === chapterNumber);
    if (currentChapterIndex > 0) {
      const previousChapter = chapters[currentChapterIndex - 1];
      navigate(`/read-manga/${previousChapter.id}`);
      setChapterNumber(previousChapter.number);
      setChapterName(previousChapter.name);
    }
  };

  const handleNextChapter = () => {
    const currentChapterIndex = chapters.findIndex(chapter => chapter.number === chapterNumber);
    if (currentChapterIndex < chapters.length - 1) {
      const nextChapter = chapters[currentChapterIndex + 1];
      navigate(`/read-manga/${nextChapter.id}`);
      setChapterNumber(nextChapter.number);
      setChapterName(nextChapter.name);
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
            className="px-4 py-2 bg-orange-500 rounded-full text-white mr-2 w-34 hover:bg-[#fa854f] transition duration-300 ease-in-out hover:outline-none hover:border-orange-400 hover:ring-2 hover:ring-offset-2 hover:ring-[#f38e4b] shadow-md text-shadow"
            hidden={chapterNumber === 1}
          >
            Chương trước
          </button>
          <select
            onChange={handleChapterChange}
            className="border-2 border-neutral-700 bg-white text-black rounded-full px-3 py-2 mr-2"
            value={chapterNumber.toString()}
          >
            {chapters.map(chapter => (
              <option key={chapter.id} value={chapter.number.toString()}>Chương {chapter.number}</option>
            ))}
          </select>
          <button
            onClick={handleNextChapter}
            className="px-4 py-2 bg-orange-500 rounded-full text-white w-34 hover:bg-[#fa854f] transition duration-300 ease-in-out hover:outline-none hover:border-orange-400 hover:ring-2 hover:ring-offset-2 hover:ring-[#f38e4b] shadow-md text-shadow"
            hidden={chapters.length > 0 && chapterNumber === chapters[chapters.length - 1].number}
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
            className="px-4 py-2 bg-orange-500 rounded-full text-white mr-2 w-34 hover:bg-[#fa854f] transition duration-300 ease-in-out hover:outline-none hover:border-orange-400 hover:ring-2 hover:ring-offset-2 hover:ring-[#f38e4b] shadow-md text-shadow"
            hidden={chapterNumber === 1}
          >
            Chương trước
          </button>
          <select
            onChange={handleChapterChange}
            className="border-2 border-neutral-700 bg-white text-black rounded-full px-3 py-2 mr-2"
            value={chapterNumber.toString()}
          >
            {chapters.map(chapter => (
              <option key={chapter.id} value={chapter.number.toString()}>Chương {chapter.number}</option>
            ))}
          </select>
          <button
            onClick={handleNextChapter}
            className="px-4 py-2 bg-orange-500 rounded-full text-white w-34 hover:bg-[#fa854f] transition duration-300 ease-in-out hover:outline-none hover:border-orange-400 hover:ring-2 hover:ring-offset-2 hover:ring-[#f38e4b] shadow-md text-shadow"
            hidden={chapters.length > 0 && chapterNumber === chapters[chapters.length - 1].number}
          >
            Chương sau
          </button>
        </div>
      </div>
      <div className="w-3/5 bg-[#5F5F5F] flex flex-col items-center justify-start rounded-lg p-3">
        <h2 className='text-bold text-4xl m-2'>Bình luận</h2>
        <CommentList mangaId={mangaId} chapterChange={commentChange} />
      </div>
    </div>
  );
}

export default ChapterScreen;