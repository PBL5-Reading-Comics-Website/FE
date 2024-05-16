"use client";
import Header from "../util/header";
import { Input } from '../util/input.tsx';
import PageUpload from "./pageUpload.tsx";
import axios from "axios";
import React, {useState} from "react";
import {posterService} from "../../src/service/posterService.tsx";
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
    const handleImageUpload = (images: string[]) => {
        console.log('Uploaded images:', images);
        // You can now use the images array here
    };
    const uploadImages = async () => {
        if (!images) return;

        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'dtmyad0y');
            formData.append('folder', mangaName + "/" + chapterName);

            try {
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dpkxkkrnl/image/upload',
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
                // Clear progress for the uploaded file
                setUploadProgress((prevProgress) => {
                    const { [image.name]: _, ...rest } = prevProgress;
                    return rest;
                });
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
    };
    const sendChapter = async () => {
        setIsLoading(true); // Show loading
        const imageUrl = await uploadImages();
        console.log('Image URL:', imageUrl);
        const chapter = {
            name: chapterName,
            number: chapterNumber
        };
        try {
            await posterService.creatChapter(chapter, manga.id);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error creating manga:', error);
        } finally {
            setIsLoading(false); // Hide loading
        }
    }
}
    return (
        <div>
            <div className="w-full h-full">
                <Header />
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
                    <PageUpload onImageUpload={handleImageUpload}>
                </div>
                <button
                    className="font-saira my-8 bg-[#ED741B] hover:border-2 hover:border-[#b8382f] self-end h-16 text-lg font-bold"
                    type="submit"
                >
                    ĐĂNG TRUYỆN
                </button>
            </div>
        </div>
    );
}

export default PostingPage;