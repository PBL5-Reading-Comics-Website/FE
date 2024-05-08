"use client";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../util/header";

import { mangaService } from "../../src/service/mangaService";

const options = [
  { value: '1', label: 'Chương 1' },
  { value: '2', label: 'Chương 2' },
  { value: '3', label: 'Chương 3' },
];

export function chapterScreen() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState({ value: chapterId, label: `Chapter ${chapterId}` });
  const [chapterImages, setChapterImages] = useState<string[]>([]);
  useEffect(() => {
    setSelectedOption({ value: chapterId, label: `Chapter ${chapterId}` });
  }, [chapterId]);
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await mangaService.getChapterById("2");
        console.log(response)
        const imageUrls = response.data.images.map((image: any) => image.imageUrl);
        setChapterImages(imageUrls);
      } catch (error) {
        console.error('Failed to fetch chapter:', error);
      }
    };
  
    fetchChapter();
  }, []);

  const handleChange = (option: any) => {
    setSelectedOption(option);
    navigate(`/read-manga/${option.value}`);
  };

  return (
    <div>
      <div className="w-full h-full">
        <Header />
      </div>
      {/* <h1 className="mt-20 ml-2 text-4xl font-semibold text-white">{name}</h1>
      <h2 className="ml-2">Chương {chapterId}</h2>
      <div className="w-full flex justify-center">
        <Link to={`/manga-info/${name?.replace(/\s/g, '-')}/${chapterId}`}>
          <button className="bg-white text-black rounded-full p-2 m-2 flex">
            <IconReload size={24} className="mr-1" />
            Tải lại
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <Link to={`/read-manga/${Number(chapterId) - 1}`}>
          <button className="bg-[#ED741B] text-black rounded-2xl w-40 justify-center p-2 m-2 flex hover:border-2 hover:border-[#b8382f]">
            <IconArrowLeft size={24} className="mr-1" />
            Chương trước
          </button>
        </Link>
        <Select
          styles={{
            container: (base: any) => ({ ...base, width: 150, height: 40, borderRadius: 20 }),
            control: (base: any) => ({ ...base, backgroundColor: 'white', color: 'black', borderRadius: 20, height: 40, width: 150, border: 'none' }),
            option: (base: any) => ({ ...base, color: 'black', borderRadius: 20, height: 40, width: 150, border: 'none' }),
            menu: (base: any) => ({ ...base, color: 'black', borderRadius: 20, width: 150, border: 'none' }),
          }}
          options={options}
          value={selectedOption}
          onChange={handleChange}
        />
        <Link to={`/read-manga/${Number(chapterId) + 1}`}>
          <button className="bg-[#ED741B] text-black rounded-2xl w-40 justify-center p-2 m-2 flex hover:border-2 hover:border-[#b8382f]">
            Chương tiếp
            <IconArrowRight size={24} className="mr-1" />
          </button>
        </Link>
      </div> */}
      
      <div className="w-full">
        {chapterImages.map((imageUrl, index) => (
          <img key={index} className='w-64 h-64' src={imageUrl} alt={`Chapter image ${index + 1}`} />
        ))}
      </div>

      {/* <div className="w-full flex justify-center items-center">
        <Link to={`/read-manga/${Number(chapterId) - 1}`}>
          <button className="bg-[#ED741B] text-black rounded-2xl w-40 justify-center p-2 m-2 flex hover:border-2 hover:border-[#b8382f]">
            <IconArrowLeft size={24} className="mr-1" />
            Chương trước
          </button>
        </Link>
        <Select
          styles={{
            container: (base: any) => ({ ...base, width: 150, height: 40, borderRadius: 20 }),
            control: (base: any) => ({ ...base, backgroundColor: 'white', color: 'black', borderRadius: 20, height: 40, width: 150, border: 'none' }),
            option: (base: any) => ({ ...base, color: 'black', borderRadius: 20, height: 40, width: 150, border: 'none' }),
            menu: (base: any) => ({ ...base, color: 'black', borderRadius: 20, width: 150, border: 'none' }),
          }}
          options={options}
          value={selectedOption}
          onChange={handleChange}
        />
        <Link to={`/read-manga/${Number(chapterId) + 1}`}>
          <button className="bg-[#ED741B] text-black rounded-2xl w-40 justify-center p-2 m-2 flex hover:border-2 hover:border-[#b8382f]">
            Chương tiếp
            <IconArrowRight size={24} className="mr-1" />
          </button>
        </Link>
      </div> */}
    </div>
  );
}

export default chapterScreen;