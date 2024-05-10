import { CSSProperties } from "react";
import Tag from "./tag";

interface TagsListProps {
  tags: { id: number, name: string }[]; 
  onTagClick: (tag: { id: number, name: string }) => void; 
  style?: CSSProperties;
}

export function TagsList({ tags, onTagClick, style }: TagsListProps) {
  return (
    <div className="flex flex-wrap w-full h-fit" style={style}>
      {tags.map((tag) => (
        <Tag key={tag.id} text={tag.name} onClick={() => onTagClick(tag)} /> 
      ))}
    </div>
  );
}

export default TagsList;