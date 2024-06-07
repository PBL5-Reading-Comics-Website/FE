
import { useEffect, useState } from "react";
import { userService } from "../../src/service/userService.tsx";
import { OtherFollowHistoryTab } from "./otherFollowHistoryTab.tsx";
import { ReadHistoryTab } from "./readHistoryTab.tsx";
import { OtherUserInfoTab } from "./otherUserInfoTab.tsx";
import { OtherUserOptionsList } from "./userOptionsList.tsx";
import UploadHistoryTab from "./uploadHistoryTab.tsx";
import { useParams } from "react-router-dom";
interface UserInfoScreenProps {
  imageUrl?: string;
  userName?: string;
  author?: string;
  views?: number;
  favorites?: number;
  comments?: number;
  tags?: string[];
  description?: string;
}

interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  dateOfBirth: string;
  gender: boolean;
  email: string;
  avatar: string;
  registrationDate: string;
  role: string;
  enabled: boolean;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  authorities: Array<{ authority: string }>;
}

export function OtherUserInfoScreen({
  imageUrl = 'https://i0.wp.com/halcyonrealms.com/blogpics/leviuscover02.jpg?resize=750%2C1071&ssl=1',
  userName = 'Levius',
}: UserInfoScreenProps) {
  const { id } = useParams()
  const [selectedOption, setSelectedOption] = useState<string>("Thông tin cá nhân");
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = parseInt(id!)
        const data = await userService.getUserById(userId);
        setUser(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  return (
    <div className="relative">
      <div className="w-full h-full">
      </div>
      <div className="h-72 w-full bg-center bg-cover relative z-10 bg-[#ED741B]" >
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>
      <div className="absolute flex top-0 w-full z-20">
        <div className="w-1/3 h-fit flex flex-col justify-center items-center">
          <img src={user?.avatar} className="h-64 w-64 mt-36 mr-0 ml-auto rounded-full" alt="" />
        </div>
        <div className="w-full h-fit flex flex-col justify-start">
          <div className="w-full h-72 flex flex-col justify-end items-start text-white pl-8 pb-5">
          </div>
          <div className="h-fit w-full pl-8 pr-8 pt-3">
            <div className="flex w-fit items-center">
              <h1 className="text-3xl font-bold">{user?.username}</h1>
            </div>
            <div className="mt-4">
              <OtherUserOptionsList role={user?.role || ""} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            </div>
            <div className="mt-4">
              {selectedOption === "Thông tin cá nhân" && <OtherUserInfoTab avatarPath={imageUrl} user={user} />}
              {selectedOption === "Lịch sử đọc truyện" && <ReadHistoryTab id={user?.id} />}
              {selectedOption === "Thông tin theo dõi" && <OtherFollowHistoryTab id={user?.id}></OtherFollowHistoryTab>}
              {selectedOption === "Lịch sử đăng truyện" && <UploadHistoryTab id={user?.id} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherUserInfoScreen;