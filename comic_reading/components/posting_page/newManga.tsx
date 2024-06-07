"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { posterService } from "../../src/service/posterService.tsx";
import { userService } from "../../src/service/userService.tsx";
import Header from "../util/header";
import { Input } from '../util/input.tsx';
import ImgUpload from "./imgUpload.tsx";
import TagListSelector from "./tagListSelector.tsx";

interface UploadProgress {
  [filename: string]: number;
}

export function NewManga() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [mangaName, setMangaName] = useState('');
  const [author, setAuthor] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [publishingCompany, setPublishingCompany] = useState('');
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          console.log('No token found');
          return;
        }
        const decodedToken: any = jwtDecode(token);
        const data = await userService.getUserById(decodedToken.userId);
        setUser(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  const uploadImage = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'team_upload');
    formData.append('folder', 'van_chuong_viet/' + mangaName);

    try {
      console.log('Uploading:', image.name);
      console.log(formData)
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dcwqcvfi6/image/upload',
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = (progressEvent.loaded / progressEvent.total) * 100;
              setUploadProgress((prevProgress) => ({
                ...prevProgress,
                [image.name]: progress
              }));
            }
          }
        }
      );
      console.log('Upload successful:', response);
      setUploadProgress((prevProgress) => {
        const { [image.name]: _, ...rest } = prevProgress;
        return rest;
      });
      return response.data.url;
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const sendManga = async () => {
    setIsLoading(true);
    const imageUrl = await uploadImage();
    console.log('Image URL:', imageUrl);
    const manga = {
      name: mangaName,
      publishingCompany: publishingCompany,
      artist: artist,
      author: author,
      description: description,
      coverImage: imageUrl,
      tags: tags
    };
    try {
      await posterService.createManga(manga, user);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error creating manga:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagsSelected = (tags: string[] | null) => {
    setTags(tags ?? []);
    console.log(tags);

  };

  return (
    <div>
      <div className="w-full h-full">
      </div>
      <div className='top-20 mt-28 w-full p-5'>
        <div className='flex w-full'>
          <div className='w-full'>
            <h2 className='font-extrabold my-4'>Tạo truyện</h2>
            <div className="flex items-center">
              <div className="w-7/12">
                <div className="mb-2">
                  <label className="block text-sm font-bold mb-1" htmlFor="name">
                    Tên truyện
                  </label>
                  <Input id="name" type="text" className="h-10" value={mangaName}
                    onChange={e => setMangaName(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-bold mb-1" htmlFor="publishing_company">
                    Nhà xuất bản
                  </label>
                  <Input id="publishing_company" type="text" className="h-10"
                    value={publishingCompany}
                    onChange={e => setPublishingCompany(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-bold mb-1" htmlFor="author">
                    Tác giả
                  </label>
                  <Input id="author" type="text" className="h-10" value={author}
                    onChange={e => setAuthor(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-bold mb-1" htmlFor="artist">
                    Họa sĩ
                  </label>
                  <Input id="artist" type="text" className="h-10" value={artist}
                    onChange={e => setArtist(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-bold mb-1" htmlFor="description">
                    Tóm tắt
                  </label>
                  <textarea
                    className='rounded-lg bg-zinc-800 border-2 border-neutral-500 resize-none focus:outline-none h-32 w-full'
                    name="" id="description" value={description}
                    onChange={e => setDescription(e.target.value)}></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className='w-5/12 my-12'>
            <label className='block text-sm font-bold mb-1' htmlFor="name">
              Bìa truyện
            </label>
            <ImgUpload onFileSelected={(file: File | null) => setImage(file)} />
            {Object.entries(uploadProgress).map(([filename, progress]) => (
              <div key={filename}>
                {filename}: {progress}%
              </div>
            ))}
          </div>
        </div>
        <div className="mb-2 z-10 w-full border-b pb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="email">
            Chọn thể loại
          </label>
          <TagListSelector onTagsSelected={handleTagsSelected} />
        </div>
        <button type="button" onClick={sendManga} disabled={isLoading}>
          {isLoading ? 'Đang tạo...' : 'Tạo truyện'}
        </button>

        {/* Alert for successful creation */}
        {showAlert && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-md">
            Truyện đã được tạo thành công!
          </div>
        )}
      </div>
    </div>
  );
}

export default NewManga;