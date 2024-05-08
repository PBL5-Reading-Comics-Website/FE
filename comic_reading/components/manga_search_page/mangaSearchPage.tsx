import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { mangaService } from '../../src/service/mangaService';
import Header from '../util/header';
import MangaSearchPageItem from './mangaSearchPageItems';
import { Input } from '../util/input';
import { IconSearch } from '@tabler/icons-react';
import CustomSelector from './customSelector';

interface Manga {
    id: number;
    name: string;
    publishingCompany: string;
    author: string;
    artist: string;
    coverImage: string;
    status: string;
    readingStatus: string;
    viewNumber: number;
    favouriteNumber: number;
    commentNumber: number;
    publishAt: string;
    updateAt: string;
    updateUser: string | null;
    tags: string[];
}

export function MangaSearchPage() {
    const [mangas, setMangas] = useState<Manga[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const dummyMangas: Manga[] = Array.from({ length: 12 }, (_, index) => ({
        id: index,
        name: `Manga ${index + 1}`,
        publishingCompany: `Company ${index + 1}`,
        author: `Author ${index + 1}`,
        artist: `Artist ${index + 1}`,
        coverImage: `https://example.com/manga${index + 1}.jpg`,
        status: 'Ongoing',
        readingStatus: 'Not started',
        viewNumber: Math.floor(Math.random() * 10000),
        favouriteNumber: Math.floor(Math.random() * 1000),
        commentNumber: Math.floor(Math.random() * 500),
        publishAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
        updateUser: null,
        tags: ['Action', 'Adventure', 'Fantasy'],
      }));

    useEffect(() => {
        const fetchMangas = async () => {
          const response = await mangaService.getAllMangas({ page: currentPage });
          const start = (currentPage - 1) * 10;
          const end = start + 10;
          setMangas(dummyMangas.slice(start, end));
          setTotalPages(Math.ceil(dummyMangas.length / 10));
        };
        fetchMangas();
      }, [currentPage]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <Header />
            <div className='px-8 space-y-4 mt-24'>
                <div className='h-fit'>
                    <Input type="text" className="bg-gray-700 w-full h-full rounded-md" icon={<IconSearch className="my-2 ml-2" />}>
                    </Input>
                </div>
                <CustomSelector />
                <div className='flex justify-between'>
                </div>
                <div className=' w-full flex flex-wrap h-auto justify-between'>
                    {mangas.map((manga) => (
                        <div key={manga.id} className="w-[48%] items-center mt-2 bg-[#444444] hover:bg-gray-600 rounded-3xl">
                            <MangaSearchPageItem {...manga} />
                        </div>
                    ))}
                </div>
                <div className="pagination flex items-center justify-end mb-5" >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        onClick={prevPage}
                        style={{ cursor: currentPage === 1 ? 'default' : 'pointer', color: currentPage === 1 ? 'black' : 'gray' }}
                    />
                    <span className='px-4 font-bold text-xl mb-1'>{currentPage}</span>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        onClick={nextPage}
                        style={{ cursor: currentPage === totalPages ? 'default' : 'pointer', color: currentPage === totalPages ? 'black' : 'gray' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default MangaSearchPage;