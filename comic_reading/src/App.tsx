import './App.css'
import Login from '../components/ui/login'
import ForgotPassword from '../components/ui/forgotPassword'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <Login />
        </div>
        </BrowserRouter>
    )
}
