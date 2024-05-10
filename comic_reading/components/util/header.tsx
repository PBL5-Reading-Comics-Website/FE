"use client";
import {
    IconBell,
    IconSearch,
} from "@tabler/icons-react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { authService } from "../../src/service/authService";
import { userService } from "../../src/service/userService";
import { Input } from './input';
let isLoggedIn = false;

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

export function Header() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [user, setUser] = useState<User>();

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


    return (
        <div className="w-full top-0 z-50 absolute">
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
                    <Link to="/search/publishAt">
                    <h1 className="text-center font-saira font-bold text-xl text-white">
                        TRUYỆN MỚI
                    </h1>
                    </Link>
                </div>
                <div className="h-16 flex items-center justify-center p-5">
                    <Link to="/search/name">
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
                <div className="flex items-center w-fit relative">
                    <form action="">
                        <div className="h-7 w-60 m-5 bg-gray-700  rounded-md flex">
                            <Input type="text" className="bg-gray-700 w-full h-full rounded-md" icon={<IconSearch className="p-1" />}>
                            </Input>

                        </div>
                    </form>
                    <div className="flex p-5">
                        <IconBell className="text-white h-8 w-8" />
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
                                        <h1 className="text-white text-base text-center">Đăng nhập</h1>
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/user-info" className="p-4">
                                            <h1 className="text-white text-base text-center">Thông tin cá nhân</h1>
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
                                        <Link to="/login" className="p-4" onClick={authService.logout}>
                                            <h1 className="text-white text-base">Đăng xuất</h1>
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}



export default Header
