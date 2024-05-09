"use client";
import { Input } from '../util/input.tsx';
import Header from "../util/header";
import PageUpload from "./pageUpload.tsx";

export function PostingPage() {

    return (
        <div>
            <div className="w-full h-full">
                <Header />
            </div>
            <div className='top-20 mt-36 w-full p-5'>
                <div className='flex w-full pb-4 border-b'>
                    <div className='w-full'>
                        <h2 className='font-extrabold my-4'>ĐĂNG TRUYỆN</h2>
                        <div className="flex items-center">
                            <div className="w-7/12">
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="name">
                                        Tên truyện
                                    </label>
                                    <Input id="name" type="text" className="h-10" />
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="email">
                                        Chương
                                    </label>
                                    <Input id="email" type="email" className="h-10" />
                                </div>
                                <div className="mb-2">
                                    <label className="block  text-sm font-bold mb-1" htmlFor="username">
                                        Tên chương
                                    </label>
                                    <Input id="username" type="text" className="h-10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b-2 pb-2">
                    <PageUpload />
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