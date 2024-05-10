import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { mangaService } from '../../src/service/mangaService';
import Header from '../util/header';
import { Input } from '../util/input';
import CustomSelector from './customSelector';
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
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    useEffect(() => {
        const fetchMangas = async () => {
            try {
                const tagId: number | undefined = selectedTag !== '' ? parseInt(selectedTag, 10) : undefined;
                console.log(tagId)
                const response = await mangaService.getMangaByTagAndName(
                    {
                        tagId: tagId == undefined ? null: tagId,
                        name: searchQuery,
                        page: currentPage
                    }
                );
                setMangas(response.data);
                setTotalPages(response.meta.totalPage);
            } catch (error) {
                console.error('Error fetching mangas:', error);
            }
        };

        fetchMangas();
    }, [currentPage, selectedTag, searchQuery]);

    const handleTagChange = (tag: string | null) => {
        setSelectedTag(tag ?? '');
        setCurrentPage(1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

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
                    <Input
                        type="text"
                        className="bg-gray-700 w-full h-full rounded-md"
                        icon={<IconSearch className="my-2 ml-2" />}
                        onChange={handleSearchChange} 
                        placeholder="Search..."
                    />
                </div>
                <CustomSelector onTagChange={handleTagChange} />
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