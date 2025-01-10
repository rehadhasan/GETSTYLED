import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-bg-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-black text-opacity-80">404</h1>
                <p className="mt-4 text-lg text-black text-opacity-60">Oops! Page not found.</p>
                <Link to="/" className="mt-6 inline-flex items-center px-4 py-2 text-white bg-secondary bg-opacity-90 rounded hover:bg-secondary">
                    <FaHome className="mr-2" />
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
