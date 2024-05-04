"use client";
import {
    IconBell,
    IconSearch,
} from "@tabler/icons-react";
import { Link } from 'react-router-dom';
import { Input } from './input';
export function Header() {
    return (
        <div className="w-full h-16 flex bg-black top-0 justify-between items-center z-50 absolute">
            <div className="h-full flex items-center justify-center p-5">
                <h1 className="text-center font-saira font-bold text-xl text-white">
                    VANCHUONG
                    <span className="text-[#ED741B]">VIET</span>
                </h1>
            </div>
            <div className="h-full flex items-center justify-center p-5">
                <h1 className="text-center font-saira font-bold text-xl text-white">
                    TRUYỆN MỚI
                </h1>
            </div>
            <div className="h-full flex items-center justify-center p-5">
                <h1 className="text-center font-saira font-bold text-xl text-white">
                    DANH SÁCH TRUYỆN
                </h1>
            </div>
            <div className="h-full flex items-center justify-center p-5">
                <h1 className="text-center font-saira font-bold text-xl text-white">
                    TRUYỆN HOT
                </h1>
            </div>
            <div className="flex items-center m-5 w-fit">
                <form action="">
                    <div className="h-7 w-60 m-5 bg-gray-700  rounded-md flex">
                        <Input type="text" className="bg-gray-700 w-full h-full rounded-md" icon={<IconSearch className="p-1" />}>
                        </Input> 
                        
                    </div>
                </form>
                <div className="flex p-5">
                    <IconBell className="text-white h-8 w-8"/>
                </div>
                <div className="p-5">
                <Link to="/user-info" >
                    <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg">
                    </img>
                </Link>
                </div>
            </div>
        </div>
    );
}



export default Header