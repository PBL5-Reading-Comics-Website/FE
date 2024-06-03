import React from 'react';
import Headers from '../util/header.tsx';
const ErrorPage: React.FC = () => {
    return (
        <div>
            <div className='mt-20'>
            <h1>Oops! Something went wrong.</h1>
            <p>We apologize for the inconvenience.</p>
            <p>Please try again later.</p>
            </div>
        </div>
    );
};

export default ErrorPage;