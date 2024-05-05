"use client";
import React, { useState } from "react";
import {
    IconBell,
    IconSearch,
} from "@tabler/icons-react";
import { Link } from 'react-router-dom';
import { Input } from './input';

let x = 0;

export function Header() {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);

    x = 1;
    };

    return (
        <div className="w-full top-0 z-50 absolute">
            <div className="w-full h-fit flex bg-black justify-between items-center absolute">
                <div className="h-16 flex items-center justify-center p-5">
                    <Link to="/main-screen">
                        <h1 className="text-center font-saira font-bold text-xl text-white">
                            VANCHUONG
                            <span className="text-[#ED741B]">VIET</span>
                        </h1>
                    </Link>
                </div>
                <div className="h-16 flex items-center justify-center p-5">
                    <h1 className="text-center font-saira font-bold text-xl text-white">
                        TRUYỆN MỚI
                    </h1>
                </div>
                <div className="h-16 flex items-center justify-center p-5">
                    <h1 className="text-center font-saira font-bold text-xl text-white">
                        DANH SÁCH TRUYỆN
                    </h1>
                </div>
                <div className="h-16 flex items-center justify-center p-5">
                    <h1 className="text-center font-saira font-bold text-xl text-white">
                        TRUYỆN HOT
                    </h1>
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
                    <div className="p-5 h-16 items-center justify-center flex flex-col top-0 relative"> {/* Add relative positioning here */}
                        <div onClick={toggleDropdown} className="flex items-center justify-center">
                            <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg">
                            </img>
                            <h1 className="text-white text-xl mx-3">Username</h1>
                        </div>
                        {dropdownVisible && (
                            <div className="flex flex-col p-1 h-fit w-full mt-1 justify-center items-center top-full bg-black absolute rounded-md">
                                {x === 0 ? (
                                    <Link to="/login" className="p-4">
                                        <h1 className="text-white text-base text-center">Đăng nhập</h1>
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/user-info" className="p-4">
                                            <h1 className="text-white text-base text-center">Thông tin cá nhân</h1>
                                        </Link>
                                        <div className="bg-gradient-to-r from-transparent via-white dark:via-white to-transparent h-[1px] w-full" />
                                        <Link to="/user-info" className="p-4">
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
