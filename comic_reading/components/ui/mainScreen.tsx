"use client";
import React, { useState } from "react";
import {Header} from './header';
import { Link, useNavigate } from 'react-router-dom';
export function MainScreen() {
    return (<div className="w-full h-full">
        <Header/>
    </div>);
}



export default MainScreen
