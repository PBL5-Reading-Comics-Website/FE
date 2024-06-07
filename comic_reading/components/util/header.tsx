"use client";
import {
  IconBell,
  IconMenuDeep,
  IconSearch
} from "@tabler/icons-react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { authService } from "../../src/service/authService";
import { userService } from "../../src/service/userService";
import { Input } from './input';
let isLoggedIn = false;

interface HeaderProps {
  onOpenRequestDialog: () => void;
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

export function Header(props: HeaderProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState<User>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [isSmall, setIsSmall] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleDropdown = () => {
    const token = Cookies.get('token');
    if (token) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
    setDropdownVisible(!dropdownVisible);
  };
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      isLoggedIn = true;
    }
  });
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);

  }
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/search/${searchQuery}/null/null/null`);
  };
  const handleOpenRequestDialog = () => {
    props.onOpenRequestDialog();
  };

  const handleCloseRequestDialog = () => {
    setIsRequestDialogOpen(false);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1100);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="w-full top-0 z-50 absolute">
      {!isSmall && (
        <div className="w-full h-fit flex bg-black justify-between items-center absolute">
          <div className="h-16 flex items-center justify-center p-5">
            <Link to="/">
              <h1 className="text-center font-saira font-bold text-xl text-white">
                VANCHUONG
                <span className="text-[#ED741B]">VIET</span>
              </h1>
            </Link>
          </div>
          <div className="h-16 flex items-center justify-center p-5">
            <Link to="/search/null/updateAt/null/null">
              <h1 className="text-center font-saira font-bold text-xl text-white">
                TRUYỆN MỚI
              </h1>
            </Link>
          </div>
          <div className="h-16 flex items-center justify-center p-5">
            <Link to="/search/null/null/null/null">
              <h1 className="text-center font-saira font-bold text-xl text-white">
                DANH SÁCH TRUYỆN
              </h1>
            </Link>
          </div>
          <div className="h-16 flex items-center justify-center p-5">
            <Link to="/search/null/viewNumber/desc/null">
              <h1 className="text-center font-saira font-bold text-xl text-white">
                TRUYỆN HOT
              </h1>
            </Link>
          </div>
          <div className="flex items-center w-fit relative">
            <form action="submit" onSubmit={handleSearchSubmit}>
              <div className="h-7 w-60 m-5 bg-gray-700  rounded-md flex">
                <Input type="text" className="bg-gray-700 w-full h-full rounded-md" onChange={
                  (e) => handleSearch(e.target.value)
                }
                  suffixIcon={
                    <Link to={`/search/${searchQuery}/${null}`}>
                      <IconSearch className="text-white h-4 w-4 z-10 cursor-pointer" />
                    </Link>
                  } >
                </Input>
              </div>
            </form>
          </div>
          <div className="p-5 h-16 items-end justify-center flex flex-col top-0 relative">
            <div onClick={toggleDropdown} className="flex items-center justify-center">
              <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={user?.avatar}>
              </img>
              <h1 className="text-white text-xl mx-3">{user?.username || ''}</h1>
            </div>
            {dropdownVisible && (
              <div className="flex flex-col p-1 w-[200%] h-fit mt-1 justify-center items-center top-full bg-neutral-800 border-2 border-white absolute rounded-md">
                {isLoggedIn === false ? (
                  <Link to="/login" className="p-4">
                    <h1 onClick={toggleDropdown} className="text-white text-base text-center">Đăng nhập</h1>
                  </Link>
                ) : (
                  <>
                    <Link to="/user-info" className="p-4">
                      <h1 onClick={toggleDropdown} className="text-white text-base text-center">Thông tin cá nhân</h1>
                    </Link>
                    <div className="bg-gradient-to-r from-transparent via-white dark:via-white to-transparent h-[1px] w-full" />
                    {user?.role === "POSTER" && (
                      <>
                        <Link to="/new-manga" className="p-4">
                          <h1 onClick={toggleDropdown} className="text-white text-base">Đăng truyện</h1>
                        </Link>
                        <div className="bg-gradient-to-r from-transparent via-white dark:via-white to-transparent h-[1px] w-full" />
                      </>
                    )}
                    {user?.role === "USER" && (
                      <>
                        <div className="p-4" onClick={handleOpenRequestDialog}>
                          <h1 onClick={toggleDropdown} className="text-white text-lg text-bold">Xin lên làm người đăng truyện</h1>
                        </div>
                        <div className="bg-gradient-to-r from-transparent via-white dark:via-white to-transparent h-[1px] w-full" />
                      </>
                    )}
                    <Link to="/login" className="p-4" onClick={authService.logout}>
                      <h1 onClick={toggleDropdown} className="text-white text-base">Đăng xuất</h1>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {isSmall && (
        <div className="w-full ">
          <div className="flex justify-between">
            <div className="p-5 h-16 items-end justify-center flex flex-col top-0 relative">
                  <div onClick={toggleDropdown} className="flex items-center justify-center">
                    <img
                      className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                      src={user?.avatar}
                    />
                    <h1 className="text-white text-xl mx-3">{user?.username || ""}</h1>
                  </div>
                  
                    <div className={`flex flex-col left-0 p-1 w-[200%] h-fit mt-1 justify-center items-center top-full bg-neutral-800 border-2 border-white absolute rounded-md transition-transform ${dropdownVisible ? "-translate-x-full" : "translate-x-5"}`}>
                      {isLoggedIn === false ? (
                        <Link to="/login" className="p-4">
                          <h1 className="text-white text-base text-center">Đăng nhập</h1>
                        </Link>
                      ) : (
                        <>
                          <Link to="/user-info" className="p-4">
                            <h1 className="text-white text-base text-center">
                              Thông tin cá nhân
                            </h1>
                          </Link>
                          <div className="bg-gradient-to-r from-transparent via-white dark:via-white to-transparent h-[1px] w-full" />
                          {user?.role === "POSTER" && (
                            <>
                              <Link to="/new-manga" className="p-4">
                                <h1 className="text-white text-base">Đăng truyện</h1>
                              </Link>
                              <div className="bg-gradient-to-r from-transparent via-white dark:via-white to-transparent h-[1px] w-full" />
                            </>
                          )}
                          {user?.role === "USER" && (
                            <>
                              <div className="p-4" onClick={handleOpenRequestDialog}>
                                <h1 className="text-white text-lg text-bold">
                                  Xin lên làm người đăng truyện
                                </h1>
                              </div>
                              <div className="bg-gradient-to-r from-transparent via-white dark:via-white to-transparent h-[1px] w-full" />
                            </>
                          )}
                          <Link
                            to="/login"
                            className="p-4"
                            onClick={authService.logout}
                          >
                            <h1 className="text-white text-base">Đăng xuất</h1>
                          </Link>
                        </>
                      )}
                    </div>
                  
                </div>
                <div className="flex items-center right-16 w-fit relative">
                  <form action="submit" onSubmit={handleSearchSubmit}>
                    <div className="h-7 w-60 m-5 mr-0 bg-gray-700  rounded-md flex">
                      <Input
                        type="text"
                        className="bg-gray-700 w-full h-full rounded-md"
                        onChange={(e) => handleSearch(e.target.value)}
                        suffixIcon={
                          <Link to={`/search/${searchQuery}/${null}`}>
                            <IconSearch className="text-white h-4 w-4 z-10 cursor-pointer" />
                          </Link>
                        }
                      />
                    </div>
                  </form>
                </div>
            <div
              className="h-16 fixed flex items-center justify-center z-50 p-1 top-0 right-0"
              onClick={toggleSidebar}
            >
              <IconMenuDeep className="text-white h-8 w-8" />
            </div>
            <div
              className={`fixed -top-full right-0 w-1/3 h-full flex flex-col justify-between z-40 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-y-0" : "translate-y-full"
                }`} 
            >
              <div className="flex flex-col p-5 w-full bg-black  ">
                <div className="h-16 flex items-center justify-center p-5">
                  <Link to="/">
                    <h1 className="text-center font-saira font-bold text-xl text-white">
                      VANCHUONG
                      <span className="text-[#ED741B]">VIET</span>
                    </h1>
                  </Link>
                </div>
                <div className="h-16 flex items-center justify-center p-5">
                  <Link to="/search">
                    <h1 className="text-center font-saira font-bold text-xl text-white">
                      TRUYỆN MỚI
                    </h1>
                  </Link>
                </div>
                <div className="h-16 flex items-center justify-center p-5">
                  <Link to="/search">
                    <h1 className="text-center font-saira font-bold text-xl text-white">
                      DANH SÁCH TRUYỆN
                    </h1>
                  </Link>
                </div>
                <div className="h-16 flex items-center justify-center p-5">
                  <Link to="/search/viewNumber">
                    <h1 className="text-center font-saira font-bold text-xl text-white">
                      TRUYỆN HOT
                    </h1>
                  </Link>
                </div>
              </div>  
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



export default Header
