"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mangaService } from "../../src/service/mangaService.tsx";
import Footer from "../util/footer.tsx";
import { Header } from "../util/header.tsx";
import MangaHorizontalList from "./manga/mangaHorizontalList.tsx";
import MangaHorizontalListItem from "./manga/mangaHorizontalListItem.tsx";
import MangaList from "./manga/mangaList.tsx";
import MangaListItem from "./manga/mangaListItem.tsx";
interface Manga {
  id: string;
  coverImage: string;
  name: string;
  author: string;
  publishAt: string;
}

export function MainScreen() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [seasonalMangas, setSeasonalMangas] = useState<Manga[]>([]);
  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const data = await mangaService.getTop10NewestManga();
        setMangas(data.data);
      } catch (error) {
        console.error(error);
      }
    }



    fetchMangas();
  }, []);
  useEffect(() => {
    const fetchSeasonalMangas = async () => {
      try {
        const month = new Date().getMonth() + 1;
        let data;
        if (month <= 3) {
          data = await mangaService.getMangaPublishedInFirstQuarter();
        } else if (month <= 6) {
          data = await mangaService.getMangaPublishedInSecondQuarter();
        } else if (month <= 9) {
          data = await mangaService.getMangaPublishedInThirdQuarter();
        } else {
          data = await mangaService.getMangaPublishedInFourthQuarter();
        }

        setSeasonalMangas(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeasonalMangas();
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
        <div className="flex items-center">
            <h2 className="text-bold text-xl my-4 inline-block mr-2">Cập nhật mới nhất</h2>
            <Link to="/search" className="inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white hover:text-gray-500 transition-colors duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          <div className="flex justify-between">
            <MangaList className="w-1/2 mr-2">
              {mangas.slice(0, 5).map((manga, index) => (
                <MangaListItem
                  id={manga.id}
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
                  id={manga.id}
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
            {seasonalMangas.map((manga, index) => (
              <MangaHorizontalListItem
              id={manga.id}
                key={index}
                imageUrl={manga.coverImage}
                mangaName={manga.name}
              />
            ))}
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