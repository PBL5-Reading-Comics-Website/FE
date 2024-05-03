import React from "react";
import Tag from "./tag";

interface TagsListProps {
    tags: string[];
}

export function TagsList({ tags }: TagsListProps) {
    return (
        <div className="flex flex-wrap w-full h-fit">
            {tags.map((tag, index) => (
                <Tag key={index} text={tag} />
            ))}
        </div>
    );
}

export default TagsList;