import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PublicRoute = ({ element, ...rest }: { element: React.ReactNode, [key: string]: any }) => {
    const token = Cookies.get('token');
    const isLoggedIn = Boolean(token);

    return (
        <Route
            {...rest}
            element={isLoggedIn ? <Navigate to="/" /> : element}
        />
    );
};

export default PublicRoute;