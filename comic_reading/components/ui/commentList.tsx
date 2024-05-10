import { IconSend2 } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { mangaService } from "../../src/service/mangaService";
import { userService } from "../../src/service/userService";
import Comment from "./comment";

interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    dateOfBirth: string;
    gender: boolean;
    email: string;
    avatar: string;
    registrationDate: string;
    role: string;
}

interface Manga {
    id: number;
    name: string;
    publishingCompany: string;
    author: string;
    artist: string;
    coverImage: string;
    status: string;
    readingStatus: string;
    viewNumber: number;
    favouriteNumber: number;
    commentNumber: number;
    publishAt: string;
    updateAt: string;
    updateUser: any;
    tags: any[];
}

interface Comment {
    id: number;
    content: string;
    createAt: string;
    updateAt: string;
    replyId: any;
    user: User;
    manga: Manga;
}

interface CommentListProp {
    mangaId: number;
    chapterChange?: boolean;
}

function CommentList(
    { mangaId, chapterChange }: CommentListProp
) {
    const [text, setText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentAdded, setCommentAdded] = useState(false);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const comment = await mangaService.getMangaCommentById(mangaId);
                console.log(comment.data)
                setComments(comment.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchComments();
    }, [mangaId, chapterChange, commentAdded]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const userId = 1;
            const response = await userService.postComment({ userId, mangaId, content: text });
            console.log(response.data)
            if (response.status == "success") {
                alert("Bình luận thành công");
                setCommentAdded(!commentAdded);
                console.log(response);
            }
            setText("");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="w-full p-3 pt-0 border-2 flex flex-col rounded-lg">
            <InfiniteScroll
                dataLength={10}
                next={() => { }}
                hasMore={true}
                loader={<h4></h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>...</b>
                    </p>
                }
            >
                {comments.length > 0 && comments.map((comment, index) => (
                    <Comment
                        imgAvatar={comment.user.avatar}
                        key={index}
                        name={comment.user.username}
                        time={comment.updateAt}
                        content={comment.content}
                    />
                ))}
            </InfiniteScroll>
            <form onSubmit={handleSubmit} className="flex w-full items-center bg-neutral-800 border-2 border-black rounded-xl mt-2">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Viết bình luận ở đây"
                    className="bg-neutral-800 rounded-xl py-2 pl-5 w-full z-10 resize-none focus:outline-none"
                />
                <button type="submit" className="bg-transparent">
                    <IconSend2 className="z-50 flex items-center mx-2 pointer-events-non hover:cursor-pointer" />
                </button>
            </form>
        </div>
    );
}

export default CommentList;