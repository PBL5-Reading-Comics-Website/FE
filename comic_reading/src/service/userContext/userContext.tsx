import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { validateUser } from '../api/authService.tsx';
import { useCookies } from 'react-cookie';
const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [cookies] = useCookies(['jwt']);
    const [jwt, setJwt] = useState(cookies.jwt);
    const setUser = async (jwtToken) => {
        setJwt(jwtToken);
        return await getRole(jwtToken);
    };
    const getRole = async (jwtToken) => {
        const roles = await jwtDecode(jwtToken).authorities;
        return roles;
    };
    const isActive = async () => {
        return await validateUser();
    };
    const value = { getRole, setUser, isActive, jwt };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}

export { useUser, UserProvider };