"use client";
import React, { useState } from "react";
import { Header } from "./header";
import MangaList from "./mangaList";
import MangaListItem from "./mangaListItem";
import MangaHorizontalList from "./mangaHorizontalList";
import MangaHorizontalListItem from "./mangaHorizontalListItem";
import { useNavigate } from "react-router-dom";

export function MainScreen() {
  const imageLink = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxeHo9j4IlUFhygyd9bXGP2XqppHByB729-W-mxs29HvfKfYpHpYRSAUe4FtMi1HeuIHOUOQ";
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-full px-4 mt-16 flex flex-col">
        <div className="new_update">
        <h2 className="text-bold text-xl my-4">Cập nhật mới nhất</h2>
        <div className="flex justify-between">
          <MangaList className="w-1/2 mr-2">
            <MangaListItem />
            <MangaListItem />
            <MangaListItem />
            <MangaListItem />
            <MangaListItem />
          </MangaList>
          <MangaList className="w-1/2 ml-2">
            <MangaListItem />
            <MangaListItem />
            <MangaListItem />
            <MangaListItem />
            <MangaListItem />
          </MangaList>
        </div>
        </div>
        <div className="seasonal">
        <h2 className="text-bold text-xl my-4">Theo mùa</h2>
        <MangaHorizontalList className="mt-2">
          <MangaHorizontalListItem imageUrl="https://play-lh.googleusercontent.com/PNwko2YeBrS_qw2Cjst-zXsc_AsZ8zT9CY9SA_uj1LKaI4ONdG8yX-xZsa8GmIQWVg=w526-h296-rw" mangaName="Manga 1" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 2" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 3" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 4" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 5" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 6" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 7" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 8" />
        </MangaHorizontalList>
      </div>
      <div className="monthly">
        <h2 className="text-bold text-xl my-4">Theo tháng</h2>
        <MangaHorizontalList className="mt-2">
          <MangaHorizontalListItem imageUrl="https://play-lh.googleusercontent.com/PNwko2YeBrS_qw2Cjst-zXsc_AsZ8zT9CY9SA_uj1LKaI4ONdG8yX-xZsa8GmIQWVg=w526-h296-rw" mangaName="Manga 1" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 2" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 3" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 4" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 5" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 6" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 7" />
          <MangaHorizontalListItem imageUrl={imageLink}  mangaName="Manga 8" />
        </MangaHorizontalList>
      </div>
      </div>
    </div>
  );
}

export default MainScreen;