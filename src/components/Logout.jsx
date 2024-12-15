import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);

            // Call the logout API on the backend
            await axios.post('http://localhost:5000/api/logout');

            // Clear user data from localStorage
            localStorage.removeItem('userId');

            // Redirect to the login page after successful logout
            navigate('/login');

            setIsLoggingOut(false);
        } catch (error) {
            console.error('Error logging out', error);
            setIsLoggingOut(false);
        }
    };

    return (
        <div>
            <button onClick={handleLogout} disabled={isLoggingOut}>
                {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    );
};

export default Logout;
