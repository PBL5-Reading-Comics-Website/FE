import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "./comment";

function CommentList() {
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
            <Comment
                key={index}
                name="Nggười dùng ẩn danh"
                time="1 ngày trước" 
                content="Manga này thực sự tuyệt vời. Cốt truyện hấp dẫn, nhân vật phong phú và hình vẽ đẹp mắt. Tôi thực sự thích cách tác giả xây dựng và phát triển nhân vật, mỗi nhân vật đều có độ sâu riêng và câu chuyện riêng. Hình vẽ rất chi tiết và sống động, mang đến cảm giác như bạn đang ở trong thế giới của manga. Tôi đã đọc rất nhiều manga khác nhau, nhưng đây chắc chắn là một trong những bộ mà tôi thích nhất. Tôi rất khuyến khích mọi người đọc manga này."
            />
            ))}
        </InfiniteScroll>
    </div>
  );
}

export default CommentList;