"use client";
import { useState } from "react";
import Header from "../util/header.tsx";
import UploadHistoryTab from "./uploadHistoryTab.tsx";
import { UploadHistoryItem } from "./uploadHistoryTab.tsx";

interface OtherUserInfoProps {
  imageUrl?: string;
  userName?: string;
  author?: string;
  views?: number;
  favorites?: number;
  comments?: number;
  tags?: string[];
  description?: string;
}

export function OtherUserInfo({
  imageUrl = 'https://i0.wp.com/halcyonrealms.com/blogpics/leviuscover02.jpg?resize=750%2C1071&ssl=1',
  userName = 'Levius',
}: OtherUserInfoProps) {

  return (
    <div className="relative">
      <div className="w-full h-full">
        <Header />
      </div>
      <div className="h-72 w-full bg-center bg-cover relative z-10" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>
      <div className="absolute flex top-0 w-full z-20">
        <div className="w-1/3 h-fit flex flex-col justify-center items-center">
        <img src={imageUrl} className="h-64 w-64 mt-36 mr-0 ml-auto rounded-full" alt="" />
        </div>
        <div className="w-full h-fit flex flex-col justify-start">
          <div className="w-full h-72 flex flex-col justify-end items-start text-white pl-8 pb-5">
          </div>
          <div className="h-fit w-full pl-8 pr-8 pt-3">
            <div className="flex flex-col w-fit items-start">
            <h1 className="text-3xl font-bold">{userName}</h1>
            <h2 className="text-2xl font-semibold my-8">Lịch sử đăng truyện</h2>
            </div>
            <div className="">
                <UploadHistoryTab>
                    <UploadHistoryItem />
                    <UploadHistoryItem />
                    <UploadHistoryItem />
                    <UploadHistoryItem />
                    <UploadHistoryItem />
                </UploadHistoryTab>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherUserInfo;