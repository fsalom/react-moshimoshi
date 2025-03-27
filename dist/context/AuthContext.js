var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children, authenticator }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const checkAuthStatus = () => __awaiter(void 0, void 0, void 0, function* () {
        const accessTokenValue = yield authenticator.getAccessToken();
        setIsAuthenticated(!!accessTokenValue);
        setLoading(false);
    });
    useEffect(() => {
        checkAuthStatus();
    }, []);
    return (_jsx(AuthContext.Provider, { value: { isAuthenticated, loading, checkAuthStatus }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    return context;
};
