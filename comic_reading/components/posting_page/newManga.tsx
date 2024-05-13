"use client";
import {Input} from '../util/input.tsx';
import Header from "../util/header";
import ImgUpload from "./imgUpload.tsx";
import TagListSelector from "./tagListSelector.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {userService} from "../../src/service/userService.tsx";
import {posterService} from "../../src/service/posterService.tsx";

interface UploadProgress {
    [filename: string]: number;
}

export function NewManga() {
    const [user, setUser] = useState<any>();
    const [image, setImage] = useState<File | null>(null);
    const [mangaName, setMangaName] = useState('');
    const [author, setAuthor] = useState('');
    const [artist, setArtist] = useState('');
    const [description, setDescription] = useState('');
    const [publishingCompany, setPublishingCompany] = useState('');
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    console.log('No token found');
                    return;
                }

                const decodedToken: any = jwtDecode(token);
                const data = await userService.getUserById(decodedToken.userId);
                setUser(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        getUser();
    }, []);

    const uploadImage = async () => {
        if (!image) return;
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'dtmyad0y');
        formData.append('folder', 'van_chuong_viet/' + mangaName);

        try {
            console.log('Uploading:', image.name);
            console.log(formData)
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dpkxkkrnl/image/upload',
                formData
            );
            console.log('Upload successful:', response);
            // Clear progress for the uploaded file
            setUploadProgress((prevProgress) => {
                const {[image.name]: _, ...rest} = prevProgress;
                return rest;
            });
            return response.data.url;
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const sendManga = async () => {
        const imageUrl = await uploadImage();
        console.log('Image URL:', imageUrl)
        const manga = {
            name: mangaName,
            publishingCompany: publishingCompany,
            artist: artist,
            author: author,
            description: description,
            coverImage: imageUrl
        }
        posterService.createManga(manga, user)
    }

return (
    <div>
        <div className="w-full h-full">
            <Header/>
        </div>
        <div className='top-20 mt-28 w-full p-5'>
            <div className='flex w-full'>
                <div className='w-full'>
                    <h2 className='font-extrabold my-4'>Tạo truyện</h2>
                    <div className="flex items-center">
                        <div className="w-7/12">
                            <div className="mb-2">
                                <label className="block  text-sm font-bold mb-1" htmlFor="name">
                                    Tên truyện
                                </label>
                                <Input id="name" type="text" className="h-10" value={mangaName}
                                       onChange={e => setMangaName(e.target.value)}/>
                            </div>
                            <div className="mb-2">
                                <label className="block  text-sm font-bold mb-1" htmlFor="publishing_company">
                                    Nhà xuất bản
                                </label>
                                <Input id="publishing_company" type="text" className="h-10"
                                       value={publishingCompany}
                                       onChange={e => setPublishingCompany(e.target.value)}/>
                            </div>
                            <div className="mb-2">
                                <label className="block  text-sm font-bold mb-1" htmlFor="author">
                                    Tác giả
                                </label>
                                <Input id="author" type="text" className="h-10" value={author}
                                       onChange={e => setAuthor(e.target.value)}/>
                            </div>
                            <div className="mb-2">
                                <label className="block  text-sm font-bold mb-1" htmlFor="artist">
                                    Họa sĩ
                                </label>
                                <Input id="artist" type="text" className="h-10" value={artist}
                                       onChange={e => setArtist(e.target.value)}/>
                            </div>
                            <div className="mb-2">
                                <label className="block  text-sm font-bold mb-1" htmlFor="description">
                                    Tóm tắt
                                </label>
                                <textarea
                                    className='rounded-lg bg-zinc-800 border-2 border-neutral-500 resize-none focus:outline-none h-32 w-full'
                                    name="" id="description" value={description}
                                    onChange={e => setDescription(e.target.value)}></textarea>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='w-5/12 my-12'>
                    <label className='block  text-sm font-bold mb-1' htmlFor="name">
                        Bìa truyện
                    </label>
                    <ImgUpload onFileSelected={file => setImage(file)}/>
                </div>
            </div>
            <div className="mb-2 z-10 w-full border-b pb-4">
                <label className="block  text-sm font-bold mb-1" htmlFor="email">
                    Chọn thể loại
                </label>
                <TagListSelector/>
            </div>
            <button type="button" onClick={sendManga}>Send</button>
        </div>
    </div>
);
}

export default NewManga;