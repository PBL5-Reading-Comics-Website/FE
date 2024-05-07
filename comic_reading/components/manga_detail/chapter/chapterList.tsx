import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChapterLink from "./chapterLink";

interface ChapterLinkProps {
    name: string;
}

function ChapterList({name}: ChapterLinkProps) {
  return (
    <div className="w-full p-3 pt-0 border-2 flex flex-col rounded-lg">
        <InfiniteScroll
            dataLength={10}
            style={{height: "50vh"}}
            next={() => {}}
            hasMore={true}
            loader={<h4></h4>}
            endMessage={
            <p style={{ textAlign: "center"}}>
                <b>...</b>
            </p>
            }
        >
            {[...Array(10)].map((_, index) => (
            <ChapterLink
                key={index}
                name={name}
                chapter={`${index + 1}`}
                chapterName="Chap mới"
                time="1 ngày trước"
                poster="Người đăng: Admin"
            />
            ))}
        </InfiniteScroll>
    </div>
  );
}

export default ChapterList;