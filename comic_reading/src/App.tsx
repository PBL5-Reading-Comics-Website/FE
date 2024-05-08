import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from '../components/admin_page/adminPage.tsx'
import MainScreen from '../components/dashboard/mainScreen.tsx'
import ErrorPage from '../components/error/errorPage.tsx'
import ForgotPassword from '../components/form/login/forgotPassword.tsx'
import Login from '../components/form/login/login.tsx'
import Register from '../components/form/register/register.tsx'
import ChapterScreen from '../components/manga_detail/chapterScreen.tsx'
import MangaInfoScreen from '../components/manga_detail/mangaInfoScreen.tsx'
import { MangaSearchPage } from '../components/manga_search_page/mangaSearchPage.tsx'
import PostingPage from '../components/posting_page/posting.tsx'
import OtherUserInfo from '../components/profile/otherUserInfo.tsx'
import UserInfoScreen from '../components/profile/userInfoScreen.tsx'
import './App.css'

export default function App() {

    return (
        <BrowserRouter>
         <div style={{height: '100%', width: '100%' }}>
        <Routes>
            <Route path='/error' element={<ErrorPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register  />} />
            <Route path="/" element={<MainScreen />} />
            <Route path="/manga-info/:id" element={<MangaInfoScreen />} />
            <Route path="/user-info" element={<UserInfoScreen />} />
            <Route path="/manga-info/:name/:chapter" element={<ChapterScreen />} />
            <Route path="/admin-page" element={<AdminPage />} />
            <Route path="/other-user" element={<OtherUserInfo />} />
            <Route path="/posting" element={<PostingPage />} />
            <Route path="/search" element={<MangaSearchPage />} />
        </Routes>
        </div>
        </BrowserRouter>
    )
}
