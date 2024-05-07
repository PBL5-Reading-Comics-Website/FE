import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainScreen from '../components/dashboard/mainScreen.tsx'
import ForgotPassword from '../components/form/login/forgotPassword.tsx'
import Login from '../components/form/login/login.tsx'
import Register from '../components/form/register/register.tsx'
import MangaInfoScreen from '../components/manga_detail/mangaInfoScreen.tsx'
import UserInfoScreen from '../components/profile/userInfoScreen.tsx'
import ChapterScreen from '../components/manga_detail/chapterScreen.tsx'
import './App.css'

export default function App() {

    return (
        <BrowserRouter>
         <div style={{height: '100%', width: '100%' }}>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register  />} />
            <Route path="/" element={<MainScreen />} />
            <Route path="/manga-info" element={<MangaInfoScreen />} />
            <Route path="/user-info" element={<UserInfoScreen />} />
            <Route path="/manga-info/chapter/:name/:chapter" element={<ChapterScreen />} />
        </Routes>
        </div>
        </BrowserRouter>
    )
}
