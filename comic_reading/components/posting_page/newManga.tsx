"use client";
import { Input } from '../util/input.tsx';
import Header from "../util/header";
import ImgUpload from "./imgUpload.tsx";
import TagListSelector from "./tagListSelector.tsx";

export function NewManga() {

    return (
        <div>
            <div className="w-full h-full">
                <Header />
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
                                    <Input id="name" type="text" className="h-10" />
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="name">
                                        Nhà xuất bản
                                    </label>
                                    <Input id="name" type="text" className="h-10" />
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="name">
                                        Tác giả
                                    </label>
                                    <Input id="name" type="text" className="h-10" />
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="name">
                                        Họa sĩ
                                    </label>
                                    <Input id="name" type="text" className="h-10" />
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="email">
                                        Tóm tắt
                                    </label>
                                    <textarea className='rounded-lg bg-zinc-800 border-2 border-neutral-500 resize-none focus:outline-none h-32 w-full' name="" id=""></textarea>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='w-5/12 my-12'>
                        <label className='block  text-sm font-bold mb-1' htmlFor="name">
                            Bìa truyện
                        </label>
                        <ImgUpload />
                    </div>
                </div>
                <div className="mb-2 z-10 w-full border-b pb-4">
                    <label className="block  text-sm font-bold mb-1" htmlFor="email">
                        Chọn thể loại
                    </label>
                    <TagListSelector />
                </div>
            </div>
        </div>
    );
}

export default NewManga;