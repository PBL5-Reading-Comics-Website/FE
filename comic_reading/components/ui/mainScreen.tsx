"use client";
import React, { useState } from "react";
import { Header } from "./header";
import MangaList from "./mangaList";
import MangaListItem from "./mangaListItem";
import { useNavigate } from "react-router-dom";
export function MainScreen() {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-full px-4 mt-16 flex flex-col">
        <h2 className="ml-4 text-bold text-2xl py-2">Cập nhật mới nhất</h2>
        <div className="flex justify-between">
          <MangaList className="w-1/2 mr-2">
            <MangaListItem 
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShK3IrU2PQSUIujTjA2u2r9MBzKJ6nMJxpfw&s"
            mangaName="Namdz"
            />
            <MangaListItem />
            <MangaListItem />
            <MangaListItem />
            <MangaListItem />
          </MangaList>
          <MangaList className="w-1/2 ml-2">
            <MangaListItem imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShK3IrU2PQSUIujTjA2u2r9MBzKJ6nMJxpfw&s" />
            <MangaListItem />
            <MangaListItem />
            <MangaListItem />
            <MangaListItem />
          </MangaList>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
