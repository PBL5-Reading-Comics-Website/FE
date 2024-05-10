"use client";
import {Input} from '../util/input.tsx';
import Header from "../util/header";
import ImgUpload from "./imgUpload.tsx";
import TagListSelector from "./tagListSelector.tsx";
import {useState} from "react";

export function NewManga() {
    const [manga, setManga] = useState({
        name: '',
        publishingCompany: '',
        author: '',
        artist: '',
        description: '',
        tags: [],
        coverImage: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setManga({
        ...manga,
        [e.target.name]: e.target.value
    });
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
                                    <Input id="name" type="text" className="h-10" value={manga.name}
                                           onChange={handleChange}/>
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="publishing_company">
                                        Nhà xuất bản
                                    </label>
                                    <Input id="publishing_company" type="text" className="h-10"
                                           value={manga.publishingCompany} onChange={handleChange}/>
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="author">
                                        Tác giả
                                    </label>
                                    <Input id="author" type="text" className="h-10" value={manga.author}
                                           onChange={handleChange}/>
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="artist">
                                        Họa sĩ
                                    </label>
                                    <Input id="artist" type="text" className="h-10" value={manga.artist}
                                           onChange={handleChange}/>
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="description">
                                        Tóm tắt
                                    </label>
                                </div>
                                <textarea
                                    className='rounded-lg bg-zinc-800 border-2 border-neutral-500 resize-none focus:outline-none h-32 w-full'
                                    id="description" value={manga.description} onChange={handleChange}>
                                </textarea>

                            </div>
                        </div>
                    </div>
                    <div className='w-5/12 my-12'>
                        <label className='block  text-sm font-bold mb-1' htmlFor="name">
                            Bìa truyện
                        </label>
                        <ImgUpload/>
                    </div>
                </div>
                <div className="mb-2 z-10 w-full border-b pb-4">
                    <label className="block  text-sm font-bold mb-1" htmlFor="email">
                        Chọn thể loại
                    </label>
                    <TagListSelector/>
                </div>
            </div>
        </div>
    );
}

export default NewManga;