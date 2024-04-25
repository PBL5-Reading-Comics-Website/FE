"use client";
import React, {useState} from "react";
import {Header} from './header';
import {Link, useNavigate} from 'react-router-dom';
import Chapter from "./chapter.tsx";

export function MainScreen() {
    return (
        <div className="w-full h-full">
            <Header/>
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-4xl font-bold text-[#ED741B]">Main Screen</h1>
                <Link to="/" className="text-[#ED741B]">Go to Login</Link>
            </div>
            <Chapter/>
        </div>
    )
}


export default MainScreen;
