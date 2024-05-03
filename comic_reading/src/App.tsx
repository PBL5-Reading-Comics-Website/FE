import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ForgotPassword from '../components/ui/forgotPassword'
import Login from '../components/ui/login'
import MainScreen from '../components/ui/mainScreen'
import MangaInfoScreen from '../components/ui/mangaInfoScreen'
import Register from '../components/ui/register'
import UserInfoScreen from '../components/ui/userInfoScreen'
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
