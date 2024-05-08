import { useState, useEffect, useRef } from 'react';
import TagList from '../tag/tagList';
import { IconChevronDown } from '@tabler/icons-react';

const CustomSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState('Chọn thể loại');
    const ref = useRef<HTMLDivElement>(null);

    const tags = ['Trinh thám', 'Tình cảm', 'Hành động', 'Khoa học viễn tưởng', 'Truyện nước ngoài', 'Harem', 'Shoujo', 'Truyện Việt Nam', 'Action', 'Adventure', 'Fantasy', 'Comedy', 'Drama', 'Slice of life', 'Mystery', 'Horror', 'Psychological', 'Romance', 'School life', 'Sci-fi', 'Shounen', 'Shoujo', 'Shounen ai', 'Shoujo ai', 'Sports', 'Supernatural', 'Tragedy', 'Yaoi', 'Yuri', 'Mecha', 'Music', 'Historical', 'Military', 'Parody', 'Magic', 'Demons', 'Vampire', 'Samurai', 'Martial arts', 'Super power', 'Space', 'Police', 'Kids', 'Josei', 'Seinen', 'Shounen ai', 'Shoujo ai', 'Doujinshi'];

    const handleClickOutside = (event: { target: any; }) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleTagClick = (tag: string) => {
        setSelectedTag(tag);
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={ref} className='flex items-center justify-end'>
            <button className="text-black items-center justify-center flex p-2 py-1 bg-white border-gray-700 border-4 rounded-full hover:border-orange-400" onClick={() => setIsOpen(!isOpen)}>
                {selectedTag}
                <IconChevronDown size={24} className='pt-1'/>
            </button>
            {isOpen && <div className="h-full fixed backdrop-blur-sm inset-x-0 top-0 w-full flex items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
            </div>}
            {isOpen && <div className="bg-[#1a1a1a] w-1/2 inset-x-1/4 top-40 rounded-xl p-4 fixed" onClick={handleClickOutside}>
            <TagList tags={tags} onTagClick={handleTagClick} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}/>
            </div>}
        </div>
    );
};

export default CustomSelector;