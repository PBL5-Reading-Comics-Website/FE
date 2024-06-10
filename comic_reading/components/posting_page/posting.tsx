"use client";
import Header from "../util/header";
import { Input } from '../util/input.tsx';
import PageUpload from "./pageUpload.tsx";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { posterService } from "../../src/service/posterService.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { mangaService } from "../../src/service/mangaService.tsx";
import LoadingScreen from '../util/circleLoading.tsx'; 

interface UploadProgress {
    [filename: string]: number;
}

export function PostingPage() {
    const { mangaNameParam } = useParams();
    const [images, setImages] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
    const [mangaName, setMangaName] = useState(mangaNameParam);
    const [chapterName, setChapterName] = useState('');
    const [chapterNumber, setChapterNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [manga, setManga] = useState<any>();
    const [chapterOptions, setChapterOptions] = useState<number[]>([]);
    const [errorMessages, setErrorMessages] = useState({
        chapterNumber: '',
        images: ''
    });
    const navigate = useNavigate();

    const handleImageUpload = (newImages: File[]) => {
        setImages(newImages);
    };

    useEffect(() => {
        const getManga = async () => {
            try {
                const data = await posterService.getMangaByName(mangaName!);
                if (!data) return;
                console.log(data.data.content[0]);
                setManga(data.data.content[0]);

                const chaptersResponse = await mangaService.getChaptersByMangaId({ id: data.data.content[0].id, sortField: '', sortOrder: '', page: 0, size: 100 });
                const chapters = chaptersResponse.data;
                const existingChapterNumbers = chapters.map((chapter: any) => chapter.number);
                const latestChapterNumber = existingChapterNumbers.length > 0 ? Math.max(...existingChapterNumbers) : 0;

                const options = Array.from({ length: latestChapterNumber + 20 }, (_, i) => i + 1)
                    .filter(number => !existingChapterNumbers.includes(number));

                setChapterOptions(options);
            } catch (error) {
                console.error(error);
            }
        };
        getManga();
    }, [mangaName]);

    const uploadImages = async () => {
        if (!images) return;

        const uploadedImageUrls: string[] = [];

        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'team_upload');
            formData.append('folder', "van_chuong_viet/" + mangaName + "/" + chapterName);

            try {
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dcwqcvfi6/image/upload',
                    formData,
                    {
                        onUploadProgress: (progressEvent) => {
                            setUploadProgress({
                                ...uploadProgress,
                                [image.name]: (progressEvent.loaded / (progressEvent.total ?? 0)) * 100,
                            });
                        },
                    }
                );

                console.log('Upload successful:', response.data);
                uploadedImageUrls.push(response.data.secure_url);

                setUploadProgress((prevProgress) => {
                    const { [image.name]: _, ...rest } = prevProgress;
                    return rest;
                });
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
        return uploadedImageUrls;
    };

    const sendChapter = async () => {
        let isValid = true;
        let newErrorMessages = { ...errorMessages };
        if (!chapterNumber) {
            newErrorMessages.chapterNumber = 'Vui lòng chọn chương';
            isValid = false;
        } else {
            newErrorMessages.chapterNumber = '';
        }
        if (images.length === 0) {
            newErrorMessages.images = 'Vui lòng chọn ảnh';
            isValid = false;
        } else {
            newErrorMessages.images = '';
        }
        setErrorMessages(newErrorMessages);

        if (!isValid) {
            return;
        }

        setIsLoading(true);
        const imageUrls = await uploadImages();
        const chapter = {
            name: chapterName,
            number: parseInt(chapterNumber),
            images: imageUrls // Pass the image URLs to the backend
        };
        try {
            await posterService.createChapter(chapter, manga.id);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error creating manga:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <LoadingScreen />} {/* Display the loading screen */}
            <div className="w-full h-full">
            </div>
            <div className='mt-24 w-full p-5'>
                <div className='flex w-full pb-4 border-b'>
                    <div className='w-full'>
                        <h2 className='font-extrabold my-4'>ĐĂNG TRUYỆN</h2>
                        <div className="flex items-center">
                            <div className="w-7/12">
                                <div className="mb-2">
                                    <label className="block text-sm font-bold mb-1" htmlFor="name">
                                        Tên truyện
                                    </label>
                                    <Input disabled id="name" type="text" className="h-10" value={mangaName} onChange={e => setMangaName(e.target.value)} />
                                </div>
                                <div className="mb-2 flex items-center">
                                    <label className="block text-sm font-bold mr-3  " htmlFor="number">
                                        Chương:
                                    </label>
                                    <select
                                        id="number"
                                        className="h-10 px-1 py-2 rounded-md border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-center font-medium appearance-none"
                                        value={chapterNumber}
                                        onChange={e => setChapterNumber(e.target.value)}
                                    >
                                        <option value="" hidden>Chọn chương</option>
                                        {chapterOptions.map(option => (
                                            <option key={option} value={option} className="text-center hover:bg-orange-100">
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    {errorMessages.chapterNumber && <span className="text-red-500 ml-2">{errorMessages.chapterNumber}</span>}
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-bold mb-1" htmlFor="chapter_name">
                                        Tên chương
                                    </label>
                                    <Input id="chapter_name" type="text" className="h-10" value={chapterName} onChange={e => setChapterName(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b-2 pb-2">
                    <PageUpload onImageUpload={handleImageUpload} /> {/* Pass handleImageUpload as prop */}
                    {errorMessages.images && <span className="text-red-500 ml-2">{errorMessages.images}</span>}
                </div>
                <button
                    className="font-saira my-8 bg-[#ED741B] hover:border-2 self-end h-16 text-lg font-bold  hover:bg-[#fa854f] transition duration-300 ease-in-out text-white py-2 px-4 rounded mt-4 hover:outline-none hover:border-orange-400 hover:ring-2 hover:ring-offset-2 hover:ring-[#f38e4b] shadow-md text-shadow"
                    type="submit"
                    onClick={sendChapter}
                    disabled={isLoading}
                >
                    {isLoading ? 'Đang tải...' : 'ĐĂNG TRUYỆN'}
                </button>
            </div>
        </div>
    );
}

export default PostingPage;