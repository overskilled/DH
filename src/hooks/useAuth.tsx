"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { SEED_USERS } from '@/lib/seed-data';

interface AuthContextType {
    user: User | null;
    login: (userId: string) => void;
    logout: () => void;
    impersonate: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('currentUserId');
        if (storedUserId) {
            const storedUser = SEED_USERS.find(u => u.id === storedUserId);
            if (storedUser) {
                setUser(storedUser);
            }
        }
    }, []);

    const login = (userId: string) => {
        const selectedUser = SEED_USERS.find(u => u.id === userId);
        if (selectedUser) {
            setUser(selectedUser);
            localStorage.setItem('currentUserId', userId);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUserId');
    };

    const impersonate = (userId: string) => {
        login(userId);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, impersonate }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
