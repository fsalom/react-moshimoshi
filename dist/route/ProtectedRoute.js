import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading, checkAuthStatus } = useAuth();
    useEffect(() => {
        checkAuthStatus();
    }, []);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    return isAuthenticated ? children : _jsx(Navigate, { to: "/login" });
};
export default ProtectedRoute;
