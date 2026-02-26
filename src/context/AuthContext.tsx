import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockEmployees } from '../data/mockEmployees';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            if (username !== 'testuser' || password !== 'Test123') {
                throw new Error('Invalid credentials');
            }

            // Use mock data for demo
            const userData = {
                username: username,
                authenticated: true,
                data: mockEmployees,
                timestamp: new Date().toISOString(),
            };

            setUser(userData);
            setIsAuthenticated(true);
            sessionStorage.setItem('authUser', JSON.stringify(userData));

        } catch (err: any) {
            const errorMsg = err.message || 'Login failed';
            setError(errorMsg);
            setIsAuthenticated(false);
            console.error('Login Error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        setUser(null);
        setError(null);
        sessionStorage.removeItem('authUser');
    }, []);

    const value: AuthContextType = {
        isAuthenticated,
        user,
        login,
        logout,
        loading,
        error,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
