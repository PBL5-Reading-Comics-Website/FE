import './App.css'
import Login from '../components/ui/login'
import ForgotPassword from '../components/ui/forgotPassword'
import Register from '../components/ui/register'
import MainScreen from '../components/ui/mainScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {

    return (
        <BrowserRouter>
         <div style={{height: '100%', width: '100%' }}>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register  />} />
            <Route path="/main-screen" element={<MainScreen />} />
        </Routes>
        </div>
        </BrowserRouter>
    )
}
