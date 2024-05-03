import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ForgotPassword from '../components/form/login/forgotPassword.tsx'
import Login from '../components/form/login/login.tsx'
import MainScreen from '../components/dashboard/mainScreen.tsx'
import MangaInfoScreen from '../components/manga_detail/mangaInfoScreen.tsx'
import Register from '../components/form/register/register.tsx'
import UserInfoScreen from '../components/profile/userInfoScreen.tsx'
import './App.css'

export default function App() {

    return (
        <BrowserRouter>
         <div style={{height: '100%', width: '100%' }}>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register  />} />
            <Route path="/main-screen" element={<MainScreen />} />
            <Route path="/manga-info" element={<MangaInfoScreen />} />
            <Route path="/user-info" element={<UserInfoScreen />} />
        </Routes>
        </div>
        </BrowserRouter>
    )
}
