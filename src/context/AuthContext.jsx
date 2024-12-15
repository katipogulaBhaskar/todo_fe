import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider component that will wrap the app
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if userId exists in localStorage when app initializes
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (userId) => {
        localStorage.setItem('userId', userId);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
