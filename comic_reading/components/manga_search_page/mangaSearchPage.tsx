import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { mangaService } from '../../src/service/mangaService';
import Header from '../util/header';
import MangaSearchPageItem from './mangaSearchPageItems';
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

    useEffect(() => {
        const fetchMangas = async () => {
            const response = await mangaService.getAllMangas({ page: currentPage });
            setMangas(response.data);
            setTotalPages(response.meta.totalPage);
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
            <div className='px-8 space-y-4'>
                {mangas.map((manga) => (
                    <div key={manga.id} className="flex flex-col items-center mt-24 bg-[#444444] hover:bg-gray-600 rounded-3xl">
                        <MangaSearchPageItem {...manga} />
                    </div>
                ))}
                <div className="pagination" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <FontAwesomeIcon 
                        icon={faChevronLeft} 
                        onClick={prevPage} 
                        style={{ cursor: currentPage === 1 ? 'default' : 'pointer', color: currentPage === 1 ? 'gray' : 'black' }} 
                    />
                    <span className='px-4 font-bold text-xl'>{currentPage}</span>
                    <FontAwesomeIcon 
                        icon={faChevronRight} 
                        onClick={nextPage} 
                        style={{ cursor: currentPage === totalPages ? 'default' : 'pointer', color: currentPage === totalPages ? 'gray' : 'black' }} 
                    />
                </div>
            </div>
        </div>
    );
}

export default MangaSearchPage;