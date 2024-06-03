"use client";
import Header from "../util/header";
import { Input } from '../util/input.tsx';
import PageUpload from "./pageUpload.tsx";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {posterService} from "../../src/service/posterService.tsx";
import {useNavigate} from "react-router-dom";
import {mangaService} from "../../src/service/mangaService.tsx";

interface UploadProgress {
    [filename: string]: number;
}

export function PostingPage() {
    const [images, setImages] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
    const [mangaName, setMangaName] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [chapterNumber, setChapterNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [manga, setManga] = useState<any>();
    const navigate = useNavigate();

    // Update handleImageUpload to set the images state
    const handleImageUpload = (newImages: File[]) => {
        setImages(newImages);
    };

    useEffect(() => {
        const getManga = async () => {
            try {
                const data = await mangaService.getMangaById(14);
                console.log(data);
                setManga(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        getManga();
    }, []);

    // Upload images to Cloudinary
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

                // Clear progress for the uploaded file
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

    // Send chapter to backend
    const sendChapter = async () => {
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
            <div className="w-full h-full">
                {/* <Header /> */}
            </div>
            <div className='mt-24 w-full p-5'>
                <div className='flex w-full pb-4 border-b'>
                    <div className='w-full'>
                        <h2 className='font-extrabold my-4'>ĐĂNG TRUYỆN</h2>
                        <div className="flex items-center">
                            <div className="w-7/12">
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="name">
                                        Tên truyện
                                    </label>
                                    <Input id="name" type="text" className="h-10" value={mangaName} onChange={e => setMangaName(e.target.value)}/>
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="number">
                                        Chương
                                    </label>
                                    <Input id="number" type="text" className="h-10" value={chapterNumber} onChange={e => setChapterNumber(e.target.value)} />
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="chapter_name">
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
                </div>
                <button
                    className="font-saira my-8 bg-[#ED741B] hover:border-2 hover:border-[#b8382f] self-end h-16 text-lg font-bold"
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