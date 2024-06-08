"use client";
import {
    IconArrowLeft,
} from "@tabler/icons-react";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../src/service/authService';
import { cn } from "../../../utils/cn";
import { Input } from "../../util/input.tsx";
import { Label } from "../../util/label.tsx";
import { jwtDecode } from "jwt-decode";
export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        let isValid = true;
        e.preventDefault();
        if (!username) {
            setUsernameError('Tên đăng nhập không được để trống');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (!password) {
            setPasswordError('Mật khẩu không được để trống');
            isValid = false;
        }
        else {
            setPasswordError('');
        }

        if (!isValid) {
            return;
        }
        try {
            const response = await authService.login(username, password);
            if (response.token) {
                const decodedToken: any = jwtDecode(response.token);
                console.log(decodedToken.roles[0]);
                if (decodedToken.roles[0] == "ADMIN") {
                    navigate('/admin-page');
                }
                else {
                    console.log("error");
                    navigate('/');
                }
            } else {
                setUsernameError('Tên đăng nhập hoặc mật khẩu không đúng');
            }
        } catch (error) {
            alert(error);
        }
    };
    return (
        <div className="w-5/12 mx-auto p-4 md:p-8">
            <h1 className="text-center font-saira font-bold text-4xl text-neutral-800 dark:text-neutral-200 mb-8">
                VANCHUONG
                <span className="text-[#ED741B]">VIET</span>
            </h1>
            <div className="mx-auto p-4 md:p-8 shadow-input bg-white dark:bg-[#4B4B4B] border-t-8 border-[#ED741B]">
                <h2 className="font-saira font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center">
                    ĐĂNG NHẬP VÀO TÀI KHOẢN
                </h2>
                <form className="my-8 mb-0" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4" error={usernameError}>
                        <Label htmlFor="email" className="px-2">Email hoặc tên đăng nhập</Label>
                        <Input id="email" placeholder="Nhập tài khoản hoặc Gmail" value={username} onChange={e => setUsername(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-2" error={passwordError}>
                        <Label htmlFor="password" className="px-2">Mật khẩu</Label>
                        <Input id="password" placeholder="Nhập mật khẩu" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </LabelInputContainer>
                    <div className="flex items-center justify-end space-x-2">
                        <Link to="/" className="text-[#ED741B] pr-5 hover:text-[#ff5845] flex items-center"><IconArrowLeft className="size-5"></IconArrowLeft>Trở về trang chủ</Link>
                    </div>
                    <button
                        className="font-saira my-8 bg-[#ED741B] hover:border-2 w-full h-16 text-lg font-bold hover:bg-[#fa854f] transition duration-300 ease-in-out text-white py-2 px-4 rounded mt-2 hover:outline-none hover:border-orange-400 hover:ring-2 hover:ring-offset-2 hover:ring-[#f38e4b] shadow-md text-shadow"
                        type="submit"
                    >
                        ĐĂNG NHẬP
                        <BottomGradient />
                    </button>
                </form>
            </div>
            <div className="mx-auto p-4 md:p-8 shadow-input bg-white dark:bg-[#6A6969]">
                <span className="block text-center text-[#CBCBCB] font-saira font-bold text-base">
                    Người dùng mới?
                    
                </span>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

interface LabelInputContainerProps {
    children: React.ReactNode;
    className?: string;
    error?: string;
}

const LabelInputContainer: React.FC<LabelInputContainerProps> = ({
    children,
    className,
    error,
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Login
