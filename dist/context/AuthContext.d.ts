import React from 'react';
import { Moshimoshi } from "../Moshimoshi";
interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    checkAuthStatus: () => void;
}
interface AuthProviderProps {
    children: React.ReactNode;
    authenticator: Moshimoshi;
}
export declare const AuthProvider: ({ children, authenticator }: AuthProviderProps) => React.JSX.Element;
export declare const useAuth: () => AuthContextType;
export {};
