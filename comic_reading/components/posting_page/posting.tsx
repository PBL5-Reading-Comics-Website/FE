"use client";
import { DateTimeInput, Input, SelectInput } from '../util/input.tsx';
import Header from "../util/header";
import ImageUpload from "./imgUpoad";


export function chapterScreen() {

    return (
        <div>
            <div className="w-full h-full">
                <Header />
            </div>
            <div className='top-20 mt-36 w-full p-5'>
                <div className='flex w-full pb-4 border-b'>
                    <div className='w-2/3'>
                        <h2 className='font-extrabold my-4'>ĐĂNG TRUYỆN</h2>
                        <div className="flex items-center">
                            <div className="w-7/12">
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="name">
                                        Tên tài khoản
                                    </label>
                                    <Input id="name" type="text" className="h-10" />
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="email">
                                        Email
                                    </label>
                                    <Input id="email" type="email" className="h-10" />
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="username">
                                        Tên hiển thị
                                    </label>
                                    <Input id="username" type="text" className="h-10" />
                                </div>
                            </div>
                            <div className="flex flex-grow items-end justify-end">
                                <ImageUpload />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default chapterScreen;