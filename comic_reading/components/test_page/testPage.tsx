import axios from 'axios';
import React, { useState } from 'react';

interface UploadProgress {
  [filename: string]: number;
}

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [folderName, setFolderName] = useState('');
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const uploadImages = async () => {
    if (!images) return;

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'dtmyad0y');
      formData.append('folder', folderName);

      try { 
        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dpkxkkrnl/image/upload',
            formData,
            {
                onUploadProgress: (progressEvent) => {
                    setUploadProgress({
                        ...uploadProgress,
                        [image.name]: (progressEvent.loaded / (progressEvent.total ?? 0)) * 100,
                    });
                },
            }
        );

        console.log('Upload successful:', response.data);
        // Clear progress for the uploaded file
        setUploadProgress((prevProgress) => {
          const { [image.name]: _, ...rest } = prevProgress;
          return rest;
        });
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <div>
      <h2>Bulk Image Uploader</h2>

      <input type="file" multiple onChange={handleFileChange} />
      <input
        type="text"
        value={folderName}
        onChange={handleFolderChange}
        placeholder="Enter folder name"
      />
      <button onClick={uploadImages}>Upload Images</button>

      {Object.keys(uploadProgress).length > 0 && (
        <ul>
          {Object.keys(uploadProgress).map((filename) => (
            <li key={filename}>
              {filename}: {uploadProgress[filename]}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImageUploader;