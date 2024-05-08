import React, { useState } from 'react';
import './pageUpload.css';

const PageUpload = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const getImages = () => {
    return images;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const newImages = [...images];
      if (selectedImageIndex !== null) {
        newImages[selectedImageIndex] = reader.result as string;
      } else {
        newImages.push(reader.result as string);
      }
      setImages(newImages);
      setSelectedImageIndex(null);
    };

    reader.readAsDataURL(file);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    const fileInput = document.getElementById('page-upload') as HTMLInputElement;
    fileInput.click();
  };
  
  return (
    <div className="page-upload">
      <label htmlFor="page-upload">
        <div className="cross"></div>
      </label>
      <input
        id="page-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      <div className="page-display">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Uploaded"
            className="h-[300px] w-[200px] mr-5 mb-5"
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PageUpload;