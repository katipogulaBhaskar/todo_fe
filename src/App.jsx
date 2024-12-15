import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import TodoList from './components/TodoList.jsx';
import Logout from './components/Logout.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx'; // Import the necessary context

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();  // Use the hook to check authentication state
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AuthProvider>  {/* Wrap your app in AuthProvider */}
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/todos"
                    element={
                        <PrivateRoute>
                            <TodoList />
                            <Logout />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
