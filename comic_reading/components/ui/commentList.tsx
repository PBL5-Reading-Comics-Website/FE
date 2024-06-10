import { IconSend2 } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { mangaService } from "../../src/service/mangaService";
import { userService } from "../../src/service/userService";
import Comment from "./comment";
import { createPortal } from "react-dom";
import ReportDialog from "../util/reportDialog";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../util/requestToPosterDialog";
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
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [reportMangaId, setReportMangaId] = useState(0);
    const [reportCommentId, setReportCommentId] = useState(0);
    const [currentUserId, setCurrentUserId] = useState(0);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);
    const navigate = useNavigate()

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
    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            setCurrentUserId(0)
        } else {
            const decodedToken: any = jwtDecode(token);
            setCurrentUserId(decodedToken.userId);
        }
    }, []);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const token = Cookies.get('token');
            if (!token) {
                console.log('No token found');
                return;
            }
            const decodedToken: any = jwtDecode(token);
            const userId: number = decodedToken.userId
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

    const handleOpenReportDialog = (mangaId: number, commentId: number) => {
        setReportMangaId(mangaId);
        setReportCommentId(commentId);
        setIsReportDialogOpen(true);
    };

    const handleCloseReportDialog = () => {
        setIsReportDialogOpen(false);
    };

    const handleToUserProfile = (userId: number) => {
        let currentUserId = 0
        const token = Cookies.get('token');
        if (!token) {
            currentUserId = 0
        } else {
            const decodedToken: any = jwtDecode(token);
            currentUserId = decodedToken.userId;
        }
        if (currentUserId == userId) {
            navigate('/user-info')
        }
        else {
            navigate(`/other-user/${userId}`)
        }

    }

    const handleReport = async (mangaId: number, commentId: number, reason: string) => {
        try {
            const response = await userService.reportComment(mangaId, commentId, reason);
            console.log(response.data)
            if (response.status == "success") {
                alert("Báo cáo thành công");
            }
            else if (response.status == "fail") {
                alert("Báo cáo thất bại, bình luận này đang trong quá trình xử lý");
            }
        } catch (error) {
            console.error(error);
        }
        handleCloseReportDialog();
    };

    const handleDeleteComment = (commentId: number) => {
        setIsDeleteDialogOpen(true);
        setDeleteCommentId(commentId);
    };

    const handleConfirmDelete = async () => {
        if (deleteCommentId !== null) {
            try {
                const response = await userService.deleteCommentById(deleteCommentId);
                if (response.status === "success") {
                    alert("Xoá bình luận này thành công");
                    setCommentAdded(!commentAdded);
                } else {
                    alert("Xoá bình luận thất bại");
                }
            } catch (error) {
                console.error(error);
            }
        }
        setIsDeleteDialogOpen(false);
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
                        commentUserId={comment.user.id}
                        userId={currentUserId}
                        key={index}
                        name={comment.user.username}
                        time={comment.updateAt}
                        content={comment.content}
                        mangaId={mangaId}
                        commentId={comment.id}
                        handleOpenReportDialog={handleOpenReportDialog}
                        handleToUserProfile={handleToUserProfile} handleDeleteComment={handleDeleteComment} />
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
            {isReportDialogOpen && createPortal(
                <ReportDialog
                    isOpen={isReportDialogOpen}
                    onClose={handleCloseReportDialog}
                    onReport={handleReport}
                    mangaId={reportMangaId}
                    commentId={reportCommentId}
                />,
                document.body
            )}
            <div className="w-full p-3 pt-0 border-2 flex flex-col rounded-lg">
                <ConfirmationDialog
                    isOpen={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    onAccept={handleConfirmDelete}
                    title="Xoá bình luận"
                    content="Bạn có muốn xoá bình luận này?"
                    acceptButtonText="Xoá"
                    cancelButtonText="Huỷ"
                />
            </div>
        </div>
    );
}

export default CommentList;