import { CSSProperties } from "react";
import Tag from "./tag";

interface TagsListProps {
    tags: string[];
    onTagClick: (tag: string) => void;
    style?: CSSProperties;
}

export function TagsList({ tags, onTagClick, style }: TagsListProps) {
    return (
        <div className="flex flex-wrap w-full h-fit" style={style}>
            {tags.map((tag, index) => (
                <Tag key={index} text={tag} onClick={() => onTagClick(tag)} />
            ))}
        </div>
    );
}

export default TagsList;