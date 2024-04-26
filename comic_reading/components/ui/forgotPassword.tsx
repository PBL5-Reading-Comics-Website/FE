"use client";
import React from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "../../utils/cn";
import {
    IconBrandGoogle,
} from "@tabler/icons-react";
import { Link } from 'react-router-dom';
export function ForgotPassword() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    return (
        <div className="w-6/12 mx-auto p-4 md:p-8">
            <h1 className="text-center font-saira font-bold text-4xl text-neutral-800 dark:text-neutral-200 mb-8">
                VANCHUONG
                <span className="text-[#ED741B]">VIET</span>
            </h1>
            <div className="mx-auto p-4 md:p-8 shadow-input bg-white dark:bg-[#4B4B4B] border-t-8 border-[#ED741B]">
                <h2 className="font-saira font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center">
                    Quên mật khẩu?
                </h2>
                <form className="" onSubmit={handleSubmit}>
                    <LabelInputContainer className="my-2">
                        <Label htmlFor="email" className="px-2">Email</Label>
                        <Input id="email" placeholder="Nhập Email" type="email" />
                    </LabelInputContainer>
                    <Link to="/forgot-password" className="text-[#ED741B] my-2">Quay lại trang đăng nhập</Link>
                    <button
                        className="font-saira my-2 bg-[#ED741B] w-full h-12  text-sm font-bold"
                        type="submit"
                    >
                        Gửi gmail đổi mật khẩu
                        <BottomGradient />
                    </button>
                </form>
            </div>
            <div className="mx-auto p-4 md:p-8 shadow-input bg-white dark:bg-[#6A6969]">
                <span className="block text-center text-[#CBCBCB] font-saira font-bold text-sm">
                    Nhập email hoặc tên đăng nhập sẽ gửi cho bạn một gmail hướng dẫn thay đổi mật khẩu
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

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export default ForgotPassword
