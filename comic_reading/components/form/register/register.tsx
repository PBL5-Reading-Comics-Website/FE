"use client";
import {
    IconBrandGoogle,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from '../../../src/service/authService';
import { cn } from "../../../utils/cn";
import { Input } from "../../util/input.tsx";
import { Label } from "../../util/label.tsx";
export function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailError("Email không hợp lệ");
            isValid = false;
        }
        else {
            setEmailError("");
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Mật khẩu không trùng khớp");
            isValid = false;
        }
        else {
            setConfirmPasswordError("");
        }
        if (!username) {
            setUsernameError("Tên đăng nhập không được để trống");
            isValid = false;
        }
        else {
            setUsernameError("");
        }
    
        if (!email || !emailRegex.test(email)) {
            setEmailError("Email không hợp lệ");
            isValid = false;
        }
        else {
            setEmailError("");
        }
        if (!password) {
            setPasswordError("Mật khẩu là bắt buộc");
            isValid = false;
        }
        else {
            setPasswordError("");
        }
        if (!isValid) {
            return;
        }
        try {
            const response = await authService.register(username, email ,password);
            if (response) {
                alert("Đăng ký thành công");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            alert("Đăng ký thất bại");
        }
    };
    return (
        <div className="w-5/12 mx-auto p-4 md:p-8 mt-12">
            <h1 className="text-center font-saira font-bold text-4xl text-neutral-800 dark:text-neutral-200 mb-8">
                VANCHUONG
                <span className="text-[#ED741B]">VIET</span>
            </h1>
            <div className="mx-auto p-4 md:p-8 shadow-input bg-white dark:bg-[#4B4B4B] border-t-8 border-[#ED741B]">
                <h2 className="font-saira font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center">
                    ĐĂNG KÝ TÀI KHOẢN MỚI
                </h2>
                <form onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4" error={usernameError}>
                        <Label htmlFor="username" className="px-2">Tên đăng nhập</Label>
                        <Input id="username" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4" error={emailError }>
                        <Label htmlFor="email" className="px-2">Email hoặc tên đăng nhập</Label>
                        <Input id="email" placeholder="Nhập tài khoản hoặc Gmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4" error={passwordError}>
                        <Label htmlFor="password" className="px-2">Mật khẩu</Label>
                        <Input id="password" placeholder="Nhập mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4" error={confirmPasswordError}>
                        <Label htmlFor="password_confirm" className="px-2">Nhập lại mật khẩu</Label>
                        <Input id="password_confirm" placeholder="Nhập mật khẩu lại mật khẩu" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </LabelInputContainer>
                    <button
                        className="font-saira my-4 bg-[#ED741B] w-full h-16 text-lg font-bold"
                        type="submit"
                    >
                        ĐĂNG KÝ
                        <BottomGradient />
                    </button>
                    <div className="bg-gradient-to-r from-transparent via-white dark:via-white to-transparent my-4 h-[1px] w-full" />

                    <div className="flex flex-col space-y-4">
                        <button
                            className="h-16 relative group/btn flex space-x-2 items-center justify-center w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                            type="submit"
                        >
                            <IconBrandGoogle className="h-6 w-6 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-neutral-700 dark:text-neutral-300 text-lg">
                                Đăng nhập bằng google
                            </span>
                            <BottomGradient />
                        </button>
                    </div>
                </form>
            </div>
            <div className="mx-auto p-4 md:p-8 shadow-input bg-white dark:bg-[#6A6969]">
                <span className="block text-center text-[#CBCBCB] font-saira font-bold text-base">
                    Đã có tài khoản?
                    <Link to="/" className="text-[#ED741B] pl-5">Đăng nhập</Link>
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

export default Register


