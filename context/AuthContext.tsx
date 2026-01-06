'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string) => Promise<void>;
    register: (name: string, email: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem('food_reels_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse user from storage', e);
                localStorage.removeItem('food_reels_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string) => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock user data
        const mockUser = { id: '1', name: 'Foodie User', email };

        setUser(mockUser);
        localStorage.setItem('food_reels_user', JSON.stringify(mockUser));
        setIsLoading(false);
        // Redirect logic is usually handled by the page component, but we can update state here
    };

    const register = async (name: string, email: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockUser = { id: '2', name, email };

        setUser(mockUser);
        localStorage.setItem('food_reels_user', JSON.stringify(mockUser));
        setIsLoading(false);
    };

    const logout = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        setUser(null);
        localStorage.removeItem('food_reels_user');
        setIsLoading(false);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
