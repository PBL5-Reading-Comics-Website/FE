import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import AdminMangaPage from '../components/admin_page/adminMangaPage.tsx'
import AdminPage from '../components/admin_page/adminPage.tsx'
import MainScreen from '../components/dashboard/mainScreen.tsx'
import ErrorPage from '../components/error/errorPage.tsx'
import ForgotPassword from '../components/form/login/forgotPassword.tsx'
import Login from '../components/form/login/login.tsx'
import Register from '../components/form/register/register.tsx'
import ChapterScreen from '../components/manga_detail/chapterScreen.tsx'
import MangaInfoScreen from '../components/manga_detail/mangaInfoScreen.tsx'
import { MangaSearchPage } from '../components/manga_search_page/mangaSearchPage.tsx'
import NewManga from '../components/posting_page/newManga.tsx'
import PostingPage from '../components/posting_page/posting.tsx'
import OtherUserInfo, { OtherUserInfoScreen } from '../components/profile/otherUserInfo.tsx'
import UserInfoScreen from '../components/profile/userInfoScreen.tsx'
import ImageUploader from '../components/test_page/testPage.tsx'
import Header from '../components/util/header.tsx';
import { createPortal } from 'react-dom';
import RequestToPosterDialog from '../components/util/requestToPosterDialog.tsx';
import { userService } from './service/userService.tsx';
import './App.css'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import ReportDialog from '../components/util/reportDialog';

export default function App() {
    const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [mangaId, setMangaId] = useState(0);
    const [commentId, setCommentId] = useState(0);

    const handleOpenRequestDialog = () => {
        setIsRequestDialogOpen(true);
    };

    const handleCloseRequestDialog = () => {
        setIsRequestDialogOpen(false);
    };

    const handleAcceptRequest = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                console.log('No token found');
                return;
            }
            const decodedToken: any = jwtDecode(token);
            const response = await userService.toPoster(decodedToken.userId);

            if (response.status === 'success') {
                alert('Đăng ký thành người đăng truyện thành công, vui lòng đợi!');
            } else {
                console.error('Error updating user role:', response.data);
                alert('Có lỗi xảy ra, vui lòng thử lại sau!');
            }
            handleCloseRequestDialog();
        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau!');
        }
    };

    // Function to open the ReportDialog
    const handleOpenReportDialog = (mangaId: number, commentId: number) => {
        setMangaId(mangaId);
        setCommentId(commentId);
        setIsReportDialogOpen(true);
    };

    // Function to close the ReportDialog
    const handleCloseReportDialog = () => {
        setIsReportDialogOpen(false);
    };

    const handleReport = (mangaId: number, commentId: number, reason: string) => {
        // Handle reporting logic here (e.g., make an API call)
        console.log('Reporting manga:', mangaId, 'comment:', commentId, 'with reason:', reason);
        handleCloseReportDialog(); // Close the dialog after reporting
    };

    return (
        <BrowserRouter>
            <div style={{ height: '100%', width: '100%' }}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin-page" element={<AdminPage />} />
                    <Route
                        path="/"
                        element={
                            <>
                                <Header onOpenRequestDialog={handleOpenRequestDialog} />
                                <MainScreen />
                            </>
                        }
                    />
                    <Route
                        path="/manga-info/:id"
                        element={
                            <>
                                <Header onOpenRequestDialog={handleOpenRequestDialog} />
                                <MangaInfoScreen />
                            </>
                        }
                    />
                    <Route
                        path="/user-info"
                        element={
                            <>
                                <Header onOpenRequestDialog={handleOpenRequestDialog} />
                                <UserInfoScreen />
                            </>
                        }
                    />
                    <Route
                        path="/read-manga/:id"
                        element={
                            <>
                                <Header onOpenRequestDialog={handleOpenRequestDialog} />
                                <ChapterScreen />
                            </>
                        }
                    />
                    <Route
                        path="/admin-manga-page/:id"
                        element={
                            <>
                                <ProtectedRoute role="ADMIN">
                                    <AdminMangaPage />
                                </ProtectedRoute>
                            </>
                        }
                    />
                    <Route
                        path="/other-user/:id"
                        element={
                            <>
                                <Header onOpenRequestDialog={handleOpenRequestDialog} />
                                <OtherUserInfoScreen />
                            </>
                        }
                    />
                    <Route
                        path="/posting/:mangaNameParam"
                        element={
                            <>
                                <Header onOpenRequestDialog={handleOpenRequestDialog} />
                                <PostingPage />
                            </>
                        }
                    />
                    <Route
                        path="/search/:search/:type/:order/:tag"
                        element={
                            <>
                                <Header onOpenRequestDialog={handleOpenRequestDialog} />
                                <MangaSearchPage />
                            </>
                        }
                    />
                    <Route
                        path="/new-manga"
                        element={
                            <>
                                <Header onOpenRequestDialog={handleOpenRequestDialog} />
                                <NewManga />
                            </>
                        }
                    />
                    <Route
                        path="/test-manga"
                        element={
                            <>
                                <Header onOpenRequestDialog={handleOpenRequestDialog} />
                                <ImageUploader />
                            </>
                        }
                    />
                </Routes>

                {isRequestDialogOpen && createPortal(
                    <RequestToPosterDialog
                        isOpen={isRequestDialogOpen}
                        onClose={handleCloseRequestDialog}
                        onAccept={handleAcceptRequest}
                    />,
                    document.body
                )}
                {isReportDialogOpen && createPortal(
                    <ReportDialog
                        isOpen={isReportDialogOpen}
                        onClose={handleCloseReportDialog}
                        onReport={handleReport} mangaId={0} commentId={0} />,
                    document.body
                )}
            </div>
        </BrowserRouter>
    );
}

function ProtectedRoute({ role, children }: { role: string, children: React.ReactNode }) {
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                if (decodedToken.roles[0] !== role) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                navigate('/');
            }
        } else {
            navigate('/');
        }
    }, [role, navigate]);

    return children;
}