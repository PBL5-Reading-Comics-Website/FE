import React, { useState } from 'react';
import './pageUpload.css';

interface PageUploadProps {
  onImageUpload?: (images: File[]) => void;
}

const PageUpload: React.FC<PageUploadProps> = ({ onImageUpload }) => {
  const [images, setImages] = useState<File[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const newImages = [...images];

    if (selectedImageIndex !== null) {
      newImages[selectedImageIndex] = file;
    } else {
      newImages.push(file);
    }
    setImages(newImages);
    setSelectedImageIndex(null);

    // Call the onImageUpload callback with the new images
    onImageUpload?.(newImages);
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
                  src={URL.createObjectURL(image)} // Use URL.createObjectURL for displaying File objects
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