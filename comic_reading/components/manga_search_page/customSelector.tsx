import { IconChevronDown } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import TagList from '../tag/tagList';

interface TagListProps {
    onTagChange: (tag: string | null) => void;
}

const CustomSelector = ({ onTagChange }: TagListProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const chosenTag = "";
    const [selectedTag, setSelectedTag] = useState(chosenTag);
    const ref = useRef<HTMLDivElement>(null);
  
    const tags = ["Sports", "Slice of Life", "Shounen", "Shoujo", "Shounen Ai", "Shoujo Ai", "Supernatural", "Tragedy", "Yaoi", "Yuri", "Mecha", "Music", "Historical", "Military", "Parody", "Magic", "Demons", "Vampire", "Samurai", "Martial Arts", "Super Power", "Space", "Police", "Kids", "Josei", "Seinen", "Shounen Ai", "Shoujo Ai", "Doujinshi"];

    const handleClickOutside = (event: { target: any; }) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleTagClick = (tag: string) => {
        setSelectedTag(tag);
        onTagChange(tag);
        setIsOpen(false);
    }

    return (
        <div ref={ref} className='flex items-center justify-end'>
            <button className="text-black items-center justify-center flex p-2 py-1 bg-white border-gray-700 border-4 rounded-full hover:border-orange-400" onClick={() => setIsOpen(!isOpen)}>
                {selectedTag || 'Chọn thể loại'}
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