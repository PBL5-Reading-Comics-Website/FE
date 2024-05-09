import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../util/header";

import { mangaService } from "../../src/service/mangaService";
import { ImageService } from "../../utils/imageService.tsx";
import ChapterImage from "../util/chapterImage.tsx";

function ChapterScreen() {
    const {chapterId} = useParams();
    const navigate = useNavigate();
    const [chapterImages, setChapterImages] = useState<string[]>([]);
    const [mangaName, setMangaName] = useState("");
    const [chapterName, setChapterName] = useState("");
    useEffect(() => {
        const fetchChapter = async () => {
            try {
                const response = await mangaService.getChapterById(chapterId ?? '1');
                setMangaName(response.data.chapter.manga.name);
                setChapterName(response.data.chapter.name);
                console.log(response)
                const imageUrls = response.data.images.map((image: Image) => image.name);
                setChapterImages(imageUrls);
            } catch (error) {
                console.error('Failed to fetch chapter:', error);
            }
        };

        fetchChapter();
    }, []);

    return (
        <div>
            <div className="w-full h-full">
                <Header/>
            </div>

            <div className="w-full">
                {
                    chapterImages.map((imageName, index) => {
                        const imageId = ImageService.makeImageId(mangaName, chapterName, imageName);
                        console.log(imageId);
                        return (
                            <ChapterImage imageId={imageId} key={index}/>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ChapterScreen;