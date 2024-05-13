import { useState } from 'react';
import './imageUpload.css';

function ImageUpload({ onFileSelected }) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
      onFileSelected(file); // Call the callback function with the selected file
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  return (
    <div className="image-upload">
      <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
        {image ? (
          <img src={image} alt="Uploaded" style={{ width: '200px', height: '300px' }} />
        ) : (
          <div className="cross"></div>
        )}
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default ImageUpload;