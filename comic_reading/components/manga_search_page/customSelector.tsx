import { IconChevronDown } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import TagList from '../tag/tagList';

const CustomSelector = ({ onTagChange }: { onTagChange: (tag: string | null) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState('Chọn thể loại');
    const ref = useRef<HTMLDivElement>(null);
  
    const tags = [
        { id: 1, name: 'Thể thao', englishName: 'Sports' },
        { id: 2, name: 'Chính kịch', englishName: 'Drama' },
        { id: 3, name: 'Đời thường', englishName: 'Slice of Life' },
        { id: 4, name: 'Lãng mạn', englishName: 'Romance' },
        { id: 5, name: 'Hài hước', englishName: 'Comedy' },
        { id: 6, name: 'Kinh dị', englishName: 'Horror' },
        { id: 7, name: 'Bí ẩn', englishName: 'Mystery' },
        { id: 8, name: 'Hành động', englishName: 'Action' },
        { id: 9, name: 'Phiêu lưu', englishName: 'Adventure' },
        { id: 10, name: 'Fantasy', englishName: 'Fantasy' },
        { id: 11, name: 'Hồi hộp', englishName: 'Thriller' },
        { id: 12, name: 'Khoa học viễn tưởng', englishName: 'Sci-Fi' },
        { id: 13, name: 'Tâm lý', englishName: 'Psychological' },
        { id: 14, name: 'Lịch sử', englishName: 'Historical' },
        { id: 15, name: 'Tội phạm', englishName: 'Crime' },
        { id: 16, name: 'Cô gái phép thuật', englishName: 'Magical Girls' },
        { id: 17, name: 'Bi kịch', englishName: 'Tragedy' },
      ];

    const handleClickOutside = (event: { target: any; }) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleTagClick = (tag: { id: number, name: string }) => {
        setSelectedTag(tag.name);
        setIsOpen(false);
        onTagChange(tag.id.toString()); // Pass tag.id as a string
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
            {isOpen && (
                <div className="bg-[#1a1a1a] w-1/2 inset-x-1/4 top-40 rounded-xl p-4 fixed" onClick={handleClickOutside}>
                    <TagList tags={tags} onTagClick={handleTagClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                </div>
            )}
        </div>
    );
};

export default CustomSelector;