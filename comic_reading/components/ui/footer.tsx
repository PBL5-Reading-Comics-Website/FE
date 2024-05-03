"use client";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {Tag} from './tag';

export function Footer() {
    

    return (
            <div className="w-full h-fit flex bg-black mt-6 bottom-0 items-center">
                <div className="h-fit w-1/2">
                    <div className="h-full flex-col justify-start items-start p-5">
                        <h1 className="text-start font-saira font-bold text-xl text-white">
                            VANCHUONG
                            <span className="text-[#ED741B]">VIET</span>
                        </h1>
                        <div className="w-full flex mt-5">
                            <h1 className="text-start font-saira font-light text-lg text-white w-fit mr-20">
                                Liên hệ bản quyền
                            </h1>
                            <h1 className="text-start font-saira font-light text-lg text-white">
                                Chính sách bảo mật
                            </h1>
                        </div>
                        <h1 className="text-start font-saira font-light text-lg text-white">
                            Bản quyền thuộc về VanChuongViet Team
                        </h1>
                    </div>
                </div>
                <div className="h-fit w-1/4 flex flex-wrap items-start p-5">
                    <Tag text="Trinh thám" />
                    <Tag text="Tình cảm" />
                    <Tag text="Hành động" />
                    <Tag text="Khoa học viễn tưởng" />
                    <Tag text="Truyện nước ngoài" />
                    <Tag text="Harem" />
                    <Tag text="Shoujo" />
                    <Tag text="Truyện Việt Nam" />
                </div>
            </div>
        
    );
}

export default Footer;