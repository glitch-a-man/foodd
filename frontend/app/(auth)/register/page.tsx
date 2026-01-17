'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);

    const handleGoogleRegister = async () => {
        setLoading(true);
        try {
            await signIn('google', { callbackUrl: '/home' });
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <main className="w-full h-[100dvh] bg-black text-white p-6 flex flex-col">
            <Link href="/" className="mb-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                <ChevronLeft size={24} />
            </Link>

            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        Create Account
                    </h1>
                    <p className="text-gray-400 text-lg">Join the community of food lovers.</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleRegister}
                        disabled={loading}
                        className="w-full bg-white text-black font-bold py-4 rounded-2xl transition-all hover:bg-gray-100 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-white/5"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin text-orange-500" size={24} />
                        ) : (
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                        )}
                        Sign Up with Google
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-black px-2 text-gray-500">Fast & Secure</span>
                        </div>
                    </div>
                </div>

                <p className="text-center text-gray-400 mt-12">
                    Already have an account? <Link href="/login" className="text-orange-500 font-medium">Sign In</Link>
                </p>
            </div>
        </main>
    );
}
