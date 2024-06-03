import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconFaceMask, IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    const { search, searchTag } = useParams();
    const [mangas, setMangas] = useState<Manga[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState(search ?? null);
    const [selectedTag, setSelectedTag] = useState(searchTag ?? null);
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        if (search) {
            setSearchQuery(search);
        }
        if (searchTag) {
            setSelectedTag(searchTag);
        }
    }, [])

    useEffect(() => {
        const fetchMangas = async () => {
            IconFaceMask;
            try {
                const tag = selectedTag;
                const response = await mangaService.getMangaByTagAndName({
                    tag: tag,
                    name: searchQuery,
                    page: currentPage,
                    sortOrder: sortOrder,
                    sortField: sortField,
                });
                setMangas(response.data);
                setTotalPages(response.meta.totalPage);
            } catch (error) {
                console.error('Error fetching mangas:', error);
            }
        };
        fetchMangas();
    }, [currentPage, selectedTag, searchQuery, sortField, sortOrder]);

    const handleTagChange = (tag: string | null) => {
        setSelectedTag(tag || '');
        setCurrentPage(1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortField(event.target.value);
        setCurrentPage(1);
    };

    const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value);
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
            <div className='px-8 space-y-4 mt-24'>
                <div className='h-fit'>
                    <Input
                        type="text"
                        className="bg-gray-700 w-full h-full rounded-md"
                        suffixIcon={<IconSearch className="my-2 ml-2" />}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                    />
                </div>
                <CustomSelector onTagChange={handleTagChange} />
                <div className="flex space-x-4">
                    <select value={sortField} onChange={handleSortFieldChange} className="bg-gray-700 text-white rounded-md p-2">
                        <option value="name">Name</option>
                        <option value="viewNumber">Views</option>
                        <option value="favouriteNumber">Favorites</option>
                        <option value="publishAt">Published Date</option>
                    </select>
                    <select value={sortOrder} onChange={handleSortOrderChange} className="bg-gray-700 text-white rounded-md p-2">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className='flex justify-between'>
                </div>
                <div className=' w-full flex flex-wrap h-auto justify-between'>
                    {mangas.map((manga) => (
                        <div key={manga.id} className="w-[48%] items-center mt-2 bg-[#444444] hover:bg-gray-600 rounded-3xl">
                            <MangaSearchPageItem {...manga} />
                        </div>
                    ))}
                </div>
                <div className="pagination flex items-center justify-end mb-5">
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
