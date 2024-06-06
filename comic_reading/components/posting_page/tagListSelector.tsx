import {useState, useEffect, useRef} from 'react';
import TagList from '../tag/tagList';
import Tag from '../tag/tag';
import {
    IconArrowNarrowRight
} from '@tabler/icons-react';

const TagListSelector = ({onTagsSelected}: { onTagsSelected: (tags: string[] | null) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    const tags = ['Trinh thám', 'Tình cảm', 'Hành động', 'Khoa học viễn tưởng', 'Truyện nước ngoài', 'Harem', 'Shoujo', 'Truyện Việt Nam', 'Action', 'Adventure', 'Fantasy', 'Comedy', 'Drama', 'Slice of life', 'Mystery', 'Horror', 'Psychological', 'Romance', 'School life', 'Sci-fi', 'Shounen', 'Shoujo', 'Shounen ai', 'Shoujo ai', 'Sports', 'Supernatural', 'Tragedy', 'Yaoi', 'Yuri', 'Mecha', 'Music', 'Historical', 'Military', 'Parody', 'Magic', 'Demons', 'Vampire', 'Samurai', 'Martial arts', 'Super power', 'Space', 'Police', 'Kids', 'Josei', 'Seinen', 'Shounen ai', 'Shoujo ai', 'Doujinshi'];

    const handleClickOutside = (event: { target: any; }) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleTagClick = (tag: string) => {
        setSelectedTags(prevTags => [...prevTags, tag]);
        setIsOpen(false);
    };

    const handleTagRemove = (tag: string) => {
        setSelectedTags(prevTags => prevTags.filter(t => t !== tag));
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        onTagsSelected(selectedTags);
    }, [selectedTags]);

    return (
        <div ref={ref} className='flex items-center justify-start flex-wrap'>
            <button
                className="text-black items-center justify-center flex p-2 py-1 bg-white border-gray-700 border-4 rounded-full hover:border-orange-400"
                onClick={() => setIsOpen(!isOpen)}>
                Select Tags
                <IconArrowNarrowRight
                    size={24} className='pt-1'/>
            </button>
            {selectedTags.map((tag, index) => (
                <Tag key={index} text={tag} onClick={() => handleTagRemove(tag)}/>
            ))}
            {isOpen &&
                <div className="h-full fixed backdrop-blur-sm inset-x-0 top-0 w-full flex items-center justify-center"
                     onClick={() => setIsOpen(!isOpen)}>
                </div>}
            {isOpen && <div className="bg-[#1a1a1a] w-1/2 inset-x-1/4 top-40 rounded-xl p-4 fixed"
                            onClick={handleClickOutside}>
                <TagList tags={tags} onTagClick={handleTagClick}
                         style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}/>
            </div>}
        </div>
    );
};

export default TagListSelector;