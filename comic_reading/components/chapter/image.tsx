import React from "react";

interface ImageProps {
    imageUrl: string;
}

const Image = ({imageUrl}: ImageProps) => {
    return (
        <div className="flex flex-col items-center">
            <img src={imageUrl} alt={"chapter image"} className="w-32 h-48 object-cover rounded-lg"/>
        </div>
    );
};

export default Image;