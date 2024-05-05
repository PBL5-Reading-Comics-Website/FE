"use client";
import { useEffect, useState } from "react";
import { mangaService } from "../../src/service/mangaService.tsx";
import Footer from "../util/footer.tsx";
import { Header } from "../util/header.tsx";
import MangaHorizontalList from "./manga/mangaHorizontalList.tsx";
import MangaHorizontalListItem from "./manga/mangaHorizontalListItem.tsx";
import MangaList from "./manga/mangaList.tsx";
import MangaListItem from "./manga/mangaListItem.tsx";

interface Manga {
  coverImage: string;
  name: string;
  author: string;
  publishAt: string;
}

export function MainScreen() {
  const [mangas, setMangas] = useState<Manga[]>([]);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const data = await mangaService.getAllMangas();
        setMangas(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMangas();
  }, []);
  function timeSince(date: string) {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
    let interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " năm";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " tháng";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " ngày";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " giờ";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " phút";
    }
    return Math.floor(seconds) + " giây";
  }
  const imageLink = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxeHo9j4IlUFhygyd9bXGP2XqppHByB729-W-mxs29HvfKfYpHpYRSAUe4FtMi1HeuIHOUOQ";
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-full px-4 mt-16 flex flex-col">
        <div className="new_update">
          <h2 className="text-bold text-xl my-4">Cập nhật mới nhất</h2>
          <div className="flex justify-between">
            <MangaList className="w-1/2 mr-2">
              {mangas.slice(0, 5).map((manga, index) => (
                <MangaListItem
                  key={index}
                  imageUrl={manga.coverImage}
                  mangaName={manga.name}
                  posterName={manga.author}
                  postTime={timeSince(manga.publishAt)}
                />
              ))}
              {Array(5 - mangas.slice(0, 5).length).fill({}).map((_, index) => (
                <MangaListItem key={mangas.length + index} />
              ))}
            </MangaList>
            <MangaList className="w-1/2 mr-2">
              {mangas.slice(5, 10).map((manga, index) => (
                <MangaListItem
                  key={index}
                  imageUrl={manga.coverImage}
                  mangaName={manga.name}
                  posterName={manga.author}
                  postTime={timeSince(manga.publishAt)}
                />
              ))}
              {Array(5 - mangas.slice(5, 10).length).fill({}).map((_, index) => (
                <MangaListItem key={mangas.length + index + 5} />
              ))}
            </MangaList>
          </div>
        </div>
        <div className="seasonal">
          <h2 className="text-bold text-xl my-4">Theo mùa</h2>
          <MangaHorizontalList className="mt-2">
            <MangaHorizontalListItem imageUrl="https://play-lh.googleusercontent.com/PNwko2YeBrS_qw2Cjst-zXsc_AsZ8zT9CY9SA_uj1LKaI4ONdG8yX-xZsa8GmIQWVg=w526-h296-rw" mangaName="Manga 1" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 2" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 3" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 4" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 5" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 6" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 7" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 8" />
          </MangaHorizontalList>
        </div>
        <div className="monthly">
          <h2 className="text-bold text-xl my-4">Theo tháng</h2>
          <MangaHorizontalList className="mt-2">
            <MangaHorizontalListItem imageUrl="https://play-lh.googleusercontent.com/PNwko2YeBrS_qw2Cjst-zXsc_AsZ8zT9CY9SA_uj1LKaI4ONdG8yX-xZsa8GmIQWVg=w526-h296-rw" mangaName="Manga 1" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 2" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 3" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 4" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 5" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 6" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 7" />
            <MangaHorizontalListItem imageUrl={imageLink} mangaName="Manga 8" />
          </MangaHorizontalList>
        </div>
        <div className="h-64"></div>
      </div>
      <Footer />
    </div>
  );
}

export default MainScreen;